import { AnyAction } from 'redux';
import { TGetState, IGetFirebase } from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';

export const sendInvite = (
    inviteeUID: string,
    projectID: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        // make async call to database
        try {
            const firebase = getFirebase() as ExtendedFirebaseInstance;
            const db = firebase.database();
            db.ref(`invitations/${inviteeUID}/${projectID}`).set(false);
        } catch (err) {
            console.log(`Error in sendInvite: ${err}`);
        }
    };
};

export const acceptInvite = (projectID: string): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        // make async call to database
        try {
            const firebase = getFirebase() as ExtendedFirebaseInstance;
            const db = firebase.database();
            const auth = firebase.auth();
            const currentUserUID = auth.currentUser?.uid ?? '';
            const profile = _getState().firebase.profile;
            const currentUserFullName = profile.firstName + ' ' + profile.lastName;

            db.ref(`invitations/${currentUserUID}/${projectID}`).set(true);
            db.ref(`projects/${projectID}/members/${currentUserUID}`).set(currentUserFullName);
        } catch (err) {
            console.log(`Error in acceptInvite: ${err}`);
        }
    };
};
