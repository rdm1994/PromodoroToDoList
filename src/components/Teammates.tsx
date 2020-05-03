import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { flatten } from 'lodash'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { red } from '@material-ui/core/colors'
import { Avatar, Card, CardHeader } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 250,
        maxWidth: 330,
        margin: theme.spacing(3),
        padding: 10
    },
    avatar: {
        backgroundColor: red[500],
        marginBottom: 5
    },
    container: {
        padding: 10,
    },
    button: {
        marginTop: 10,
    }
}))

export const Teammates = ({ teams, users, history }: {teams: any, users: any, history: any}) => {
    const classes = useStyles();

    useEffect(()=> {
        console.log('====users===');
        console.log(users);

    }, [users, teams]);

    const handleOnClick = () => {
        history.push('/');
    }

    let list = users && users.map((user:any) => {
        return <Card className={classes.card} key={user.id}>
            <CardHeader 
                avatar={
                    <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
                }
                title={<Typography variant="h5" component="h2">{user.name}</Typography>}
                subheader={<Typography>{user.email}</Typography>}
            ></CardHeader>
            
        </Card>
    });

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

            <Box display="flex" flexDirection="row">
                {list}
            </Box>

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

export default compose(
    connect((store: any) => {
        console.log('=========store============');
        console.log(store);
        return {
            teams: store.firestore.ordered.teams,
            users: store.firestore.ordered.teams &&
                        flatten(
                            store.firestore.ordered.teams[0].users.map((x: any) => {
                                return store.firestore.ordered[`users${x}`] ? 
                                    store.firestore.ordered[`users${x}`] : [];
                            })
                        )
        }
    }),
    firestoreConnect((props: any) => {
        if (!props) return [];
        return [{
            collection: 'teams',
            doc: props.match.params.id,
        }]
    }),
    firestoreConnect(({ teams }: any) => {
        if (!teams) return [];
        let ids = teams[0].users;
        let res = ids.map((id: any, index: number) => ({
            collection: 'users',
            doc: id,
            storeAs: `users${id}`,
        }));
        return res;
    }),
)(Teammates); 