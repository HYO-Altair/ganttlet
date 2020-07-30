import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    links: {
        underline: 'none',
    }
});

interface Props {
    projectName: string;
    projectID: string;
    handleSideDrawerClose: any;
}

export default function ImgMediaCard(props: Props): JSX.Element {
    const classes = useStyles();
    const { projectName, projectID, handleSideDrawerClose } = props;
    return (
        <Link to={'/project/' + projectID} style={{ textDecoration: 'none' }}>
            <div onClick={() => handleSideDrawerClose()}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5">
                                {projectName}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Link>
    );
}
