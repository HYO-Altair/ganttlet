import { IProjectJSON } from '../../config/sharedTypes';
import { TGetState, IGetFirebase } from '../types/otherTypes';
import { AnyAction } from 'redux';
import { CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR } from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';

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

            const projectId = generateProjectID();
            db.ref(`/users/${auth.currentUser?.uid}/projects/owned/${projectId}`).set(true);
            await db.ref(`/projects/${projectId}`).set({ ...project });

            dispatch({ type: CREATE_PROJECT_SUCCESS, project });
        } catch (err) {
            dispatch({ type: CREATE_PROJECT_ERROR, err });
        }
    };
};

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
