import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentI from './Comment';
import CommentList from './CommentList';

interface CommentAreaState {
    comments: Array<typeof CommentI>;
}

class CommentArea extends Component<null, CommentAreaState> {
    constructor(props: any) {
        super(props);

        this.state = {
            comments: [],
        };
        this.addComment = this.addComment.bind(this);
    }

    addComment(comment: typeof CommentI): void {
        this.setState({
            comments: [comment, ...this.state.comments],
        });
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="col-4  pt-3 bg-white">
                    {/*Comment List component */}
                    <CommentList comments={this.state.comments as Array<typeof CommentI>} />
                </div>
                <div className="col-4  pt-3 border-right">
                    {/*Comment Form component */}
                    <CommentForm addComment={this.addComment} />
                </div>
            </div>
        );
    }
}

export default CommentArea;
