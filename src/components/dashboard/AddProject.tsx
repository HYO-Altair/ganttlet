/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

interface Props {
    createProject: any;
}

const AddProject = (props: Props): JSX.Element => {
    const classes = useStyles();
    const { createProject } = props;
    const [project, setProject] = React.useState({ name: '', description: '' });
    const handleChange = (e: any) => {
        if (e.target.id === 'name') project.name = e.target.value;
        else project.description = e.target.value;
        setProject(project);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // console.log(this.state);
        createProject(project);
    };
    return (
        <div>
            <div>
                <TextField id="name" label="name" onChange={handleChange} />
                <TextField id="description" label="description" onChange={handleChange} />
            </div>

            <Button onClick={handleSubmit} color="secondary">
                {' '}
                Submit{' '}
            </Button>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        createProject: (project: any) => dispatch(createProject(project)),
    };
};
export default connect(null, mapDispatchToProps)(AddProject);
