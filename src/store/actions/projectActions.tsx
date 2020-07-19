import { IProject } from '../../config/types';
import { AnyAction } from 'redux';
import { CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR, TGetState, IGetFirebase } from '../types/actionTypes';
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
            const members = { [ownerUid]: profile.firstName + ' ' + profile.lastName };
            // empty tasks not getting added to firebase, keeping it here in case
            // we want to add a dummy example first task or smt to every new proj
            const tasks = {};

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
