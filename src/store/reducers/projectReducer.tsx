import { IProjectState, IProjectAction } from '../types/reducerTypes';

const initState = {
    projectId: '',
    projectError: null,
    projectName: '',
};

const projectReducer = (state: IProjectState = initState, action: IProjectAction): IProjectState => {
    switch (action.type) {
        case 'CREATE_PROJECT_SUCCESS':
            console.log('create project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        case 'VIEW_PROJECT_SUCCESS':
            console.log('view project', action.projectId);
            return { ...state, projectId: action.projectId, projectError: null, projectName: action.projectName };
        case 'VIEW_PROJECT_ERROR':
            console.log('view project error', action.err);
            return { ...state, projectId: '', projectError: action.err };
        case 'NOT_VIEW_PROJECT_SUCCESS':
            console.log('not view project');
            return { ...state, projectId: '', projectError: null, projectName: null };
        case 'NOT_VIEW_PROJECT_ERROR':
            console.log('not view project error', action.err);
            return { ...state, projectId: '', projectError: action.err };
        default:
            return state;
    }
};

export default projectReducer;
