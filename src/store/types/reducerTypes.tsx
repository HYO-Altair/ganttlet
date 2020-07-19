import { IProject } from '../../config/types';

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
    projects: IProject[];
}
export interface IProjectAction {
    type: string;
    project: IProject;
    err: string;
}
