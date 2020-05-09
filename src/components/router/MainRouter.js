import React from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import Page from './Page'
import MainBoard from '../MainBoard'
import Login from '../Login'
import SignUp from '../SignUp'
import Teammates from '../Teammates'
import Page404 from '../Page404'

function MainRouter(props) {
    if (!props.auth.isLoaded) return (<div>loading...</div>)
    return (
            <div>
                <Router>
                    <Switch>
                        <PrivateRoute path="/" exact component={MainBoard} title='Main'/>
                        <Page path="/login" component={Login} title='Login'/>
                        <Page path="/signup" component={SignUp} title='Sign up'/>
                        <Page path="/teammates/:id" component={Teammates} title='Teammates'/>
                        <Page component={Page404} title='Not found'/>
                    </Switch>
                </Router>
            </div>
    )
}

export default connect((state) => {
    return { auth: state.firebase.auth }
})(MainRouter)
