import {
    DELETE_TEAM, 
    DELETE_TEAM_ERROR
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
        default :
            return {
                ...state
            };
    }
}