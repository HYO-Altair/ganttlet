import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IGetFirebase, TGetState } from '../../types/actionTypes';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
import { ITaskComment } from '../../../config/types';

/*
Since comments can be nested, best to let action caller determine
database path

Example path for root level comment
  ${projectid}/tasks/comments/${taskid}

Example path for 2nd level comment
  ${projectid}/tasks/comments/${taskid}/${parentcommentid}
*/
export const createComment = (
    comment: ITaskComment,
    path: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${path}`).push(comment);
    };
};

export const editComment = (
    text: string,
    path: string,

    commentid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${path}/${commentid}`).update({ text });
    };
};

export const deleteComment = (
    text: string,
    path: string,

    commentid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${path}/${commentid}`).set(null);
    };
};
