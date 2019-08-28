import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
//  Firebase
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
//  MIU
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

//  MIU styles
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// Login Component
function Login({ firebase, auth, history }) {
    console.log(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginWithGoogle() {
        firebase.login({ provider: 'google', type: 'popup' }).then(() => {
            history.push('/');
        });
    }

    function handleOnClick(e) {
        e.preventDefault();
        if (email && password) {
            firebase.login({
                email,
                password
            }).then(() => {
                history.push('/');
            })
            return;
        }
        isEmpty(auth) ? loginWithGoogle() : firebase.logout()
        console.log('ok!')
    }
    function handleChange(e) {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default: return;
        }
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
                    Log in
                    </Typography>
                <form className={classes.form} noValidate>
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
                        value={email}
                        onChange={handleChange}
                    />
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
                        value={password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!isLoaded(auth)}
                        onClick={handleOnClick}
                    >
                        {isEmpty(auth) ? 'Sign In' : 'Log out'}
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={!isLoaded(auth)}
                        onClick={handleOnClick}
                    >
                        LogIn with Google
                        </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

Login.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
}

export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }))
)(Login)
