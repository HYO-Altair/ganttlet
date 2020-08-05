import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Hidden, IconButton, Badge } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LoginIcon from '@material-ui/icons/ExitToApp';
import RegisterIcon from '@material-ui/icons/ExitToApp';
import { FaSignOutAlt as ExitToAppIcon } from 'react-icons/fa'; //'@material-ui/icons/ExitToApp';

import NavigationDrawer from './NavigationDrawer';
import SideDrawer from '../navigation/SideDrawer';
import * as Constants from '../../config/constants';

import { logOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const drawerWidth = Constants.drawerWidth;

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            background: theme.palette.common.white,
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        brandText: {
            fontFamily: 'Montserrat, Open Sans, Roboto',
            fontWeight: 400,
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        menuButtonText: {
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
        },
        noDecoration: {
            textDecoration: 'none !important',
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        iconSize: {
            fontSize: '1.5em',
        },
    });

interface IProps extends WithStyles<typeof styles> {
    // non style props
    handleMobileDrawerOpen: VoidFunction;
    handleMobileDrawerClose: VoidFunction;
    mobileDrawerOpen: boolean;
    handleSideDrawerOpen: VoidFunction;
    handleSideDrawerClose: VoidFunction;
    sideDrawerOpen: boolean;

    selectedTab: string;
    selectTab: { (selectedTab: string): void };
    // injected style props
    // redux props
    logOut: any;
    auth: any;
}
function NavBar(props: IProps): JSX.Element {
    const {
        classes,
        handleMobileDrawerOpen,
        handleMobileDrawerClose,
        mobileDrawerOpen,
        handleSideDrawerOpen,
        handleSideDrawerClose,
        sideDrawerOpen,
        selectedTab,
        logOut,
        auth,
    } = props;

    const menuItems = [
        {
            link: '/',
            name: 'Home',
            icon: <HomeIcon className="text-white" />,
        },
        {
            link: '/login',
            name: 'Login',
            icon: <LoginIcon className="text-white" />,
        },
        {
            link: '/register',
            name: 'Register',
            icon: <RegisterIcon className="text-white" />,
        },
    ];
    const handlePersonIconClick = () => {
        console.log('bzzt bzzt person icon clicked (headed to profile');
    };
    const handleNotificationsIconClick = () => {
        console.log('ding dong notifications bell clicked');
    };
    const handleExitIconClick = () => {
        //setUser({ loggedIn: false, email: '' });
        //firebase.signOut();
        // redirect to home?
        logOut();
    };

    return (
        <div>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, auth.uid && sideDrawerOpen && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <div>
                        {auth.uid && (
                            <IconButton
                                edge="start"
                                aria-label="open drawer"
                                onClick={handleSideDrawerOpen}
                                className={clsx(classes.menuButton, sideDrawerOpen && classes.menuButtonHidden)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Link key="home" to="/home" className={classes.noDecoration}>
                            <Typography variant="h4" className={classes.brandText} display="inline">
                                Gantt
                            </Typography>
                            <Typography variant="h4" className={classes.brandText} display="inline" color="primary">
                                let
                            </Typography>
                        </Link>
                    </div>
                    {/*
                    <div>
                        <Button onClick={() => setUser({ loggedIn: !auth.uid, email: user.email })}>
                            Toggle Logged In
                        </Button>
                    </div>
                    */}

                    <div>
                        {auth.uid ? (
                            <div>
                                {/** 
                                <Link
                                    key="profile"
                                    to="/profile"
                                    className={classes.noDecoration}
                                    data-cy="profileButton"
                                >
                                    <IconButton color="inherit" onClick={handlePersonIconClick}>
                                        <PersonIcon />
                                    </IconButton>
                                </Link>

                                <IconButton color="secondary" onClick={handleNotificationsIconClick}>
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                **/}
                                <Link key="logout" to="/login" className={classes.noDecoration} data-cy="logoutButton">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleExitIconClick}
                                        className={classes.iconSize}
                                    >
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Hidden mdUp>
                                    <IconButton onClick={handleMobileDrawerOpen} aria-label="Open Navigation">
                                        <MenuIcon color="primary" />
                                    </IconButton>
                                </Hidden>
                                <Hidden smDown>
                                    {menuItems.map((element) => {
                                        return (
                                            <Link
                                                key={element.name}
                                                to={element.link}
                                                className={classes.noDecoration}
                                                onClick={handleMobileDrawerClose}
                                            >
                                                <Button
                                                    color="secondary"
                                                    size="large"
                                                    classes={{ text: classes.menuButtonText }}
                                                >
                                                    {element.name}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </Hidden>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            {auth.uid && <SideDrawer handleSideDrawerClose={handleSideDrawerClose} sideDrawerOpen={sideDrawerOpen} />}
            <NavigationDrawer
                menuItems={menuItems}
                anchor="right"
                open={mobileDrawerOpen}
                selectedItem={selectedTab}
                onClose={handleMobileDrawerClose}
            />
        </div>
    );
}
const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        logOut: () => dispatch(logOut()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(memo(NavBar)));
