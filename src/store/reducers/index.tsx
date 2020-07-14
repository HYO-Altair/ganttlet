import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import projectReducer from './projectReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    project: projectReducer,
});
