import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { firebaseConnect, useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import { makeStyles } from '@material-ui/core/styles';
import { IProject, IProjectTaskLink, IProjectTaskData } from '../../config/types';
import { viewProject, notViewProject, deleteProject } from '../../store/actions/projectActions';
import {
    Card,
    CardHeader,
    Divider,
    Grid,
    CardContent,
    Button,
    TextField,
    CardActions,
    Select,
    MenuItem,
} from '@material-ui/core';

interface IProps {
    projectId: string;
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

const ProjectSettings = (props: IProps): JSX.Element => {
    const classes = useStyles();
    const { projectId, viewProject, notViewProject, deleteProject } = props;
    const [values, setValues] = useState({
        newname: '',
        confirmnewname: '',
        theme: 'light',
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    useFirebaseConnect([{ path: `projects/${projectId}/` }]);
    const project = useSelector((state: RootState) =>
        // if projects has been loaded, set project, else set to null
        state.firebase.data.projects ? parseFirebaseProjectDataJSON(state.firebase.data.projects[projectId]) : null,
    );

    useEffect(() => {
        viewProject(projectId);

        return function cleanup() {
            notViewProject();
        };
    }, [notViewProject, projectId, viewProject]);

    // CHANGE PROJECT NAME
    // delete project
    if (project) {
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Grid container spacing={4}>
                        {/**
                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardHeader title={'Change Project Name' + projectId} />
                                <Divider />
                                <CardContent>
                                    <TextField
                                        fullWidth
                                        label="New Name"
                                        name="newname"
                                        onChange={handleChange}
                                        type="text"
                                        value={values.newname}
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm New Name"
                                        name="confirmnewname"
                                        onChange={handleChange}
                                        style={{ marginTop: '1rem' }}
                                        type="text"
                                        value={values.confirmnewname}
                                        variant="outlined"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button color="primary" variant="outlined">
                                        Update
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardHeader title={'Change Project Theme' + projectId} />
                                <Divider />
                                <CardContent>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.theme}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'light'}>Light</MenuItem>
                                        <MenuItem value={'dark'}>Dark</MenuItem>
                                        <MenuItem value={'amoled'}>AMOLED</MenuItem>
                                    </Select>
                                </CardContent>
                                <CardActions>
                                    <Button color="primary" variant="outlined">
                                        Change
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        **/}
                        <Grid item md={12} xs={12}>
                            <Card>
                                <CardHeader title={'Delete Project'} />
                                <Divider />
                                <CardActions>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    'Are you sure you wish to delete this project? This is not reversable',
                                                )
                                            ) {
                                                // TODO: set project name stuff in viewproject
                                                deleteProject(projectId, '');
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </main>
            </div>
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
    const projectId = ownProps.match.params.id;
    return {
        projectId,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        viewProject: (projectId: string) => dispatch(viewProject(projectId)),
        notViewProject: () => dispatch(notViewProject()),
        deleteProject: (projectId: string, projectName: string) => dispatch(deleteProject(projectId, projectName)),
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([{ path: 'projects' }]),
)(ProjectSettings);
