import {
    DELETE_TEAM, 
    DELETE_TEAM_ERROR, 
    CREATE_TEAM, 
    CREATE_TEAM_ERROR
} from '../types'

export const deleteTeam = (teamId) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.update({collection: 'teams', doc: teamId}, {
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
        firestore.collection('team').add({
            ...team,
            userIds: [getState().firebase.auth.uid],
        }).then(() => {
            dispatch({ type: CREATE_TEAM, team });
        }).catch((err) => {
            dispatch({ type: CREATE_TEAM_ERROR }, err);
        });
    }
}