import React from 'react'
import { Redirect, Route} from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({component: Component, isLoggedIn, ...rest}) {   
    return (
        <Route 
            {...rest}
            render={props => isLoggedIn? (
                <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )}
        />
    )
}

function mapStateToProps(state){
    return {
        isLoggedIn: !state.firebase.auth.isEmpty,
    };
}

export default connect(mapStateToProps)(PrivateRoute)
