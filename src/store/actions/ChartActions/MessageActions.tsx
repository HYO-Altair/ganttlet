import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IGetFirebase, TGetState } from '../../types/actionTypes';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
import { IMessage } from '../../../config/types';

export const addMessage = (
    message: IMessage,
    projectid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        const profile = _getState().firebase.profile;
        const currentUserFullName = profile.firstName + ' ' + profile.lastName;
        message.actor = currentUserFullName;
        db.ref(`projects/${projectid}/messages`).push(message);
    };
};
