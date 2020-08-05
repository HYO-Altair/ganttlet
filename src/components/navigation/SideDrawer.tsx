import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Drawer,
    IconButton,
    ListSubheader,
} from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa'; //@material-ui/icons/ChevronLeft';
import { FaFolder as DashboardIcon } from 'react-icons/fa'; //'@material-ui/icons/Dashboard';
import { FaUsers as PeopleIcon } from 'react-icons/fa'; //'@material-ui/icons/People';
import { FaChartBar as BarChartIcon } from 'react-icons/fa'; //'@material-ui/icons/BarChart';
import { FaCog as SettingsIcon } from 'react-icons/fa'; //'@material-ui/icons/Settings';

import * as Constants from '../../config/constants';
import { connect } from 'react-redux';

const drawerWidth = Constants.drawerWidth;

const styles = (theme: Theme) =>
    createStyles({
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            minHeight: '100vh',
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),

            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
            minHeight: '100vh',
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        noDecoration: {
            textDecoration: 'none !important',
        },
        iconSize: {
            fontSize: '1.5em',
        },
    });

interface IProps extends WithStyles<typeof styles> {
    // non style props
    handleSideDrawerClose: { (): void };
    sideDrawerOpen: boolean;
    project: any; // redux state
    // injected style props
}
const SideDrawer = (props: IProps) => {
    const { classes, handleSideDrawerClose, sideDrawerOpen, project } = props;
    const menuItems = [
        {
            link: '/dashboard',
            name: 'Dashboard',
            icon: <DashboardIcon className={classes.iconSize} />,
        },
    ];
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !sideDrawerOpen && classes.drawerPaperClose),
            }}
            open={sideDrawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleSideDrawerClose}>
                    <ChevronLeftIcon className={classes.iconSize} />
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuItems.map((element) => {
                    return (
                        <Link key={element.name} to={element.link} className={classes.noDecoration}>
                            <ListItem button>
                                <ListItemIcon>{element.icon}</ListItemIcon>
                                <ListItemText primary={element.name} />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
            <Divider />
            {
                // Project Details
                project.projectId && !project.projectError && (
                    <List>
                        <div>
                            <ListSubheader inset>{project.projectName}</ListSubheader>
                            <Link key="1" to={'/project/' + project.projectId}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <BarChartIcon className={classes.iconSize} />
                                    </ListItemIcon>
                                    <ListItemText primary="Chart" />
                                </ListItem>
                            </Link>
                            <Link key="2" to={'/members/' + project.projectId}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PeopleIcon className={classes.iconSize} />
                                    </ListItemIcon>
                                    <ListItemText primary="Members" />{' '}
                                </ListItem>
                            </Link>
                            <Link key="3" to={'/projectsettings/' + project.projectId}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <SettingsIcon className={classes.iconSize} />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />{' '}
                                </ListItem>
                            </Link>
                        </div>
                    </List>
                )
            }
        </Drawer>
    );
};
const mapStateToProps = (state: any) => {
    return {
        //auth: state.firebase.auth,
        project: state.project,
    };
};
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(memo(SideDrawer)));
