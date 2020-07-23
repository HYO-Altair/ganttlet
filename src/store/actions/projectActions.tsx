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

            // Sample tasks
            const date = new Date();

            // Converting to format '15-04-2019' (Date-Month-Year)
            const dateString1 = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            const dateString2 = `${date.getDate() + 2}-${date.getMonth()}-${date.getFullYear()}`;
            const tasks = {
                data: {
                    '1': { id: 1, text: 'Sample Task #1', start_date: dateString1, duration: 3, progress: 0.6 },
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
