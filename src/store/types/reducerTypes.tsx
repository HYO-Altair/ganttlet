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
}
export interface IProjectAction {
    type: string;
    project: IProject | null;
    projectId: string | null;
    err: string | null;
}
// commentsReducer
export interface ICommentsState {
    //projectid: string | null;
    //taskid: string | null;
    comments: IComment[] | [];
    commentsError: string | null;
    showComments: boolean;
}
export interface ICommentsAction {
    type: string;
    comments: IComment[] | [];
    //projectid: string | null;
    //taskid: string | null;
    err: string | null;
}
