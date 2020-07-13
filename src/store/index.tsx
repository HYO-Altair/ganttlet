import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import { config } from '../config/firebase/firebase_consts';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
firebase.initializeApp(config, 'notDefault');

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirebase })];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// react-redux-firebase config
const rrfConfig = {};

const rrfProps = {
    firebase,
    config,
    dispatch: store.dispatch,
    // createFirestoreInstance // <- needed if using firestore
};
export { store, rrfProps };
