import React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';

interface Props {
    project: {
        name: string;
        description: string;
    };
}

const Project = (props: Props): JSX.Element => {
    const { project } = props;

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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'projects',
        },
    ]),
)(Project);
