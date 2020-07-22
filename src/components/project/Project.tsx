import React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { firebaseConnect, useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import { makeStyles } from '@material-ui/core/styles';
import GanttApp from '../ganttapp/';
import { IProject, IProjectTask } from '../../config/types';

interface IProps {
    projectID: string;
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
}));

const parseFirebaseProjectDataJSON = (json: any): IProject => {
    const project = json as IProject;

    // Convertin from the firebase uid:value structure to an array.
    if (project.tasks) {
        project.tasks.data = Object.values(project.tasks.data) as IProjectTask[];
        project.tasks.links = [];
    }

    return project;
};

const Project = (props: IProps): JSX.Element => {
    const classes = useStyles();
    const { projectID } = props;

    const data = {
        data: [
            { id: 'abcdefg132452', text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
            { id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 },
        ],
        links: [{ id: 1, source: 1, target: 2, type: '0' }],
    };

    useFirebaseConnect([{ path: `projects/${projectID}/` }]);

    const project = useSelector((state: RootState) =>
        // if projects has been loaded, set project, else set to null
        state.firebase.data.projects ? parseFirebaseProjectDataJSON(state.firebase.data.projects[projectID]) : null,
    );
    if (project) {
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}>
                    <GanttApp tasks={project ? project.tasks : data} projectID={projectID} />
                </div>
            </main>
        );
    } else {
        return (
            <div>
                <Typography gutterBottom variant="h5">
                    Project not found or User not authorized.
                </Typography>
            </div>
        );
    }
};
const mapStateToProps = (state: any, ownProps: any) => {
    console.log(state.firebase);
    const projectID = ownProps.match.params.id;
    return {
        projectID,
    };
};

export default compose(connect(mapStateToProps), firebaseConnect([{ path: 'projects' }]))(Project);
