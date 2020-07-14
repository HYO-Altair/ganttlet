import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@material-ui/core';
import Title from './Title';
import firebase from '../Firebase/firebase'



export default function Orders() {
    return (
        <React.Fragment>
            <Title>Schedule Table</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField />
                        </TableCell>

                        <TableCell>
                            <TextField />
                        </TableCell>

                        <TableCell>
                            <TextField />
                        </TableCell>
                        <TableCell>
                            <Button type="submit" onClick = {() => {firebase.addProject("test2", "test", firebase.auth.currentUser.uid)}}>
                                add
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
