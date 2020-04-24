import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    container: {
        padding: 10,
    },
    button: {
        marginTop: 10,
    }
}))

export const Teammates = () => {
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
                HERE WILL BE YOUR TEAMMATES
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
        userName: store.firebase.auth.displayName,
        userId: store.firebase.auth.uid,
    }
}),
firestoreConnect(({ userId }: any) => {
    if (!userId) return [];
    return [{
        collection: 'teams',
        where: ['users', 'array-contains', userId]
    }]
}))(Teammates); 