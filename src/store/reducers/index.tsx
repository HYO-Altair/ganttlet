import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import projectReducer from './projectReducer';

export default combineReducers({
    firebase: firebaseReducer,
    project: projectReducer,
});
