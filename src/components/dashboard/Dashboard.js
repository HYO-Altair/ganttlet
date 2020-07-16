/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../footer/Footer';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import { firebaseConnect } from 'react-redux-firebase';
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
}));

const Dashboard = (props) => {
    const classes = useStyles();
    const { projects } = props;

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* add project temp code */}
                    <AddProject />

                    {/*projects*/}
                    {projects &&
                        projects.map((p) => (
                            <Grid key={p.key} item xs={3}>
                                <ProjectCard project={p.value} projectID={p.key} />
                            </Grid>
                        ))}
                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
            <Footer />
        </main>
    );
};

const mapStateToProps = (state) => {
    return {
        projects: state.firebase.ordered.projects,
    };
};
export default compose(firebaseConnect([{ path: 'projects' }]), connect(mapStateToProps))(Dashboard);
