import { AnyAction } from 'redux';
import actualFirebase from 'firebase';
import { IGetFirebase, IRegisterCredentials, ILogInCredentials, TGetState } from '../types/otherTypes';
import {
    DELETE_USER_ERROR,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    USER_EXISTS,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    GOOGLE_LOGIN_ERROR,
    GOOGLE_LOGIN_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IGoogleAuthProfile } from '../../config/sharedTypes';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';

// action for logging users in thru email
export const emailLogIn = (
    credentials: ILogInCredentials,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            dispatch({ type: LOGIN_SUCCESS });
        } catch (err) {
            dispatch({ type: LOGIN_ERROR, err });
        }
    };
};

// action for logging users in thru google
export const googleLogIn = (): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        try {
            // set google provider, and force account selection

            const provider = new actualFirebase.auth.GoogleAuthProvider().setCustomParameters({
                prompt: 'select_account',
            });

            // await for popup sign in to complete
            const result = await firebase.auth().signInWithPopup(provider);
            const uid = result.user?.uid ?? 'null_uid';

            // if user is new, register them as a new user
            if (result.additionalUserInfo?.isNewUser) {
                // For some reason, the profile key does not have typing by default so I console.logged in
                // and made an interface out of it.
                // retrieve user information
                const profile = result.additionalUserInfo?.profile as IGoogleAuthProfile;

                // push user into database
                const dbObject = {
                    email: profile.email,
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                };
                await firebase.database().ref(`/users/${uid}`).set(dbObject);
            }
            dispatch({ type: GOOGLE_LOGIN_SUCCESS });
        } catch (err) {
            dispatch({ type: GOOGLE_LOGIN_ERROR, err });
        }
    };
};

// action for logging users out
export const logOut = (): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signOut();
            dispatch({ type: LOGOUT_SUCCESS });
        } catch (err) {
            dispatch({ type: LOGOUT_ERROR, err });
        }
    };
};

// action for registering an user
export const emailRegister = (
    credentials: IRegisterCredentials,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase();
        try {
            // check if user with email already exists
            const snapshotOfPotentialUser = await firebase
                .database()
                .ref('/users')
                .orderByChild('email')
                .equalTo(credentials.email)
                .once('value');

            // if user already exists
            if (snapshotOfPotentialUser.exists()) {
                dispatch({ type: USER_EXISTS });
            }
            // if user doesn't already exist
            else {
                // register user with firebase auth
                const result = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(credentials.email, credentials.password);
                const uid = result.user?.uid ?? 'null_uid';

                // push user into database
                const dbObject = {
                    email: credentials.email,
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                };
                await firebase.database().ref(`/users/${uid}`).set(dbObject);

                dispatch({ type: REGISTER_SUCCESS });
            }
        } catch (err) {
            dispatch({ type: REGISTER_ERROR, err });
        }
    };
};

// action for deleting an user
export const deleteUser = (): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase();
        const state = _getState();
        try {
            console.log(state.firebase.auth.uid);
            // if uid found in firebase auth
            if (state.firebase.auth.uid) {
                // delete the user in the database
                await firebase.database().ref(`/users/${state.firebase.auth.uid}`).remove();

                // delete the user in firebase auth
                await firebase.auth().currentUser.delete();

                dispatch({ type: DELETE_USER_SUCCESS });
            }
            // if uid not found in firebase auth
            else {
                dispatch({ type: DELETE_USER_FAILURE, err: 'uid not found' });
            }
        } catch (err) {
            dispatch({ type: DELETE_USER_ERROR, err });
        }
    };
};
