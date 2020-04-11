import {
    DELETE_TEAM, 
    DELETE_TEAM_ERROR,
    CREATE_TEAM,
    CREATE_TEAM_ERROR,
} from '../types'

const initialState = {};

export default function teamReducer(state=initialState, action: any) {
    switch(action.type) {
        case DELETE_TEAM : 
            return {
                ...state,
                deleteTeamErrors: null,
            };
        case DELETE_TEAM_ERROR : 
            return {
                ...state,
                deleteTeamErrors: action.err,
            };
        case CREATE_TEAM : 
            return {
                ...state,
                createTeamErrors: null,
            };
        case CREATE_TEAM_ERROR : 
            return {
                ...state,
                createTeamErrors: action.err,
            };
        default :
            return {
                ...state
            };
    }
}