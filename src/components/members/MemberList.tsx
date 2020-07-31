import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IProject } from '../../config/types';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    tabletop: {
        backgroundColor:'#F5F5F5'
    }
}));

interface IProps {
    project: IProject;
}


function MemberList(props: IProps): JSX.Element {
    const classes = useStyles();
    const { project } = props;

    function membersList(project: IProject, key: string) {
        if (Object.keys(project.managers).includes(key)) {
            return(
                <TableRow key={key}>
                    <TableCell>
                        <Typography variant="body2">
                            {project.members[key]}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body2">
                            Manager
                        </Typography>
                    </TableCell>
                </TableRow>
            )
        } else {
            return (
                <TableRow key={key}>
                    <TableCell>
                        <Typography variant="body2">
                            {project.members[key]}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body2">
                            Editor
                        </Typography>
                    </TableCell>
                </TableRow>
            )
        }
    }
    
    return (
        <div>
            <Container className={classes.container}>
                <Paper elevation={1}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.tabletop}>
                                <TableCell>
                                    <Typography variant="h5">
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="h5">
                                        Role
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {project.managers &&
                                Object.keys(project.members).map((key) => (
                                    membersList(props.project,key)
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </div>
    );
}
export default MemberList;
