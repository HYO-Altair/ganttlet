import { IProjectState, IProjectAction } from '../types/reducerTypes';

const initState = {
    projects: [],
};

const projectReducer = (state: IProjectState = initState, action: IProjectAction): IProjectState => {
    switch (action.type) {
        case 'CREATE_PROJECT_SUCCESS':
            console.log('create project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        default:
            return state;
    }
};

export default projectReducer;
