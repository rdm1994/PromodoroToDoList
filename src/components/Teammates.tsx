import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { flatten } from 'lodash'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import teamReducer from '../redux/reducers/teamReducer';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 10,
    },
    button: {
        marginTop: 10,
    }
}))

export const Teammates = ({ teams }: {teams: any}) => {
    const classes = useStyles();

    const handleOnClick = () => {
    }

    return (
        <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Typography variant="h4" noWrap align='center'>
                {teams? teams[0].name: 'LOADING'}
            </Typography>
            <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOnClick}
            >
                Go Back to main page
            </Button>
        </Box>
    )
}

export default compose(connect((store: any) => {
    console.log('=========store============');
    console.log(store);
    return {
        teams: store.firestore.ordered.teams,
        users: store.firestore.ordered.users ?
                store.firestore.ordered.users.concat(
                    flatten(
                        store.firestore.ordered.users.map((x: any) => {
                            return store.firestore.ordered[`users${x.id}`] ? store.firestore.ordered[`users${x.id}`] : [];
                        })))
                : store.firestore.ordered.tasks,
    }
}),
firestoreConnect((props: any) => {
    if (!props) return [];
    console.log(props.match.params.id);
    return [{
        collection: 'teams',
        doc: props.match.params.id
       // where: ['users', 'array-contains', userId]
    }]
}),
firestoreConnect(({ teams }: any) => {
    if (!teams) return [];
    let ids = teams[0].users;
    console.log(ids);
    let res = ids.map((id: any, index: number) => ({
        collection: 'users',
        doc: id,
        storeAs: `user${id}`,
    }));
    console.log(res);
    return res;
}),
)(Teammates); 