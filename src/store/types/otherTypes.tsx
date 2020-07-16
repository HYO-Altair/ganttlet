//import { BaseExtendedFirebaseInstance, FirebaseReducer, ProfileType } from 'react-redux-firebase';
//import { IAuthState, IProjectState } from './reducerTypes';
/*
 * todo: figure out the typing later, ExtendedFirebaseInstance breaks
 * firebase.auth.GoogleAuthProvider() in authActions.tsx
 */
export interface IGetFirebase {
    getFirebase(): any; //ExtendedFirebaseInstance;
}
/*
 * todo: figure out the typing later, state.firebase breaks in authActions.tsx
 * not sure what the correct typing would be but fbr.reducer is wrong
 */
export type TGetState = any; //IAuthState | IProjectState | FirebaseReducer.Reducer;

export interface ILogInCredentials {
    email: string;
    password: string;
}

export interface IRegisterCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
