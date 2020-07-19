import React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { firebaseConnect, useFirebaseConnect } from 'react-redux-firebase';
import { RootState } from '../../store/reducers';
import Chart from './Chart';

interface IProps {
    projectID: string;
}

const Project = (props: IProps): JSX.Element => {
    const { projectID } = props;

    useFirebaseConnect([{ path: `projects/${projectID}/` }]);

    const project = useSelector((state: RootState) =>
        // if projects has been loaded, set project,                             else set to null
        state.firebase.data.projects ? state.firebase.data.projects[projectID] : null,
    );

    // DEBUG: uncomment to view current contents of project
    //console.log(project);
    if (project) {
        return (
            <div>
                <Chart />
            </div>
        );
    } else {
        return (
            <div>
                <Typography gutterBottom variant="h5">
                    Project not found or User not authorized.
                </Typography>
            </div>
        );
    }
};
const mapStateToProps = (state: any, ownProps: any) => {
    const projectID = ownProps.match.params.id;
    return {
        projectID,
    };
};

export default compose(connect(mapStateToProps), firebaseConnect([{ path: 'projects' }]))(Project);
