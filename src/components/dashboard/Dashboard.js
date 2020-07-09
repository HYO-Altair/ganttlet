import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Footer from '../footer/Footer';
import Table from './Table';
import Projects from './Projects';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            Team Altair {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

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

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Proj = [
        {
            name: 'Project1',
            description: 'Describe Project1',
        },

        {
            name: 'Project2',
            description: 'Describe Project2',
        },

        {
            name: 'Project3',
            description: 'Describe Project3',
        },
        {
            name: 'Project4',
            description: 'Describe Project4',
        },
        {
            name: 'Project5',
            description: 'Describe Project5',
        },
    ];

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Schedule Table */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table />
                        </Paper>
                    </Grid>
                    {Proj.map((p) => (
                        <Grid item xs={3}>
                            <Projects Projects={p} />
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
}
