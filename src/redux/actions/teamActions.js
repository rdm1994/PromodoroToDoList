import {
    DELETE_TEAM,
    DELETE_TEAM_ERROR,
    CREATE_TEAM,
    CREATE_TEAM_ERROR,
    ADD_TEAM,
    ADD_TEAM_ERROR,
} from '../types'
import { addToast } from './toastActions'
import * as firebase from 'firebase'

export const deleteTeam = (teamId) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.update({ collection: 'teams', doc: teamId }, {
            users: getState().firestore.data.teams[teamId].users.filter(userId => userId !== getState().firebase.auth.uid),
        })
            .then(() => {
                dispatch({ type: DELETE_TEAM, teamId });
                dispatch(addToast({message: `You're deleted from team`, severity: 'success'}));
            }).catch(err => {
                dispatch({ type: DELETE_TEAM_ERROR, err });
                dispatch(addToast({message: `Can't delete you from team`, severity: 'error'}));
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
            dispatch(addToast({message: `Team ${team.name} is created`, severity: 'success'}));
        }).catch((err) => {
            dispatch({ type: CREATE_TEAM_ERROR }, err);
            dispatch(addToast({message: `Can't delete team ${team.name}`, severity: 'error'}));
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
            dispatch(addToast({message: `You're added to team`, severity: 'success'}));
        })
        .catch(err => {
            dispatch({ type: ADD_TEAM_ERROR, err });
            dispatch(addToast({message: `Can't add you to team`, severity: 'error'}));
        });
    }
}