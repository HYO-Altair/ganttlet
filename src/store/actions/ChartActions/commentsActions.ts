import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
    TGetState,
    IGetFirebase,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_ERROR,
    SHOW_COMMENTS,
    HIDE_COMMENTS,
} from '../../types/actionTypes';

import { AnyAction } from 'redux';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';

export const loadComments = (
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        try {
            // query the database and retrieve the comments for projectid/taskid
            const firebase = getFirebase() as ExtendedFirebaseInstance;
            const db = firebase.database();
            const comments = await db.ref(`projects/${projectid}/tasks/data/${taskid}/comments`).once('value');
            console.log('in the loadComments action');
            console.log(comments);
            dispatch({ type: LOAD_COMMENTS_SUCCESS, comments });
        } catch (err) {
            console.log('oop');
            dispatch({ type: LOAD_COMMENTS_ERROR, err });
        }
    };
};

export const showComments = (): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        console.log('in the showComments action');

        dispatch({ type: SHOW_COMMENTS });
    };
};

export const hideComments = (): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        dispatch({ type: HIDE_COMMENTS });
    };
};
