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
    project: {
        name: string;
        description: string;
    };
    projectID: string;
}

export default function ImgMediaCard(props: Props): JSX.Element {
    const classes = useStyles();
    const { project, projectID } = props;

    return (
        <Link to={'/project/' + projectID}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={project.name}
                        height="140"
                        image={projectImage}
                        title={project.name}
                    />
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
        </Link>
    );
}
