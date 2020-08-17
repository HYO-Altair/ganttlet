import React, { memo } from 'react';
import { CircularProgress, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Comment from './Comment';
import { IComment } from '../../../config/types';
import { connect, useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../../store/reducers';
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
}

const CommentList = (props: IProps) => {
    const { projectid, classes } = props;

    useFirebaseConnect(`projects/`);
    let comments = null as any | IComment[];
    console.log(projectid);
    useSelector((state: RootState) => console.log(state.firebase));
    comments = useSelector((state: RootState) =>
        // if comments has been loaded, set project, else set to null
        projectid && state.firebase.data.projects[projectid] && state.firebase.data.projects[projectid].comments
            ? state.firebase.data.projects[projectid].comments
            : [],
    );
    console.log(comments);
    if (!comments) {
        console.log(comments);
        return (
            <div className={classes.center}>
                <CircularProgress />
            </div>
        );
    } else if (comments && Object.keys(comments).length > 0) {
        console.log(comments);
        return (
            <div className="commentList">
                {comments && Object.keys(comments).map((key) => <Comment key={key} comment={comments[key]} />)}
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
export default connect()(withStyles(styles, { withTheme: true })(memo(CommentList)));
