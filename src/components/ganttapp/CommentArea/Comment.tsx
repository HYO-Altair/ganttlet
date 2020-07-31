import React from 'react';
import { IComment } from '../../../config/types';

export interface IProps {
    comment: IComment;
}

export default function Comment(props: IProps): JSX.Element {
    const { username, message, timestamp } = props.comment;

    return (
        <div className="media mb-3">
            <img
                className="mr-3 bg-light rounded"
                width="48"
                height="48"
                src={`https://api.adorable.io/avatars/48/${username.toLowerCase()}@adorable.io.png`}
                alt={username}
            />

            <div className="media-body p-2 shadow-sm rounded bg-light border">
                <small className="float-right text-muted">{timestamp}</small>
                <h6 className="mt-0 mb-1 text-muted">{username}</h6>
                {message}
            </div>
        </div>
    );
}
