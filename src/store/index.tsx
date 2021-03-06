import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { getFirebase } from 'react-redux-firebase';

import { config } from '../config/firebase/firebase_consts';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(config);

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirebase })];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const rrfConfig = {
    userProfile: 'users', // where profiles are stored in database,
    useFirebaseForProfile: true,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    attachAuthIsReady: true,
};
export { store, rrfProps };
