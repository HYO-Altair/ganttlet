/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
    createProject: any;
}

const AddProjectForm = (props: IProps): JSX.Element => {
    const { createProject } = props;
    const [project, setProject] = React.useState({ name: '', description: '' });
    const [open, setOpen] = React.useState(false);
    const handleChange = (e: any) => {
        if (e.target.id === 'name') project.name = e.target.value;
        else project.description = e.target.value;
        setProject(project);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleClose();
        // console.log(this.state);
        createProject(project);
    };
    return (
        <div>
            {/* <div>
                <TextField id="name" label="name" onChange={handleChange} />
                <TextField id="description" label="description" onChange={handleChange} />
            </div>

            <Button onClick={handleSubmit} color="secondary">
                Submit
            </Button> */}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField id="name" label="Name" onChange={handleChange} fullWidth />
                    <TextField id="description" label="Description" onChange={handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        createProject: (project: any) => dispatch(createProject(project)),
    };
};
export default connect(null, mapDispatchToProps)(AddProjectForm);
