import React from 'react';
import { Rnd } from 'react-rnd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Task from './Task';

const useStyles = makeStyles(() => ({
    tableContainer: {
        border: '1px solid black',
    },
}));

/*This is used to add Days for the Calendar */

function DayList() {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const listDays = days.map((day) => (
        <TableCell key={day.toString()} style={{ border: '1px solid' }}>
            {day}
        </TableCell>
    ));
    return <TableRow>{listDays}</TableRow>;
}

/* Add tasks here */

function listTasks() {
    // Tasks only have number for now
    const tasks = [1, 2, 3];
    const resizingProps = {
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: true,
        right: true,
        top: false,
        topLeft: false,
        topRight: false,
    };
    return tasks.map((task) => (
        <TableRow key={task.toString()}>
            <TableCell colSpan={10} style={{ padding: '10px' }}>
                <Rnd
                    minWidth={100}
                    bounds="parent"
                    dragGrid={[150, 1]}
                    enableResizing={resizingProps}
                    dragAxis="x"
                    style={{ position: 'relative' }}
                    resizeGrid={[150, 1]}
                >
                    <Task number={task}></Task>
                </Rnd>

                {/* <Box number={task}></Box> */}
            </TableCell>
        </TableRow>
    ));
}

export default function MyFirstGrid(): JSX.Element {
    const classes = useStyles();
    return (
        <div>
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={10}>
                                July 2020
                            </TableCell>
                        </TableRow>
                        <DayList />
                    </TableHead>

                    <TableBody>{listTasks()}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
