import { Switch } from '@material-ui/core';

const initState = {
    authError: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return { ...state, authError: 'Login Failed' };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return { ...state, authError: null };
        case 'LOGOUT_ERROR':
            console.log('logout error');
            return state;
        case 'LOGOUT_SUCCESS':
            console.log('logout success');
            return state;
        default:
            return state;
    }
};

export default authReducer;
