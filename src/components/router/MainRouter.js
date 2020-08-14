import React from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import Page from './Page'
import MainBoard from '../MainBoard'
import Login from '../Login'
import SignUp from '../SignUp'
import Teammates from '../Teammates'
import Page404 from '../Page404'

import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
}));


function MainRouter(props) {
    const classes = useStyles();

    if (!props.auth.isLoaded) {
        return (
            <div className={classes.root}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <Switch>
            <PrivateRoute path="/" exact component={MainBoard} title='Main' />
            <Page path="/login" component={Login} title='Login' />
            <Page path="/signup" component={SignUp} title='Sign up' />
            <Page path="/teammates/:id" component={Teammates} title='Teammates' />
            <Page component={Page404} title='Not found' />
        </Switch>
    )
}

export default connect((store) => {
    return { auth: store.firebase.auth }
})(MainRouter)
