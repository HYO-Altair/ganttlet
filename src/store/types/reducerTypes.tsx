import { IProject, IComment } from '../../config/types';

// authReducer
export interface IAuthState {
    authError: string | null;
}
export interface IAuthAction {
    type: string;
    err: string | null;
}
// projectReducer
export interface IProjectState {
    projectId: string | null;
    projectError: string | null;
    projectName: string | null;
}
export interface IProjectAction {
    type: string;
    project: IProject | null;
    projectId: string | null;
    projectName: string | null;
    err: string | null;
}
// commentsReducer
export interface ICommentsState {
    projectid: string | null;
    taskid: string | null;
    comments: IComment[] | null;
    commentsError: string | null;
    showComments: boolean;
}
export interface ICommentsAction {
    type: string;
    projectid: string | null;
    comments: IComment[] | null;
    taskid: string | null;
    err: string | null;
}
