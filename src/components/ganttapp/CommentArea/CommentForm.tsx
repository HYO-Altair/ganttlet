import React, { Component } from 'react';

interface CommentFormState {
    error: string;
    comment: {
        name: string;
        message: string;
    };
}

interface CommentFormProps {
    addComment: (comment: any) => void;
}
export default class CommentForm extends Component<CommentFormProps, CommentFormState> {
    constructor(props: CommentFormProps) {
        super(props);

        this.state = {
            error: '',

            comment: {
                name: '',
                message: '',
            },
        };

        //bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Handle form input field changes & update the state
     */

    handleFieldChange = (event: React.SyntheticEvent): void => {
        const { value, name } = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value,
            },
        });
    };
    /**
     * Form submit handler
     */
    onSubmit(e: React.SyntheticEvent): void {
        // prevent default form submission
        e.preventDefault();

        if (!this.isFormValid()) {
            this.setState({ error: 'All fields are required.' });
            // loading status and clear error
            this.setState({ error: '' });

            return;
        }
        const { comment } = this.state;
        // console.log('wy');
        // console.log(comment);
        this.props.addComment(comment);
    }
    isFormValid(): boolean {
        return this.state.comment.name !== '' && this.state.comment.message !== '';
    }

    renderError(): JSX.Element | null {
        return this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null;
    }

    render() {
        return (
            <React.Fragment>
                <form method="post" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            onChange={this.handleFieldChange}
                            value={this.state.comment.name}
                            className="form-control"
                            placeholder="😎 Your Name"
                            name="name"
                            type="text"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            onChange={this.handleFieldChange}
                            value={this.state.comment.message}
                            className="form-control"
                            placeholder="🤬 Your Comment"
                            name="message"
                        />
                    </div>

                    {this.renderError()}
                    <div className="form-group">
                        <button className="btn btn-primary">Comment ➤</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}
