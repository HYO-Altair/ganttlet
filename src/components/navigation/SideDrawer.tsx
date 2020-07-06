import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, Divider, Drawer, IconButton } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';

import { secondaryListItems } from './listItems';
import * as Constants from '../../config/constants';

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

interface Props extends WithStyles<typeof styles> {
    // non style props
    handleSideDrawerClose: { (): void };
    sideDrawerOpen: boolean;
    // injected style props
}
function SideDrawer(props: Props) {
    const { classes, handleSideDrawerClose, sideDrawerOpen } = props;

    const menuItems = [
        {
            link: '/',
            name: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            link: '/members',
            name: 'Members',
            icon: <PeopleIcon />,
        },
        {
            link: '/reports',
            name: 'Reports',
            icon: <BarChartIcon />,
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
            <List>{secondaryListItems}</List>
        </Drawer>
    );
}

export default withStyles(styles, { withTheme: true })(memo(SideDrawer));
