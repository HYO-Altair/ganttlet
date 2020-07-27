import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import projectImage from '../../assets/images/gantt.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

interface Props {
    projectName: string;
    projectID: string;
    handleSideDrawerClose: any;
}

export default function ImgMediaCard(props: Props): JSX.Element {
    const classes = useStyles();
    const { projectName, projectID, handleSideDrawerClose } = props;
    console.log(projectName);
    console.log(projectID);
    return (
        <Link to={'/project/' + projectID}>
            <div onClick={() => handleSideDrawerClose()}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={projectName}
                            height="140"
                            image={projectImage}
                            title={projectName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                name: {projectName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                id: {projectID}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Link>
    );
}
