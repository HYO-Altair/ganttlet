import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import projectReducer from './projectReducer';
import authReducer from './authReducer';
import commentsReducer from './commentsReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    project: projectReducer,
    comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
