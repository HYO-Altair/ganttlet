import React, { Component } from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import MessageArea from './MessageArea';
// import { Fab } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import {
    createTask,
    updateTask,
    deleteTask,
    createLink,
    updateLink,
    deleteLink,
} from '../../store/actions/ChartActions/TaskActions';
import { connect } from 'react-redux';

/*  hardcoded data
    TODO: Add data robustly
*/
class GanttApp extends Component {
    state = {
        currentZoom: 'Days',
        messages: [],
    };

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [newMessage, ...this.state.messages];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }

        this.setState({ messages });
    }

    logDataUpdate = (entityType, action, itemData, id) => {
        const text = itemData && itemData.text ? ` (${itemData.text})` : '';
        let message = `${entityType} ${action}: ${id} ${text}`;
        if (entityType === 'link' && action !== 'delete') {
            message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
        }
        this.addMessage(message);

        // CRUD on task
        if (entityType === 'task') {
            if (action === 'create') this.props.createTask(itemData, this.props.projectID, id);
            if (action === 'update') this.props.updateTask(itemData, this.props.projectID, id);
            if (action === 'delete') this.props.deleteTask(itemData, this.props.projectID, id);
        }
        // CRUD on link
        else if (entityType === 'link') {
            if (action === 'create') this.props.createLink(itemData, this.props.projectID, id);
            if (action === 'update') this.props.updateLink(itemData, this.props.projectID, id);
            if (action === 'delete') this.props.deleteLink(itemData, this.props.projectID, id);
        }
        console.log('here here');
        console.log(itemData);
        //this.props.updateTask(itemData, this.props.projectID, id);
    };

    handleZoomChange = (zoom) => {
        console.log(this.props.tasks);
        this.setState({
            currentZoom: zoom,
        });
    };

    render() {
        const { currentZoom, messages } = this.state;
        return (
            <div className="gantt-app">
                <div className="appBarSpacer" />
                <div className="zoom-bar">
                    <Toolbar zoom={currentZoom} onZoomChange={this.handleZoomChange} />
                </div>
                <div className="gantt-container">
                    <Gantt tasks={this.props.tasks} zoom={currentZoom} onDataUpdated={this.logDataUpdate} />
                </div>
                <MessageArea messages={messages} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (task, projectid, taskid) => dispatch(createTask(task, projectid, taskid)),
        updateTask: (task, projectid, taskid) => dispatch(updateTask(task, projectid, taskid)),
        deleteTask: (task, projectid, taskid) => dispatch(deleteTask(task, projectid, taskid)),
        createLink: (task, projectid, linkid) => dispatch(createLink(task, projectid, linkid)),
        updateLink: (task, projectid, linkid) => dispatch(updateLink(task, projectid, linkid)),
        deleteLink: (task, projectid, linkid) => dispatch(deleteLink(task, projectid, linkid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GanttApp);
