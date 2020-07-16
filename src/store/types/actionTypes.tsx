import { ExtendedFirebaseInstance } from 'react-redux-firebase';

export interface IGetFirebase {
    getFirebase(): ExtendedFirebaseInstance;
}
/*
 * todo: figure out the typing later, state.firebase breaks in authActions.tsx
 * not sure what the correct typing would be but fbr.reducer is wrong
 */
export type TGetState = any; //IAuthState | IProjectState | FirebaseReducer.Reducer;

// authActions
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const GOOGLE_LOGIN_ERROR = 'GOOGLE_LOGIN_ERROR';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const USER_EXISTS = 'USER_EXISTS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';

/*
 * TODO: these interfaces might be pointless
 * but not sure can't figure out what async actions return (nth?)
 */
interface IEmailLogInAction {
    type: typeof LOGIN_ERROR | typeof LOGIN_SUCCESS;
    err?: string;
}

interface IGoogleLogInAction {
    type: typeof GOOGLE_LOGIN_ERROR | typeof GOOGLE_LOGIN_SUCCESS;
    err?: string;
}

interface ILogOutAction {
    type: typeof LOGOUT_ERROR | typeof LOGOUT_SUCCESS;
    err?: string;
}

interface IEmailRegisterAction {
    type: typeof USER_EXISTS | typeof REGISTER_ERROR | typeof REGISTER_SUCCESS;
    err?: string;
}

interface IDeleteUserAction {
    type: typeof DELETE_USER_ERROR | typeof DELETE_USER_FAILURE | typeof DELETE_USER_SUCCESS;
    err?: string;
}

export type TAuthAction =
    | IEmailLogInAction
    | IGoogleLogInAction
    | ILogOutAction
    | IEmailRegisterAction
    | IDeleteUserAction;

// projectActions
/*
 * TODO: these interfaces might be pointless
 * but not sure can't figure out what async actions return (nth?)
 */
interface ICreateProject {
    type: typeof CREATE_PROJECT_ERROR | typeof CREATE_PROJECT_SUCCESS;
    err?: string;
}

export type TProjectAction = ICreateProject;
