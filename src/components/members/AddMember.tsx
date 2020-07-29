import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useSelector, connect } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import { IUser } from '../../config/types';
import { sendInvite } from '../../store/actions/notificationActions';

interface IProps {
    sendInvite: (inviteeID: string, projectID: string, projectName: string, inviterName: string) => any;
    projectID: string;
}

function AddMemberForm(props: IProps): JSX.Element {
    useFirebaseConnect([{ path: `users` }]);
    useFirebaseConnect([{ path: `projects` }]);

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

    const inviteUser = () => {
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
            <TextField
                error={state.error}
                fullWidth
                label="New Name"
                name="userEmail"
                onChange={handleChange}
                type="text"
                value={state.userEmail}
                variant="outlined"
                helperText={state.error ? 'User does not exist' : ''}
            />
            <Button onClick={inviteUser} variant="contained">
                Default
            </Button>
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
