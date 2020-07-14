import React, { Fragment, Suspense, memo, useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
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

import { IUser } from './config/sharedTypes';
import { connect } from 'react-redux';
const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        wrapper: {
            backgroundColor: theme.palette.common.white,
            overflowX: 'hidden',
            overflowY: 'hidden',
        },
    });

interface IProps extends WithStyles<typeof styles> {
    auth: any;
}

function App(props: IProps): JSX.Element {
    const { classes, auth } = props;
    const [selectedTab, setSelectedTab] = useState('');
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

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

    const handleSideDrawerOpen = useCallback(() => {
        setIsSideDrawerOpen(true);
    }, [setIsSideDrawerOpen]);

    const handleSideDrawerClose = useCallback(() => {
        setIsSideDrawerOpen(false);
    }, [setIsSideDrawerOpen]);

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

    return (
        <Router>
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
                                />
                                <PrivateRoute path="/profile" component={Profile} selectProfile={selectProfile} />
                                <PrivateRoute path="/project/:id" component={Project} selectProject={selectProject} />
                                <PublicRoute path="/login" component={Login} selectLogin={selectLogin} />
                                <PublicRoute path="/register" component={Register} selectRegister={selectRegister} />
                                <PropsRoute path="/" component={Home} selectHome={selectHome} />
                            </Switch>
                        </div>
                    </div>
                </Suspense>
            </MuiThemeProvider>
        </Router>
    );
}
App.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
    };
};
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(memo(App)));
