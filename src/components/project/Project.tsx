import React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Card, CardActionArea, CardContent } from '@material-ui/core';

interface IProps {
    project: {
        name: string;
        description: string;
    };
}

const Project = (props: IProps): JSX.Element => {
    const { project } = props;
    if (project) {
        return (
            <div>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {project.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {project.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Typography gutterBottom variant="h5">
                    {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {project.description}
                </Typography>
            </div>
        );
    } else {
        return (
            <div>
                <Typography gutterBottom variant="h5">
                    Project not found
                </Typography>
            </div>
        );
    }
};
const mapStateToProps = (state: any, ownProps: any) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firebase.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project,
    };
};

export default compose(connect(mapStateToProps), firebaseConnect([{ path: 'projects' }]))(Project);
