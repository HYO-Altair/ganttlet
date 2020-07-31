import { AnyAction } from 'redux';
import { TGetState, IGetFirebase } from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';

export const sendInvite = (
    inviteeUID: string,
    projectID: string,
    projectName: string,
    inviterName: string,
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
            db.ref(`users/${inviteeUID}/invitations/${projectID}`).set({ projectName, inviterName });
        } catch (err) {
            console.log(`Error in sendInvite: ${err}`);
        }
    };
};

export const acceptInvite = (
    projectID: string,
    projectName: string,
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
            const auth = firebase.auth();
            const currentUserUID = auth.currentUser?.uid ?? '';
            const profile = _getState().firebase.profile;
            const currentUserFullName = profile.firstName + ' ' + profile.lastName;

            db.ref(`users/${currentUserUID}/invitations/${projectID}`).set(null);
            db.ref(`users/${currentUserUID}/projects/joined/${projectID}`).set(projectName);
            db.ref(`projects/${projectID}/members/${currentUserUID}`).set(currentUserFullName);
        } catch (err) {
            console.log(`Error in acceptInvite: ${err}`);
        }
    };
};

export const revokeAccess = (
    projectID: string,
    personToRevokeID: string,
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
            db.ref(`projects/${projectID}/members/${personToRevokeID}`).set(null);
            db.ref(`users/${personToRevokeID}/projects/joined/${projectID}`).set(null);
        } catch (err) {
            console.log(`Error in revokeAccess: ${err}`);
        }
    };
};
