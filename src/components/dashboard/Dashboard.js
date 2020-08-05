/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProjectCard from './ProjectCard';
import AddProjectForm from './AddProjectForm';
import Notifications from './notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        minHeight: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    titles: {
        paddingTop: theme.spacing(4),
    },
    divider: {
        marginBottom: theme.spacing(2),
    },
    graybg: {
        backgroundColor: 'lightgrey',
    },
}));
const Dashboard = (props) => {
    const classes = useStyles();
    const { projects, handleSideDrawerClose } = props;
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Notifications />
                <Typography variant="h6" className={classes.titles}>
                    Managed Projects
                </Typography>
                <List component="nav">
                    {/*owned projects*/}
                    {projects && projects.owned ? (
                        Object.keys(projects.owned).map((key) => (
                            <ProjectCard
                                projectName={projects.owned[key]}
                                projectID={key}
                                projectDes={key.description}
                                handleSideDrawerClose={handleSideDrawerClose}
                            />
                        ))
                    ) : (
                        <div>
                            <Paper variant="outlined" square className={classes.graybg}>
                                <ListItem>
                                    <ListItemText primary="You have no managed projects. Create one now by clicking the button on the bottom right!" />
                                </ListItem>
                            </Paper>
                        </div>
                    )}
                </List>

                <Typography variant="h6" className={classes.titles}>
                    Joined Projects
                </Typography>
                <List component="nav">
                    {/*joined projects*/}
                    {projects && projects.joined ? (
                        Object.keys(projects.joined).map((key) => (
                            <ProjectCard
                                projectName={projects.joined[key]}
                                projectID={key}
                                projectDes={key.description}
                                handleSideDrawerClose={handleSideDrawerClose}
                            />
                        ))
                    ) : (
                        <div>
                            <Paper variant="outlined" square className={classes.graybg}>
                                <ListItem>
                                    <ListItemText primary="You have no joined projects. " />
                                </ListItem>
                            </Paper>
                        </div>
                    )}
                </List>
                <AddProjectForm />
            </Container>
        </main>
    );
};

const mapStateToProps = (state) => {
    return {
        //auth: state.firebase.auth,
        projects: state.firebase.profile.projects,
    };
};
export default connect(mapStateToProps)(Dashboard);
