import React, { Component } from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import MessageArea from './MessageArea';

/*  hardcoded data
    TODO: Add data robustly
*/
const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2020-02-16', duration: 3, progress: 0.4 },
    ],
    links: [{ id: 1, source: 1, target: 2, type: '0' }],
};
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
    };

    handleZoomChange = (zoom) => {
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
                    <Gantt tasks={data} zoom={currentZoom} onDataUpdated={this.logDataUpdate} />
                </div>
                <MessageArea messages={messages} />
            </div>
        );
    }
}
export default GanttApp;
