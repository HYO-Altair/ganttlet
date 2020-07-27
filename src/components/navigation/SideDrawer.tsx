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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

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
            height: '100%',
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
            icon: <DashboardIcon />,
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
                    <ChevronLeftIcon />
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
                            <ListSubheader inset>Project</ListSubheader>
                            <Link key="1" to={'/project/' + project.projectId}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <BarChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Chart" />
                                </ListItem>
                            </Link>
                            <Link key="2" to={'/members/' + project.projectId}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Members" />{' '}
                                </ListItem>
                            </Link>
                            <Link key="3" to={'/projectsettings/' + project.projectId}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <SettingsIcon />
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
