import React from 'react';

export default function NoComment(): JSX.Element {
    return (
        <div className="no-box" id="error">
            <div id="box"></div>
            <h2>No Comments Found</h2>
            <p>You haven't selected a task</p>
            <p>
                Please <span>select</span> a task to view its comments :)
            </p>
        </div>
    );
}
