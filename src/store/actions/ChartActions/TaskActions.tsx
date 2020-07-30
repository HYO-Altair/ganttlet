import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IGetFirebase, TGetState } from '../../types/actionTypes';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
import { IProjectTaskLink, IProjectTaskData } from '../../../config/types';

export const createTask = (
    task: IProjectTaskData,
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${projectid}/tasks/data/${taskid}`).set(task);
    };
};

// TODO: untested
export const updateTask = (
    task: IProjectTaskData,
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${projectid}/tasks/data/${taskid}`).update(task);
    };
};

export const deleteTask = (
    task: IProjectTaskData,
    projectid: string,
    taskid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${projectid}/tasks/data/${taskid}`).set(null);
    };
};

export const createLink = (
    link: IProjectTaskLink,
    projectid: string,
    linkid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        console.log('status: ' + link['!nativeeditor_status']);
        db.ref(`projects/${projectid}/tasks/links/${linkid}`).set(link);
    };
};

// TODO: untested
export const updateLink = (
    link: IProjectTaskLink,
    projectid: string,
    linkid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        console.log('status: ' + link['!nativeeditor_status']);
        db.ref(`projects/${projectid}/tasks/links/${linkid}`).update(link);
    };
};

export const deleteLink = (
    link: IProjectTaskLink,
    projectid: string,
    linkid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        console.log('status: ' + link['!nativeeditor_status']);
        db.ref(`projects/${projectid}/tasks/links/${linkid}`).set(null);
    };
};

export const openComments = (
    projectId: string,
    taskId: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        console.log('in the openComments action');
    };
};
