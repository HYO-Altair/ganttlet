/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import PropTypes from 'prop-types';
import { setCommentsInfo, showComments } from '../../../store/actions/ChartActions/commentsActions';
class Gantt extends Component {
    constructor(props) {
        super(props);
        this.initZoom();
    }

    // instance of gantt.dataProcessor
    dataProcessor = null;

    // change the time scale of the Gantt chart
    // The relevant UI is the Toolbar component
    initZoom() {
        gantt.ext.zoom.init({
            levels: [
                {
                    name: 'Hours',
                    scale_height: 60,
                    min_column_width: 30,
                    scales: [
                        { unit: 'day', step: 1, format: '%d %M' },
                        { unit: 'hour', step: 1, format: '%H' },
                    ],
                },
                {
                    name: 'Days',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: 'week', step: 1, format: 'Week #%W' },
                        { unit: 'day', step: 1, format: '%d %M' },
                    ],
                },
                {
                    name: 'Months',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: 'month', step: 1, format: '%F' },
                        { unit: 'week', step: 1, format: '#%W' },
                    ],
                },
            ],
        });
    }

    setZoom(value) {
        gantt.ext.zoom.setLevel(value);
    }

    initGanttDataProcessor() {
        /**
         * type: "task"|"link"
         * action: "create"|"update"|"delete"
         * item: data object object
         */
        const onDataUpdated = this.props.onDataUpdated;
        this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
            return new Promise((resolve, reject) => {
                try {
                    if (onDataUpdated) {
                        onDataUpdated(type, action, item, id);
                    }

                    // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
                    // resolve({id: databaseId});
                    return resolve();
                } catch (error) {
                    return reject();
                }
            });
        });
    }

    // only update when the props actually changed
    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom || this.props.tasks !== nextProps.tasks;
    }

    componentDidMount() {
        //sets the format of the dates that will come from the data source
        gantt.config.xml_date = '%d-%m-%Y %H:%i';
        const { tasks, projectId, setCommentsInfo } = this.props;

        //change color of the tasks
        gantt.locale.labels.section_color = 'Color';
        gantt.form_blocks['color_picker'] = {
            render: function (sns) {
                return "<div class='color_container'><input class='color_picker' type='color'></div>";
            },
            set_value: function (node, value, task) {
                node.querySelector('.color_picker').value = value || '';
            },
            get_value: function (node, task) {
                return node.querySelector('.color_picker').value;
            },
            focus: function (node) {
                var a = node.querySelector('.color_picker');
                a.select();
                a.focus();
            },
        };

        gantt.locale.labels.section_owner = 'Owner';
        gantt.config.lightbox.sections = [
            { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
            { name: 'owner', height: 50, type: 'textarea', map_to: 'official_name' },

            { name: 'color', height: 30, map_to: 'color', type: 'color_picker' },

            { name: 'time', height: 72, map_to: 'auto', type: 'duration' },
        ];
        let click = 0;
        if (!gantt.__taskClick)
            gantt.__taskClick = gantt.attachEvent('onTaskClick', function (id, e) {
                setTimeout(function () {
                    if (click) {
                        return false;
                    } else {
                        //any custom logic here
                        console.log('dbl');
                        setCommentsInfo(projectId, id);
                        //showComments();
                        console.log('done');
                        return true;
                    }
                }, 200);
                click = 0;
            });
        if (!gantt.__taskDblClick)
            gantt.__taskDblClick = gantt.attachEvent('onTaskDblClick', function (id, e) {
                //any custom logic here
                click = 1;
                return true;
            });

        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        if (tasks) gantt.parse(tasks);
    }

    componentWillUnmount() {
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    }

    // This is necessary to update the chart when the tasks are changed in Firebase
    componentDidUpdate(prevProps) {
        if (prevProps.tasks !== this.props.tasks) {
            gantt.clearAll();
            if (this.props.tasks) gantt.parse(this.props.tasks, 'json');
        }
    }

    render() {
        const { zoom } = this.props;
        this.setZoom(zoom);
        return (
            <div
                ref={(input) => {
                    this.ganttContainer = input;
                }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}

Gantt.propTypes = {
    setCommentsInfo: PropTypes.any,
    showComments: PropTypes.any,
    projectId: PropTypes.string,
    tasks: PropTypes.object,
    zoom: PropTypes.string,
    onDataUpdated: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCommentsInfo: (projectid, taskid) => dispatch(setCommentsInfo(projectid, taskid)),
        showComments: () => dispatch(showComments()),
    };
};

export default connect(null, mapDispatchToProps)(Gantt);
