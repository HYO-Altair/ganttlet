import { IProject } from '../../config/types';
import { AnyAction } from 'redux';
import {
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_ERROR,
    TGetState,
    IGetFirebase,
    VIEW_PROJECT_SUCCESS,
    VIEW_PROJECT_ERROR,
    NOT_VIEW_PROJECT_SUCCESS,
    NOT_VIEW_PROJECT_ERROR,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_ERROR,
    DELETE_PROJECT_FAILURE,
} from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
// action for creating a new project
export const createProject = (project: IProject): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
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
            const profile = _getState().firebase.profile;

            // TODO: instantiate stuff not part of project that was passed in
            // debating whether or not all this stuff should be set in project
            // parameter before being passed into this action
            const ownerUid = auth.currentUser?.uid ?? '';
            const managers = { [ownerUid]: profile.firstName + ' ' + profile.lastName };
            // TODO currently hard coding timezone offset to client's system time
            // but should be selectable upon project creation and passed in inside
            // project parameter
            const timezoneOffset = new Date().getTimezoneOffset();

            //const members = { [ownerUid]: profile.firstName + ' ' + profile.lastName };
            const members = {};

            // Sample tasks
            const date = new Date();

            // Converting to format '15-04-2019' (Date-Month-Year)
            const dateString1 = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            const dateString2 = `${date.getDate() + 2}-${date.getMonth()}-${date.getFullYear()}`;
            const tasks = {
                data: {
                    '1': {
                        id: 1,
                        text: 'Sample Task #1',
                        start_date: dateString1,
                        duration: 3,
                        progress: 0.6,
                    },
                    '2': { id: 2, text: 'Sample Task #2', start_date: dateString2, duration: 3, progress: 0.4 },
                },
                links: { '1': { id: 1, source: 1, target: 2, type: '0' } },
            };

            // add project id to user's list of projects
            const result = await db.ref(`/users/${ownerUid}/projects/owned/`).push(project.name);
            const projectId = result.key;
            // add project to projects
            await db.ref(`/projects/${projectId}`).set({ ...project, managers, timezoneOffset, members, tasks });

            dispatch({ type: CREATE_PROJECT_SUCCESS, project });
        } catch (err) {
            dispatch({ type: CREATE_PROJECT_ERROR, err });
        }
    };
};

// action for creating a new project
export const deleteProject = (
    projectId: string,
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
            const uid = _getState().firebase.auth.uid;

            // retrieve list of users authorized on project
            const managers = await db.ref(`/projects/${projectId}/managers`).once('value');
            //const members = await db.ref(`/projects/${projectId}/managers`).once('value');
            // check to make sure current user is a manager
            console.log(managers.val());
            let hasPermission = false;
            let username = '';

            const array = [] as any[];
            managers.forEach((childSnapshot) => {
                const id = childSnapshot.key;
                console.log(id);
                if (id === uid) {
                    hasPermission = true;
                    username = childSnapshot.val();
                }
                array.push(childSnapshot);
                return false;
            });

            if (!hasPermission)
                dispatch({ type: DELETE_PROJECT_FAILURE, err: 'User not authorized to delete project' });

            // TODO: send notification of project deletion to users
            for (const childSnapshot of array) {
                const id = childSnapshot.key;
                console.log(id);
                const deletionMsg = 'Project ' + projectName + ' has been deleted by Manager ' + username;
                // TODO: send notification
                console.log(deletionMsg);
            }
            // remove project from user's project list
            for (const childSnapshot of array) {
                const id = childSnapshot.key as string;
                const username = childSnapshot.val();
                console.log(id);
                console.log(username);
                await db.ref(`/users/${id}/projects/owned`).update({ [projectId]: null });
                await db.ref(`/users/${id}/projects/joined`).update({ [projectId]: null });
            }
            // delete project
            await db.ref(`/projects/`).update({ [projectId]: null });
            // add project to projects
            //await db.ref(`/projects/${projectId}`).set({ ...project, managers, timezoneOffset, members, tasks });

            dispatch({ type: DELETE_PROJECT_SUCCESS });
        } catch (err) {
            dispatch({ type: DELETE_PROJECT_ERROR, err });
        }
    };
};

// action for viewing project
export const viewProject = (projectId: string): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        try {
            // check to make sure user has access to this project
            dispatch({ type: VIEW_PROJECT_SUCCESS, projectId });
        } catch (err) {
            dispatch({ type: VIEW_PROJECT_ERROR, err });
        }
    };
};

// action for leaving project page
export const notViewProject = (): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        try {
            dispatch({ type: NOT_VIEW_PROJECT_SUCCESS });
        } catch (err) {
            dispatch({ type: NOT_VIEW_PROJECT_ERROR, err });
        }
    };
};
