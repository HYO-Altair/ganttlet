import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import CommentArea from '../ganttapp/CommentArea/CommentArea';

interface IProps {
    projectId: string;
    viewProject: any;
    notViewProject: any;
    deleteProject: any;
}

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        padding: theme.spacing(4),
    },
}));

const ProjectDiscussion = (props: IProps): JSX.Element => {
    const classes = useStyles();
    const { projectId } = props;

    return (
        <div>
            <div className={classes.appBarSpacer} />
            <CommentArea projectid={projectId} />
        </div>
    );
};
const mapStateToProps = (state: any, ownProps: any) => {
    const projectId = ownProps.match.params.id;
    return {
        projectId,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {};
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([{ path: 'projects' }]),
)(ProjectDiscussion);
