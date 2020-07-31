import React from 'react';
import { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { useSelector, connect } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import { IUser } from '../../config/types';
import { sendInvite } from '../../store/actions/notificationActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

interface IProps {
    sendInvite: (inviteeID: string, projectID: string, projectName: string, inviterName: string) => any;
    projectID: string;
}


const useStyles = makeStyles((theme) => ({
    fab: {
        right: 0,
        bottom: 0,
        position: 'fixed',
        padding: theme.spacing(2),
        margin: theme.spacing(7),
    },
}));

function AddMemberForm(props: IProps): JSX.Element {
    const classes = useStyles();

    useFirebaseConnect([{ path: `users` }]);
    useFirebaseConnect([{ path: `projects` }]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getEmailList(usersObject: Record<string, IUser>) {
        if (!usersObject) {
            return { Not: 'Defined' };
        }
        const ans: Record<string, string> = {};
        for (const [uid, user] of Object.entries(usersObject)) {
            ans[user.email] = uid;
        }
        return ans;
    }

    const emailList = useSelector((state: RootState) =>
        // if users have been loaded, set users, else set to null
        getEmailList(state.firebase.data.users),
    );

    const projectDetails = useSelector((state: RootState) => state.firebase.data.projects[props.projectID]);

    const inviteUser = (e: any) => {
        e.preventDefault();
        handleClose();
        if (state.userEmail in emailList) {
            props.sendInvite(
                emailList[state.userEmail],
                props.projectID,
                projectDetails.name,
                String(Object.values(projectDetails.managers)[0]),
            );
        } else {
            console.log(emailList);
            setState({
                ...state,
                error: true,
            });
        }
    };

    const [state, setState] = useState({
        userEmail: '',
        error: false,
    });

    const handleChange = (event: any) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
                className={classes.fab}
                variant="extended"
            >
                <AddIcon />
                Invite Members
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the email of the member you wish to add.
                    </DialogContentText>
                    <TextField
                        error={state.error}
                        id="email"
                        label="Enter Email"
                        name="userEmail"
                        onChange={handleChange}
                        value={state.userEmail}
                        helperText={state.error ? 'User does not exist' : ''}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={inviteUser} color="primary">
                       Invite
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = () => {
    return {};
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        sendInvite: (inviteeID: string, projectID: string, projectName: string, inviterName: string) =>
            dispatch(sendInvite(inviteeID, projectID, projectName, inviterName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberForm);
