import { ICommentsState, ICommentsAction } from '../types/reducerTypes';

const initState = {
    //projectid: null,
    //taskid: null,
    comments: [],
    commentsError: null,
    showComments: false,
};
/*
 * reducer for all firebase auth stuff
 */
const commentsReducer = (state: ICommentsState = initState, action: ICommentsAction): ICommentsState => {
    switch (action.type) {
        // email login
        case 'LOAD_COMMENTS_SUCCESS':
            return { ...state, comments: action.comments, commentsError: null }; //projectid: action.projectid, taskid: action.taskid, commentsError: null };
        case 'LOAD_COMMENTS_ERROR':
            return { ...state, comments: [], commentsError: action.err };
        case 'SHOW_COMMENTS':
            return { ...state, showComments: true };
        case 'HIDE_COMMENTS':
            return { ...state, showComments: false };
        default:
            return state;
    }
};

export default commentsReducer;
