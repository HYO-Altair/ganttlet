import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Link,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '85vh',
    },
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    appBarSpacer: theme.mixins.toolbar,
    googleBtn: {
        width: '100%',
        margin: '0 0 48px 0',
        display: 'flex',
        '& img': {
            width: '16px',
            height: '16px',
            padding: 0,
            margin: '0 5px',
            'vertical-align': 'middle',
        },
    },
    root: {
        maxWidth: 345,
    },
}));

//interface IProps {}
//const Comments = (props: IProps): JSX.Element => {
const Comments = (): JSX.Element => {
    const classes = useStyles();
    const [input, setInput] = useState('');

    const handleChange = (event: any) => {
        setInput(event.target.value);
    };
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <div className={classes.appBarSpacer} />
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <ReactMarkdown source={input} escapeHtml={true} />
                    </CardContent>
                </CardActionArea>
            </Card>
            <Divider />
            <Card>
                <CardHeader title={'Change nput'} />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="New Name"
                        name="newname"
                        onChange={handleChange}
                        type="text"
                        value={input}
                        variant="outlined"
                        multiline
                    />
                </CardContent>
            </Card>
        </Container>
    );
};
const mapStateToProps = (state: any) => {
    return {};
};
const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
