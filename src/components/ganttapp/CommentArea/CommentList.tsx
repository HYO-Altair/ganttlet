import React from 'react';
import Comment from './Comment';

interface CommentI {
    name: string;
    message: string;
    time: string;
}
interface CommentListProps {
    comments: any;
}

export default function CommentList(props: CommentListProps) {
    // console.log('Hey');
    // console.log(props.comments);
    return (
        <div className="commentList">
            <h5 className="text-muted mb4">
                <span className="badge badge-success">{props.comments.length}</span> Comment
                {props.comments.length > 0 ? 's' : ''}
            </h5>

            {props.comments.length === 0 ? (
                <div className="alert text-center alert-info">Be the first to comment</div>
            ) : null}

            {props.comments.map((comment: any, index: number) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
}
