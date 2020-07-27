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
import DashUI from './AppBar';

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
            <DashUI/>
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
