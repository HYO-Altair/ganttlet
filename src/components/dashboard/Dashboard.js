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

const Dashboard = (props) => {
    const classes = useStyles();
    const { projects, handleSideDrawerClose } = props;
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Typography>Owned Projects</Typography>
                    {/*owned projects*/}
                    {projects &&
                        projects.owned &&
                        Object.keys(projects.owned).map((key) => (
                            <Grid key={key} item xs={3}>
                                <ProjectCard
                                    projectName={projects.owned[key]}
                                    projectID={key}
                                    handleSideDrawerClose={handleSideDrawerClose}
                                />
                            </Grid>
                        ))}
                </Grid>

                <Divider />

                <Grid container spacing={1}>
                    <Typography>Joined Projects</Typography>
                    {/*joined projects*/}
                    {projects &&
                        projects.joined &&
                        Object.keys(projects.joined).map((key) => (
                            <Grid key={key} item xs={3}>
                                <ProjectCard projectName={projects.joined[key]} projectID={key} />
                            </Grid>
                        ))}
                </Grid>

                <Divider />

                <Grid container spacing={1}>
                    <AddProjectForm />
                </Grid>

                <Divider />

                <Grid container spacing={1} m="2rem">
                    <Box pt={4}>
                        <Copyright />
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
