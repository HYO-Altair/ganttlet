import { Switch } from '@material-ui/core';

const initState = {
    authError: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error', action.err);
            return { ...state, authError: 'Login Failed' };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return { ...state, authError: null };
        case 'GOOGLE_LOGIN_ERROR':
            console.log('google login error', action.err);
            return { ...state, authError: 'Google Login Failed' };
        case 'GOOGLE_LOGIN_SUCCESS':
            console.log('google login success');
            return { ...state, authError: null };
        case 'LOGOUT_ERROR':
            console.log('logout error', action.err);
            return state;
        case 'LOGOUT_SUCCESS':
            console.log('logout success');
            return state;
        case 'USER_EXISTS':
            console.log('user exists');
            return { ...state, authError: 'Account Exists' };
        case 'REGISTER_ERROR':
            console.log('register error', action.err);
            // not sure if there are other cases to cause registration to fail
            // since user exists would be caught
            return { ...state, authError: 'Badly Formatted Email' };
        case 'LOGIN_SUCCESS':
            console.log('register success');
            return { ...state, authError: null };
        case 'DELETE_USER_FAILURE':
            console.log('delete user failure');
            return state;
        case 'DELETE_USER_ERROR':
            console.log('delete user error', action.err);
            return state;
        case 'DELETE_USER_SUCCESS':
            console.log('delete user success');
            return state;
        default:
            return state;
    }
};

export default authReducer;
