import React from 'react';
import { Container, makeStyles, Typography, Divider, Grid, Card, CardActionArea, CardContent } from '@material-ui/core';
import { IProject } from '../../config/types';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    titles: {
        paddingTop: theme.spacing(4),
    },
    divider: {
        marginBottom: theme.spacing(2),
    },
    root: {
        maxWidth: 345,
    },
}));

interface IProps {
    project: IProject;
}

function MemberList(props: IProps): JSX.Element {
    const classes = useStyles();
    const { project } = props;
    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
                <Typography className={classes.titles}>Managers</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={4}>
                    {/*managers*/}
                    {project.managers &&
                        Object.keys(project.managers).map((key) => (
                            <Grid key={key} item xs={3}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h5">{project.managers[key]}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

                <Typography className={classes.titles}>Members</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={1}>
                    {/*owned projects*/}
                    {project.members &&
                        Object.keys(project.members).map((key) => (
                            <Grid key={key} item xs={3}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h5">{project.members[key]}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </div>
    );
}
export default MemberList;
