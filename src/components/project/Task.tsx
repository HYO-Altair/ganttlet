import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface TaskProps {
    number: number;
}

const useStyle = makeStyles(() => ({
    task: {
        margin: 0,
        height: '100%',
        backgroundColor: 'lightblue',
    },
}));

export default function Task(props: TaskProps): JSX.Element {
    const classes = useStyle();

    return (
        <div className={classes.task}>
            <article className="media">
                <p>
                    <strong>Task {props.number}</strong> <small>31m</small>
                    <br />
                    Lorem ipsum dolor sit amet.
                </p>
            </article>
        </div>
    );
}
