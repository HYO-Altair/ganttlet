import React from 'react';
import { useSelector, connect } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
import { Typography } from '@material-ui/core';
import { acceptInvite } from '../../store/actions/notificationActions';
import { RootState } from '../../store/reducers';

interface IProps {
    sendInvite: (inviteeID: string, projectID: string) => any;
    projectID: string;
}

function Notifications(): JSX.Element {
    useFirebaseConnect([{ path: `invitations` }]);
    const invitations = useSelector(
        (state: RootState) =>
            // if users have been loaded, set users, else set to null
            state.firebase.data.invitations,
    );
    return (
        <div>
            <Typography>Notifications</Typography>
        </div>
    );
}

const mapStateToProps = () => {
    return {};
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        acceptInvite: (projectID: string) => dispatch(acceptInvite(projectID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
