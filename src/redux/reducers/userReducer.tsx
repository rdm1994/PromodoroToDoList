import {
    SET_AUTHENTICATED,
} from '../types'

const initialState = {}

export default function userReducer (state = initialState, action : any) {
    switch(action.type) {
        case SET_AUTHENTICATED :
            return {
                ...state,
                authentificated: true
            };
        default :
            return { ...state }
    }
}