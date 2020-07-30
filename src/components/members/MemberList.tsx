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

    function managersList(project: IProject ) {
        const managersList: string[] = [];
        const membersList: string[] = [];
        Object.keys(project.members).forEach(function(data) {
            if (Object.keys(project.managers).includes(data)) {
                managersList.push(data);
            } else {
                membersList.push(data);
            }
        });
        /*for (var member in Object.values(project.members)) {
            console.log(member);
            if (Object.values(project.managers).includes(member)) {
                managersList.push(member);
            } else {
                membersList.push(member);
            }
            }*/
        return [managersList, membersList];
    }

    const members = managersList(props.project);
    return (
        <div>
            <Container maxWidth="xl" className={classes.container}>
                <Typography className={classes.titles}>Members</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    {/*managers*/}
                    {project.managers &&
                        members[0].map((key) => (
                            <Grid key={key} item xs={2}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h5">
                                                {project.managers[key]}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Manager
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    {project.members &&
                        members[1].map((key) => (
                            <Grid key={key} item xs={3}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h5">
                                                {project.members[key]}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                               Member
                                            </Typography>
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
