import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import firebase from '../Firebase/firebase';
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
        marginTop: theme.spacing(3),
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

interface RegisterFormObject {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function Register(): JSX.Element {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<RegisterFormObject>();
    const onSubmit = (data: RegisterFormObject) => {
        firebase.createUser(data.email, data.password, data.firstName, data.lastName);
    };

    // This is redundant, but when I tried to use the FirebaseWrapper member function directly I got an error saying `this` is undefined
    const emailIsUnique = async (email: string) => {
        const isUnique = !(await firebase.userAlreadyExists(email));
        return isUnique;
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
                    Sign up
                </Typography>
                {/* 
                So the Cypress tests fail if we don't have the form as noValidate. This wouldn't really matter
                but I was intending to use the inbuilt html validation to make emails of the correct format.
                But that leads to the form not being submitted when the button is clicked (use-form-hook error
                messages are not displayed). This could probably be worked around by having Cypress test each field
                independently rather than typing everything out first and then clicking the button but I think in the
                long term, it's best if we have our own custom validation for email syntax or just ignore it.
                */}
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid data-cy="firstNameContainer" item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={register({ required: true, maxLength: 64 })}
                                data-cy="firstName"
                            />
                            {errors.firstName && <ErrorDisplay type={errors.firstName.type} />}
                        </Grid>
                        <Grid data-cy="lastNameContainer" item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={register({ required: true, maxLength: 64 })}
                                data-cy="lastName"
                            />
                            {errors.lastName && <ErrorDisplay type={errors.lastName.type} />}
                        </Grid>
                        <Grid data-cy="emailContainer" item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                inputRef={register({
                                    required: true,
                                    maxLength: 256,
                                    validate: emailIsUnique,
                                })}
                                data-cy="email"
                            />
                            {errors.email && <ErrorDisplay type={errors.email.type} />}
                        </Grid>
                        <Grid data-cy="passwordContainer" item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        {/*
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                            </Grid>
                            */}
                    </Grid>
                    <Button
                        id="submitButton"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        data-cy="submitButton"
                    >
                        Sign Up
                    </Button>
                    {/*Google Sign in */}
                    <Button onClick={firebase.googleSignIn} className={classes.googleBtn}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                        />
                        Sign Up With Google
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2" component={RouterLink} to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
