import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { firebaseConnect, useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import { makeStyles } from '@material-ui/core/styles';
import GanttApp from '../ganttapp/';
import { IProject, IProjectTaskLink, IProjectTaskData } from '../../config/types';
import { viewProject, notViewProject } from '../../store/actions/projectActions';

interface IProps {
    projectID: string;
    viewProject: any;
    handleSideDrawerClose: any;
    notViewProject: any;
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
    root: {
        padding: theme.spacing(4),
    },
}));

const parseFirebaseProjectDataJSON = (json: any): IProject | null => {
    if (json === undefined || json === null) {
        return null;
    }

    const emptyTasksData = {
        data: [],
        links: [],
    };

    const project = json as IProject;
    if (project.tasks) {
        project.tasks.data = Object.values(project.tasks.data) as IProjectTaskData[];
        // if task links exist (>0 links)
        if (project.tasks.links) {
            project.tasks.links = Object.values(project.tasks.links) as IProjectTaskLink[];
        }
    } else {
        project.tasks = emptyTasksData;
    }
    return project;
};

const Project = (props: IProps): JSX.Element => {
    const classes = useStyles();
    const { projectID, viewProject, notViewProject } = props;
    useFirebaseConnect([{ path: `projects/${projectID}/` }]);
    const project = useSelector((state: RootState) =>
        // if projects has been loaded, set project, else set to null
        state.firebase.data.projects ? parseFirebaseProjectDataJSON(state.firebase.data.projects[projectID]) : null,
    );
    useEffect(() => {
        viewProject(projectID);
    }, [projectID, viewProject]);
    if (project) {
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}>
                    <GanttApp tasks={project.tasks} projectID={projectID} messages={project.messages} />
                </div>
            </main>
        );
    } else {
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Typography gutterBottom variant="h5">
                        Project not found or User not authorized.
                    </Typography>
                </main>
            </div>
        );
    }
};
const mapStateToProps = (state: any, ownProps: any) => {
    const projectID = ownProps.match.params.id;
    return {
        projectID,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        viewProject: (projectId: string) => dispatch(viewProject(projectId)),
        notViewProject: () => dispatch(notViewProject()),
    };
};
export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect([{ path: 'projects' }]))(Project);
