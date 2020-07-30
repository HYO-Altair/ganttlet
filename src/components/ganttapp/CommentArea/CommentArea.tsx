import React, { useState, memo } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import classes from '*.module.css';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';

export interface IComment {
    name: string;
    message: string;
    time: string;
}
const styles = (theme: Theme) =>
    createStyles({
        container: { width: '30vw' },
    });

type IProps = WithStyles<typeof styles>;

const CommentArea = (props: IProps): JSX.Element => {
    const { classes } = props;

    const [comments, setComments] = useState([] as IComment[]);

    const addComment = (comment: IComment): void => {
        setComments([comment, ...comments]);
    };

    return (
        <div className={classes.container}>
            <div className="col-4  pt-3 bg-white">
                {/*Comment List component */}
                <CommentList comments={comments as IComment[]} />
            </div>
            <div className="col-4  pt-3 border-right">
                {/*Comment Form component */}
                <CommentForm addComment={addComment} />
            </div>
        </div>
    );
};

export default withStyles(styles, { withTheme: true })(memo(CommentArea));
