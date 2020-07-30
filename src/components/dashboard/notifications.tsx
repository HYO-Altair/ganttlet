import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Paper } from '@material-ui/core';
import { acceptInvite } from '../../store/actions/notificationActions';
import SnackbarContent from '@material-ui/core/SnackbarContent';

interface IProps {
    acceptInvite: (projectID: string, projectName: string) => any;
    invitations: Record<string, INotification>;
    uid: string;
}

interface INotification {
    inviterName: string;
    projectName: string;
}

function Notifications(props: IProps): JSX.Element {
    // const [state, setState] = useState({
    //     invitationsList: [<div key={'fuck react'}>Hi</div>],
    // });

    function generateNotificationList(data: Record<string, INotification>) {
        if (!data) {
            return null;
        }
        console.log(data);
        const ans = Object.entries(data).map(([projectId, notification], key) => (
            <div style={{paddingTop: 10, width: 500}}>
                <SnackbarContent
                    message={`Invite from ${notification.inviterName} to join ${notification.projectName}`}
                    action={<Button style={{backgroundColor: 'white'}} onClick={() => props.acceptInvite(projectId, notification.projectName)}>Accept</Button>}
                />
            </div>
        ));
        // if (ans !== state.invitationsList) {
        //     setState({
        //         invitationsList: ans,
        //     });
        // }

        return ans;
    }

    // const useInvitations = () =>
    //     useSelector((state: RootState) =>
    //         state.firebase.data.invitations ? generateNotificationList(state.firebase.data.invitations) : null,
    //     );
    const invitations = generateNotificationList(props.invitations);
    console.log(invitations);

    return (
        <div>
            <Typography>Notifications</Typography>
            {invitations}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        uid: state.firebase.auth.uid,
        invitations: state.firebase.profile.invitations,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        acceptInvite: (projectID: string, projectName: string) => dispatch(acceptInvite(projectID, projectName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
