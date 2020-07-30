import React, { useEffect, useState, memo } from 'react';
import { CircularProgress, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Comment from './Comment';
import { IComment } from '../../../config/types';
import { connect } from 'react-redux';
import { loadComments } from '../../../store/actions/ChartActions/commentsActions';
const styles = (theme: Theme) =>
    createStyles({
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            fontSize: '8vh',
        },
    });
interface IProps extends WithStyles<typeof styles> {
    projectid: string;
    taskid: string;
    comments: IComment[];
    loadComments: any;
}

const CommentList = (props: IProps) => {
    const { projectid, taskid, comments, loadComments, classes } = props;
    // console.log('Hey');
    // console.log(props.comments);
    useEffect(() => {
        if (comments === null) {
            loadComments(projectid, taskid);
        }
    }, []);
    if (!comments) {
        return (
            <div className={classes.center}>
                <CircularProgress />
            </div>
        );
    } else if (comments && comments.length > 0) {
        return (
            <div className="commentList">
                {/*<h5 className="text-muted mb4">
                    <span className="badge badge-success">{comments.length}</span> Comment
                    {props.comments.length > 0 ? 's' : ''}
        </h5>*/}
                {comments.map((comment: any, index: number) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
        );
    } else {
        return (
            <div className="commentList">
                <div className="alert text-center alert-info">Be the first to comment</div>
            </div>
        );
    }
};
const mapStateToProps = (state: any) => {
    return {
        projectid: state.comments.projectid,
        taskid: state.comments.taskid,
        comments: state.comments.comments,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        loadComments: (projectid: string, taskid: string) => dispatch(loadComments(projectid, taskid)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(memo(CommentList)));
