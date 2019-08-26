import {
    CREATE_TASK,
    CREATE_TASK_ERROR,
} from '../types'

const initialState = {}

export default function taskReducer (state = initialState, action : any) {
    switch(action.type) {
        case CREATE_TASK :
            return {
                ...state,
                createTaskError: null,
            };
        case CREATE_TASK_ERROR :
            return {
                ...state,
                createTaskError: action.err,
            };
        default :
            return { ...state }
    }
}