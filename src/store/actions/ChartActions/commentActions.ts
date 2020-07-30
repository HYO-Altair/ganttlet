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

export const loadComments = (
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        console.log('in the openComments action');
        try {
            dispatch({ type: LOAD_COMMENTS_SUCCESS, projectid, taskid });
        } catch (err) {
            dispatch({ type: LOAD_COMMENTS_ERROR, err });
        }
        // query the database and retrieve the comments for projectid/taskid
        //const firebase = getFirebase() as ExtendedFirebaseInstance;
        //const db = firebase.database();
        //db.ref(`projects/${projectid}/tasks/data/${taskid}/comments`).;
    };
};

export const showComments = (
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        dispatch({ type: SHOW_COMMENTS });
    };
};

export const hideComments = (
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        dispatch({ type: HIDE_COMMENTS });
    };
};
