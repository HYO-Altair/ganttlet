import React from 'react';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { firebaseConnect, useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import { makeStyles } from '@material-ui/core/styles';
import { IMessage } from '../../config/types';

import MessageArea from '../ganttapp/MessageArea';

interface IProps {
    projectid: string;
    viewProject: any;
    notViewProject: any;
    deleteProject: any;
}

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        padding: theme.spacing(4),
    },
}));

function JSONtoMessagesArray(json: Record<string, IMessage>) {
    const objects = Object.values(json);
    return objects.map((value) => {
        return `${value.content} by ${value.actor} on ${value.date}`;
    });
}

const ProjectLog = (props: IProps): JSX.Element => {
    const classes = useStyles();
    const { projectid } = props;

    useFirebaseConnect(`projects/${projectid}`);
    const messages = useSelector((state: RootState) =>
        // if comments has been loaded, set project, else set to null
        projectid &&
        state.firebase.data.projects &&
        state.firebase.data.projects[projectid] &&
        state.firebase.data.projects[projectid].messages
            ? JSONtoMessagesArray(state.firebase.data.projects[projectid].messages)
            : [],
    );
    if (messages) {
        return (
            <div>
                <div className={classes.appBarSpacer} />
                {/* {JSON.stringify(messages)} */}
                <MessageArea messages={messages} />
            </div>
        );
    } else
        return (
            <div>
                <div className={classes.appBarSpacer} />
                <MessageArea messages={[]} />
            </div>
        );
};
const mapStateToProps = (state: any, ownProps: any) => {
    const projectid = ownProps.match.params.id;
    return {
        projectid,
    };
};
export default compose(connect(mapStateToProps, null), firebaseConnect([{ path: 'projects' }]))(ProjectLog);
