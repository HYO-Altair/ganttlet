import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';

import Title from './Title';

export default function Orders() {
    return (
        <React.Fragment>
            <Title>Schedule Table</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Duration</TableCell>
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
                            <TextField />
                        </TableCell>

                        <TableCell>
                            <TextField />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
