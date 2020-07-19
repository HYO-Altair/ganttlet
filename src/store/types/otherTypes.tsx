import { ExtendedFirebaseInstance } from 'react-redux-firebase';

export interface IGetFirebase {
    getFirebase(): ExtendedFirebaseInstance;
}
/*
 * todo: figure out the typing later, state.firebase breaks in authActions.tsx
 * not sure what the correct typing would be but fbr.reducer is wrong
 */
export type TGetState = any; //IAuthState | IProjectState | FirebaseReducer.Reducer;
