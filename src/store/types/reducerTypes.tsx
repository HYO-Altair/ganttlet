import { IProjectJSON } from '../../config/sharedTypes';

// authReducer
export interface IAuthState {
    authError: string | null;
}
export interface IAuthAction {
    type: string;
    err: string;
}
// projectReducer
export interface IProjectState {
    projects: IProjectJSON[];
}
export interface IProjectAction {
    type: string;
    project: IProjectJSON;
    err: string;
}
