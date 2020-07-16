import { IProjectJSON } from '../../config/sharedTypes';
import { TGetState, IGetFirebase } from '../types/otherTypes';
import { AnyAction } from 'redux';
import { CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR } from '../types/actionTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

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
            const firebase = getFirebase();
            await firebase
                .database()
                .ref(`/projects/`)
                .push({ ...project });
            dispatch({ type: CREATE_PROJECT_SUCCESS, project });
        } catch (err) {
            dispatch({ type: CREATE_PROJECT_ERROR, err });
        }
    };
};
