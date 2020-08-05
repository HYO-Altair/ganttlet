import React, { memo } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import NoComment from './NoComment/';

const styles = (theme: Theme) =>
    createStyles({
        container: { width: '30vw' },
    });

interface IProps extends WithStyles<typeof styles> {
    projectid: string;
    taskid: string;
}

const CommentArea = (props: IProps): JSX.Element => {
    const { projectid, taskid, classes } = props;
    if (projectid && taskid) {
        return (
            <div className={classes.container}>
                <div className="col-sm pt-2 bg-white">
                    {/*Comment List component */}
                    <CommentList />
                </div>
                <div className="col-sm border-right">
                    {/*Comment Form component */}
                    <CommentForm />
                </div>
            </div>
        );
    } else {
        return (
            <div className={classes.container}>
                <NoComment />
            </div>
        );
    }
};
const mapStateToProps = (state: any) => {
    return {
        projectid: state.comments.projectid,
        taskid: state.comments.taskid,
    };
};
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(memo(CommentArea)));
