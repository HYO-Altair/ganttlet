import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IGetFirebase, TGetState } from '../../types/actionTypes';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
import { IProjectTask } from '../../../config/types';

export const addTask = (
    task: IProjectTask,
    uid: string,
): ThunkAction<Promise<void>, TGetState, IGetFirebase, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<TGetState, IGetFirebase, AnyAction>,
        _getState: TGetState,
        { getFirebase }: IGetFirebase,
    ) => {
        const firebase = getFirebase() as ExtendedFirebaseInstance;
        const db = firebase.database();
        db.ref(`projects/${uid}/tasks`).push(task);
    };
};
