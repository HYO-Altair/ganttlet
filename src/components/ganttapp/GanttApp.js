import React, { Component } from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import MessageArea from './MessageArea';
// import { Fab } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import { addTask } from '../../store/actions/ChartActions/TaskActions';
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
        this.props.addTask(itemData, this.props.projectID);
        this.addMessage(message);
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
        addTask: (task, uid) => dispatch(addTask(task, uid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GanttApp);
