/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Footer from '../footer/Footer';
import ProjectCard from './ProjectCard';
import AddProjectForm from './AddProjectForm';
import Notifications from './notifications';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            Team Altair {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
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
    titles: {
        paddingTop: theme.spacing(4),
    },
    addProjectFab: {
        position: 'absolute',
        bottom: theme.spacing(60),
        right: theme.spacing(35),
    },
    divider: {
        marginBottom: theme.spacing(2),
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
                <Typography className={classes.titles}>Owned Projects</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={4}>
                    {/*owned projects*/}
                    {projects &&
                        projects.owned &&
                        Object.keys(projects.owned).map((key) => (
                            <Grid key={key} item xs={3}>
                                <ProjectCard
                                    projectName={projects.owned[key]}
                                    projectID={key}
                                    projectDes={key.description}
                                    handleSideDrawerClose={handleSideDrawerClose}
                                />
                            </Grid>
                        ))}
                </Grid>

                <Typography className={classes.titles}>Joined Projects</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={1}>
                    {/*joined projects*/}
                    {projects &&
                        projects.joined &&
                        Object.keys(projects.joined).map((key) => (
                            <Grid key={key} item xs={3}>
                                <ProjectCard
                                    projectName={projects.joined[key]}
                                    projectID={key}
                                    projectDes={key.description}
                                    handleSideDrawerClose={handleSideDrawerClose}
                                />
                            </Grid>
                        ))}
                </Grid>
                <Grid container spacing={1} m="2rem">
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Grid>
                <Grid container spacing={1}>
                    <Box pt={4} className={classes.addProjectFab}>
                        <AddProjectForm />
                    </Box>
                </Grid>
            </Container>
            <Footer />
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
