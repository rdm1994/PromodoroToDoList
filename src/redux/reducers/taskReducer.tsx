import {
    CREATE_TASK,
    CREATE_TASK_ERROR,
    DELETE_TASK,
    DELETE_TASK_ERROR,
    SET_TASK_TIME,
    SET_TASK_TIME_ERROR,
    SET_TASK_DONE,
    SET_TASK_DONE_ERROR,
} from '../types'

const initialState = {}

export default function taskReducer(state = initialState, action: any) {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                createTaskError: null,
            };
        case CREATE_TASK_ERROR:
            return {
                ...state,
                createTaskError: action.err,
            };
        case DELETE_TASK:
            return {
                ...state,
                deleteTaskError: null,
            };
        case DELETE_TASK_ERROR:
            return {
                ...state,
                deleteTaskError: action.err,
            };
        case SET_TASK_TIME:
            return {
                ...state,
                setTaskError: null,
            };
        case SET_TASK_TIME_ERROR:
            return {
                ...state,
                setTaskError: action.err,
            };
        case SET_TASK_DONE:
            return {
                ...state,
                setTaskError: null,
            };
        case SET_TASK_DONE_ERROR:
            return {
                ...state,
                setTaskError: action.err,
            };
        default:
            return { ...state }
    }
}