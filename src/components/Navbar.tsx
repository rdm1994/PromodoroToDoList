import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
//MUI staff
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function Navbar({ auth, firebase }: { auth: any, firebase: any }) {
    const classes = useStyles({});
    const history = useHistory();

    const handleGoBack = (e: any) => {
        e.preventDefault();
        history.goBack();
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        if (!auth.isEmpty) {
            firebase.logout(); 
            history.push('/');
        } else history.push('/login');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleGoBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TEAMTOMATO
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>{auth.isEmpty ? 'Login' : 'Logout'}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default compose(connect((store: any) => {
    return { auth: store.firebase.auth }
}), firestoreConnect())(Navbar);
