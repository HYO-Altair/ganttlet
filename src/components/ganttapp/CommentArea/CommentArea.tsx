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
}

const CommentArea = (props: IProps): JSX.Element => {
    const { projectid, classes } = props;
    if (projectid) {
        return (
            <div className={classes.container}>
                <div className="col-4  pt-3 bg-white">
                    {/*Comment List component */}
                    <CommentList projectid={projectid} />
                </div>
                <div className="col-4  pt-3 border-right">
                    {/*Comment Form component */}
                    <CommentForm projectid={projectid} />
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
export default connect()(withStyles(styles, { withTheme: true })(memo(CommentArea)));
