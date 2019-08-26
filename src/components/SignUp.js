import React, { useState } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
//  Firebase
import { withFirebase } from 'react-redux-firebase'
//  MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
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
}));

function SignUp({firebase, auth}) {
    
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [firstName, SetFirstName] = useState('');
    const [lastName, SetLastName] = useState('');
    const [errors, SetErrors] = useState(''); 

    function handleOnChange(e) {
        switch(e.target.name){
            case 'email' : 
                SetEmail(e.target.value);
                break;
            case 'password' :
                SetPassword(e.target.value);
                break;
            case 'firstName' :
                SetFirstName(e.target.value);
                break;
            case 'lastName' :
                SetLastName(e.target.value);
                break;
            default :
                return;
        }
    }

    function loginWithGoogle(e) {
        e.preventDefault();
        return firebase.login({ provider: 'google', type: 'popup' });
    }

    function createUserwithCredentials(e) {
        e.preventDefault();
        console.log('fetchdata');
        firebase.createUser({
            email: email,
            password: password
        }, {
            username: firstName + ' ' + lastName,
            email: email
        })
        .then(data => console.log(data))
        .catch(err => {
            SetErrors(err);
        });
    }

    
        const classes = useStyles();
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={lastName}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Typography component="h5" variant="h6" color="secondary">
                        {errors&&errors.message}
                        </Typography>
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={createUserwithCredentials}
                        >
                            Sign Up
                    </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={loginWithGoogle}
                        >
                            SignUp with Google
                    </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
}

export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }))
)(SignUp)