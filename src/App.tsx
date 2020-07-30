import React, { Fragment, Suspense, memo, useState, useCallback } from 'react';
import clsx from 'clsx';
import {
    MuiThemeProvider,
    CssBaseline,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Drawer,
} from '@material-ui/core';
import theme from './assets/style/theme';
import GlobalStyles from './assets/style/GlobalStyles';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import NavBar from './components/navigation/NavBar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import smoothScrollTop from './utils/functions/smoothScrollTop';
import Profile from './components/profile/Profile';
import Project from './components/project/Project';

import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import Members from './components/members/Members';
import ProjectSettings from './components/projectSettings/ProjectSettings';
import CommentsArea from './components/ganttapp/CommentArea';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        wrapper: {
            backgroundColor: theme.palette.grey[50],
            overflowX: 'hidden',
            overflowY: 'hidden',
        },
        list: {
            width: 'auto',
        },
        fullList: {
            width: 'auto',
        },
    });

interface IProps extends WithStyles<typeof styles> {
    auth: any;
    comments: any;
}

function App(props: IProps): JSX.Element {
    const { classes, auth, comments } = props;
    const [selectedTab, setSelectedTab] = useState('');
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = React.useState({
        right: false,
    });
    const toggleDrawer = (anchor: any, open: any) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsCommentsOpen({ ...isCommentsOpen, [anchor]: open });
    };

    const list = (anchor: any) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <CommentsArea />
        </div>
    );

    const selectHome = useCallback(() => {
        smoothScrollTop();
        document.title = 'Ganttlet';
        setSelectedTab('Home');
    }, [setSelectedTab]);

    const selectLogin = useCallback(() => {
        smoothScrollTop();
        document.title = 'Login | Ganttlet';
        setSelectedTab('Login');
    }, [setSelectedTab]);

    const selectRegister = useCallback(() => {
        smoothScrollTop();
        document.title = 'Register | Ganttlet';
        setSelectedTab('Register');
    }, [setSelectedTab]);

    const selectProfile = useCallback(() => {
        smoothScrollTop();
        document.title = 'Profile | Ganttlett';
        setSelectedTab('Profile');
    }, [setSelectedTab]);

    const selectDashBoard = useCallback(() => {
        smoothScrollTop();
        document.title = 'Dashboard | Ganttlet';
        setSelectedTab('Dashboard');
    }, [setSelectedTab]);
    const selectProject = useCallback(() => {
        smoothScrollTop();
        document.title = 'Project | Ganttlet';
        setSelectedTab('Project');
    }, [setSelectedTab]);

    const handleMobileDrawerOpen = useCallback(() => {
        setIsMobileDrawerOpen(true);
    }, [setIsMobileDrawerOpen]);

    const handleMobileDrawerClose = useCallback(() => {
        setIsMobileDrawerOpen(false);
    }, [setIsMobileDrawerOpen]);

    const handleSideDrawerOpen = () => {
        setIsSideDrawerOpen(true);
    };

    const handleSideDrawerClose = () => {
        setIsSideDrawerOpen(false);
    };

    const renderMergedProps = (component: any, ...rest: any) => {
        const finalProps = Object.assign({}, ...rest);
        return React.createElement(component, finalProps);
    };

    const PropsRoute = ({ component, ...rest }: any) => (
        <Route {...rest} render={(routeProps) => renderMergedProps(component, routeProps, rest)} />
    );

    // routes that should only be accessed by users not logged in
    const PublicRoute = ({ component, ...rest }: any) =>
        auth.uid ? (
            <Redirect to={{ pathname: '/dashboard' }} />
        ) : (
            <Route {...rest} render={(routeProps) => renderMergedProps(component, routeProps, rest)} />
        );

    // routes that should only be accessed by users logged in
    const PrivateRoute = ({ component, ...rest }: any) =>
        auth.uid ? (
            <Route {...rest} render={(routeProps) => renderMergedProps(component, routeProps, rest)} />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );

    function AuthIsLoaded({ children }: any) {
        if (!isLoaded(auth)) return <div>splash screen...</div>;
        return children;
    }

    return (
        <Router>
            <AuthIsLoaded>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles />
                    <Suspense fallback={<Fragment />}>
                        <div className={classes.wrapper}>
                            <div className={classes.root}>
                                <NavBar
                                    selectedTab={selectedTab}
                                    selectTab={setSelectedTab}
                                    mobileDrawerOpen={isMobileDrawerOpen}
                                    handleMobileDrawerOpen={handleMobileDrawerOpen}
                                    handleMobileDrawerClose={handleMobileDrawerClose}
                                    handleSideDrawerOpen={handleSideDrawerOpen}
                                    handleSideDrawerClose={handleSideDrawerClose}
                                    sideDrawerOpen={isSideDrawerOpen}
                                />
                                <Switch>
                                    <PropsRoute path="/home" component={Home} selectHome={selectHome} />
                                    <PrivateRoute
                                        path={'/dashboard'}
                                        component={Dashboard}
                                        selectDashboard={selectDashBoard}
                                        handleSideDrawerClose={handleSideDrawerClose}
                                    />
                                    <PrivateRoute path="/profile" component={Profile} selectProfile={selectProfile} />
                                    <PrivateRoute
                                        path="/project/:id"
                                        component={Project}
                                        selectProject={selectProject}
                                    />
                                    <PrivateRoute
                                        path="/members/:id"
                                        component={Members}
                                        selectProject={selectProject}
                                    />
                                    <PrivateRoute
                                        path="/projectsettings/:id"
                                        component={ProjectSettings}
                                        selectProject={selectProject}
                                    />
                                    <PublicRoute path="/login" component={Login} selectLogin={selectLogin} />
                                    <PublicRoute
                                        path="/register"
                                        component={Register}
                                        selectRegister={selectRegister}
                                    />
                                    <PropsRoute path="/" component={Home} selectHome={selectHome} />
                                </Switch>
                                <React.Fragment key="right">
                                    <Button onClick={toggleDrawer('right', true)}>{'right'}</Button>
                                    <Drawer
                                        anchor="right"
                                        open={isCommentsOpen['right']}
                                        onClose={toggleDrawer('right', false)}
                                    >
                                        {list('right')}
                                    </Drawer>
                                </React.Fragment>
                            </div>
                        </div>
                    </Suspense>
                </MuiThemeProvider>
            </AuthIsLoaded>
        </Router>
    );
}
App.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state: any) => {
    // DEBUG: Uncomment to view current state in console
    //console.log(state);
    return {
        auth: state.firebase.auth,
        comments: state.comments,
        //profile: state.firebase.profile,
    };
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(memo(App)));
