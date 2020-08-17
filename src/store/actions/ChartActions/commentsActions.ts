import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
    TGetState,
    IGetFirebase,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_ERROR,
    SHOW_COMMENTS,
    HIDE_COMMENTS,
    SET_COMMENTS_INFO_SUCCESS,
    SET_COMMENTS_INFO_ERROR,
} from '../../types/actionTypes';

import { AnyAction } from 'redux';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
import { IComment } from '../../../config/types';

export const setCommentsInfo = (
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        try {
            dispatch({ type: SET_COMMENTS_INFO_SUCCESS, projectid, taskid });
        } catch (err) {
            dispatch({ type: SET_COMMENTS_INFO_ERROR, err });
        }
        // query the database and retrieve the comments for projectid/taskid
        //const firebase = getFirebase() as ExtendedFirebaseInstance;
        //const db = firebase.database();
        //db.ref(`projects/${projectid}/tasks/data/${taskid}/comments`).;
    };
};
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
            console.log('loading comments');
            const firebase = getFirebase() as ExtendedFirebaseInstance;
            const db = firebase.database();
            let comments = await (await db.ref(`projects/${projectid}/tasks/comments/${taskid}`).once('value')).val();
            console.log(comments);
            if (comments === null) comments = [];
            dispatch({ type: LOAD_COMMENTS_SUCCESS, comments });
        } catch (err) {
            console.log(err);
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
export const createComment = (
    projectid: string,
    comment: IComment,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const state = _getState();
        const db = firebase.database();

        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        const timestamp = month + '/' + day + '/' + year;

        comment['timestamp'] = timestamp;
        comment['username'] = state.firebase.auth.displayName;
        db.ref(`projects/${projectid}/comments/`).push(comment);
        console.log('comment created');
        console.log(projectid);
    };
};

export const editComment = (
    projectid: string,
    commentid: string,
    message: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${projectid}/comments/${commentid}`).update({ message });
    };
};

export const deleteComment = (
    projectid: string,
    commentid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${projectid}/comments/${commentid}`).set(null);
    };
};
