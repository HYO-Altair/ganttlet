import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    IconButton,
    Typography,
    isWidthUp,
    Toolbar,
    withWidth,
} from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) =>
    createStyles({
        closeIcon: {
            marginRight: theme.spacing(0.5),
        },
        headSection: {
            width: 200,
        },
        blackList: {
            backgroundColor: theme.palette.common.black,
            height: '100%',
        },
        noDecoration: {
            textDecoration: 'none !important',
        },
    });

interface IMenuItem {
    link: string;
    name: string;
    icon: React.ReactNode;
}

interface IProps extends WithStyles<typeof styles> {
    // non style props
    anchor: 'bottom' | 'left' | 'right' | 'top';
    open: boolean;
    onClose: { (): void };
    menuItems: IMenuItem[];
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    selectedItem: string;
    theme: Theme;

    // injected style props
}
function NavigationDrawer(props: IProps): JSX.Element {
    const { width, open, onClose, anchor, classes, menuItems, selectedItem, theme } = props;

    useEffect(() => {
        window.onresize = () => {
            if (isWidthUp('sm', width) && open) {
                onClose();
            }
        };
    }, [width, open, onClose]);

    return (
        <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}>
            <Toolbar className={classes.headSection}>
                <ListItem
                    style={{
                        paddingTop: theme.spacing(0),
                        paddingBottom: theme.spacing(0),
                        height: '100%',
                        justifyContent: anchor === 'left' ? 'flex-start' : 'flex-end',
                    }}
                    disableGutters
                >
                    <ListItemIcon className={classes.closeIcon}>
                        <IconButton onClick={onClose} aria-label="Close Navigation">
                            <CloseIcon color="primary" />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            </Toolbar>
            <List className={classes.blackList}>
                {menuItems.map((element) => {
                    if (element.link) {
                        return (
                            <Link
                                key={element.name}
                                to={element.link}
                                className={classes.noDecoration}
                                onClick={onClose}
                            >
                                <ListItem
                                    button
                                    selected={selectedItem === element.name}
                                    /**
                                     * We disable ripple as it will make a weird animation
                                     * with primary and secondary color
                                     */
                                    disableRipple
                                    disableTouchRipple
                                >
                                    <ListItemIcon>{element.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" className="text-white">
                                                {element.name}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </Link>
                        );
                    }
                    return (
                        <ListItem button key={element.name}>
                            <ListItemIcon>{element.icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" className="text-white">
                                        {element.name}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default withWidth()(withStyles(styles, { withTheme: true })(memo(NavigationDrawer)));
