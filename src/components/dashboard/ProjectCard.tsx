import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, Paper } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    links: {
        underline: 'none',
    },
    inline: {
        display: 'inline',
    },
});

interface Props {
    projectName: string;
    projectID: string;
    projectDes: string;
    handleSideDrawerClose: any;
}

export default function ImgMediaCard(props: Props): JSX.Element {
    const classes = useStyles();
    const { projectName, projectID, handleSideDrawerClose, projectDes } = props;
    return (
        <Link to={'/project/' + projectID} style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" square>
                <ListItem button onClick={() => handleSideDrawerClose()}>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="button"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {projectName}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="caption"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {projectDes}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </Paper>
        </Link>
    );
}
