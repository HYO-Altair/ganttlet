/**interface IUser {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    projects: {
        owned: IProject[] | null,
        member: IProject[] | null,
    };
}

interface IGoogleAuthProfile {
    email: string;
    family_name: string;
    given_name: string;
    granted_scopes: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    verified_email: boolean;
}**/

// action for logging users in thru email
export const emailLogIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            return dispatch({ type: 'LOGIN_SUCCESS' });
        } catch (err) {
            return dispatch({ type: 'LOGIN_ERROR', err });
        }
    };
};

// action for logging users in thru google
export const googleLogIn = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const state = getState();
        try {
            const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters({
                prompt: 'select_account',
            });
            const result = await firebase.auth().signInWithPopup(provider);
            console.log(result);
            const uid = result.user?.uid ?? 'null_uid';
            if (result.additionalUserInfo?.isNewUser) {
                // For some reason, the profile key does not have typing by default so I console.logged in
                // and made an interface out of it.
                const profile = result.additionalUserInfo?.profile; // as IGoogleAuthProfile;

                // push user into database
                const dbObject = {
                    email: profile.email,
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                };
                await firebase.database().ref(`/users/${uid}`).set(dbObject);
            }
            return dispatch({ type: 'GOOGLE_LOGIN_SUCCESS' });
        } catch (err) {
            return dispatch({ type: 'GOOGLE_LOGIN_ERROR', err });
        }
    };
};

// action for logging users out
export const logOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signOut();
            return dispatch({ type: 'LOGOUT_SUCCESS' });
        } catch (err) {
            return dispatch({ type: 'LOGOUT_ERROR', err });
        }
    };
};

// action for registering an user
export const emailRegister = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            // check if user with email already exists
            const snapshotOfPotentialUser = await firebase
                .database()
                .ref('/users')
                .orderByChild('email')
                .equalTo(credentials.email)
                .once('value');
            if (snapshotOfPotentialUser.exists()) {
                return dispatch({ type: 'USER_EXISTS' });
            }
            // register user with auth
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

            return dispatch({ type: 'REGISTER_SUCCESS' });
        } catch (err) {
            return dispatch({ type: 'REGISTER_ERROR', err });
        }
    };
};

// action for deleting an user
export const deleteUser = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const state = getState();
        try {
            console.log(state.firebase.auth.uid);
            if (state.firebase.auth.uid) {
                // delete the user in the database
                await firebase.database().ref(`/users/${state.firebase.auth.uid}`).remove();

                // delete the user in firebase auth
                await firebase.auth().currentUser.delete();

                return dispatch({ type: 'DELETE_USER_SUCCESS' });
            } else {
                return dispatch({ type: 'DELETE_USER_FAILED' });
            }
        } catch (err) {
            return dispatch({ type: 'DELETE_USER_ERROR' }, err);
        }
    };
};
