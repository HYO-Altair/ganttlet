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
    projectId: string | null;
    projectError: string | null;
}
export interface IProjectAction {
    type: string;
    project: IProject | null;
    projectId: string | null;
    err: string | null;
}
