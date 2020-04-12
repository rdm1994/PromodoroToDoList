import {
    DELETE_TEAM,
    DELETE_TEAM_ERROR,
    CREATE_TEAM,
    CREATE_TEAM_ERROR,
    ADD_TEAM,
    ADD_TEAM_ERROR,
} from '../types'
import * as firebase from 'firebase'

export const deleteTeam = (teamId) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.update({ collection: 'teams', doc: teamId }, {
            users: getState().firestore.data.teams[teamId].users.filter(userId => userId !== getState().firebase.auth.uid),
        })
            .then(() => {
                dispatch({ type: DELETE_TEAM, teamId });
            }).catch(err => {
                dispatch({ type: DELETE_TEAM_ERROR, err });
            });
    }
}

export const createTeam = (team) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.collection('teams').add({
            ...team,
            users: [getState().firebase.auth.uid],
        }).then(() => {
            dispatch({ type: CREATE_TEAM, team });
        }).catch((err) => {
            console.log(err);
            dispatch({ type: CREATE_TEAM_ERROR }, err);
        });
    }
}

export const addTeam = (teamId) => {
    return async (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        const updatedUsers = [];
        updatedUsers.push(getState().firebase.auth.uid);
        firestore.update({
            collection: 'teams',
            doc: teamId
        }, {
            users: firebase.firestore.FieldValue.arrayUnion(getState().firebase.auth.uid)
        })
        .then(() => {         
            dispatch({ type: ADD_TEAM, teamId });
        })
        .catch(err => {
            dispatch({ type: ADD_TEAM_ERROR, err })
        });
    }
}