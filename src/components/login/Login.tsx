import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from '../Firebase/firebase';
import { useForm } from 'react-hook-form';
import ErrorDisplay from '../shared/ErrorDisplay';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
}));

interface ILoginFormObject {
    email: string;
    password: string;
}

export default function Login(): JSX.Element {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<ILoginFormObject>();

    const onSubmit = async (data: ILoginFormObject) => {
        await firebase.signIn(data.email, data.password);
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <div className={classes.appBarSpacer} />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <div data-cy="emailContainer">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={register({
                                required: true,
                                maxLength: 256,
                            })}
                            data-cy="email"
                        />
                        {errors.email && <ErrorDisplay type={errors.email.type} />}
                    </div>

                    <div data-cy="passwordContainer">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={register({ required: true, minLength: 12 })}
                            data-cy="password"
                        />
                        {errors.password && <ErrorDisplay type={errors.password.type} />}
                        {!errors.password && !errors.email && firebase.lastLoginAttemptWasInvalid && (
                            <ErrorDisplay type={'invalidLoginAttempt'} />
                        )}
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        data-cy="submitButton"
                    >
                        Sign In
                    </Button>
                    {/*Google Sign in */}
                    <Button
                        onClick={() => {
                            firebase.googleSignIn();
                        }}
                        className={classes.googleBtn}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                        />
                        Log In With Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" component={RouterLink} to="#">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" component={RouterLink} to="/register">
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
