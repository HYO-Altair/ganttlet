import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IComment } from '../../../config/types';
import { createComment } from '../../../store/actions/ChartActions/commentsActions';

interface CommentFormState {
    error: string;
    comment: {
        username: string;
        message: string;
    };
}

interface IProps {
    projectid: string;
    taskid: string;
    createComment: any;
}
const CommentForm = (props: IProps) => {
    const { projectid, taskid, createComment } = props;
    const [state, setState] = useState({
        error: '',

        comment: {
            message: '',
        },
    });
    /**
     * Handle form input field changes & update the state
     */

    const handleFieldChange = (event: React.SyntheticEvent): void => {
        const { value, name } = event.target as HTMLInputElement;

        setState({
            ...state,
            comment: {
                ...state.comment,
                [name]: value,
            },
        });
    };
    /**
     * Form submit handler
     */
    const onSubmit = (e: React.SyntheticEvent): void => {
        // prevent default form submission
        e.preventDefault();

        if (!isFormValid()) {
            setState({ ...state, error: 'All fields are required.' });
            // loading status and clear error
            setState({ ...state, error: '' });

            return;
        }
        const { comment } = state;
        // console.log('wy');
        // console.log(comment);
        createComment(projectid, taskid, comment);
    };
    const isFormValid = (): boolean => {
        return state.comment.message !== '';
    };

    const renderError = (): JSX.Element | null => {
        return state.error ? <div className="alert alert-danger">{state.error}</div> : null;
    };

    return (
        <React.Fragment>
            <form method="post" onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea
                        onChange={handleFieldChange}
                        value={state.comment.message}
                        className="form-control"
                        placeholder="🤬 Your Comment"
                        name="message"
                    />
                </div>

                {renderError()}
                <div className="form-group">
                    <button className="btn btn-primary">Comment ➤</button>
                </div>
            </form>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => {
    return {
        projectid: state.comments.projectid,
        taskid: state.comments.taskid,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        createComment: (projectid: string, taskid: string, comment: IComment) =>
            dispatch(createComment(projectid, taskid, comment)),
    };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(CommentForm);
