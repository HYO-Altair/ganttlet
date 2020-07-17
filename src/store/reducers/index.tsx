import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import projectReducer from './projectReducer';
import authReducer from './authReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    project: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
