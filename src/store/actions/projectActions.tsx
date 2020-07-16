import { IProjectJSON } from '../../config/sharedTypes';
import { TGetState, IGetFirebase } from '../types/otherTypes';
import { AnyAction } from 'redux';
import { CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR } from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';

// No, I am not a genius. I copied it from
// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function generateProjectID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}

// action for creating a new project
export const createProject = (
    project: IProjectJSON,
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
            const profile = _getState().firebase.profile;

            // TODO: instantiate stuff not part of project that was passed in
            // debating whether or not all this stuff should be set in project
            // parameter before being passed into this action
            const ownerUid = auth.currentUser?.uid || '';
            const managers = { [ownerUid]: profile.firstName + ' ' + profile.lastName };
            // TODO currently hard coding timezone offset to client's system time
            // but should be selectable upon project creation and passed in inside
            // project parameter
            const timezoneOffset = new Date().getTimezoneOffset();
            const members = { [ownerUid]: profile.firstName + ' ' + profile.lastName };
            // empty tasks not getting added to firebase, keeping it here in case
            // we want to add a dummy example first task or smt to every new proj
            const tasks = {};

            const projectId = generateProjectID();
            // add project id to user's list of projects
            await db.ref(`/users/${ownerUid}/projects/owned/${projectId}`).set(project.name);
            // add project to projects
            await db.ref(`/projects/${projectId}`).set({ ...project, managers, timezoneOffset, members, tasks });

            dispatch({ type: CREATE_PROJECT_SUCCESS, project });
        } catch (err) {
            dispatch({ type: CREATE_PROJECT_ERROR, err });
        }
    };
};
