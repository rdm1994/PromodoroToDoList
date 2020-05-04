import {
    CREATE_TOAST,
    CREATE_TOAST_ERROR,
} from '../types'

const initialState = {
    toasts: []
}

export default function toastReducer(state = initialState, action: any) {
    switch (action.type) {
        case CREATE_TOAST:
            console.log(action);
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
                createToastError: null,
            };
        case CREATE_TOAST_ERROR:
            return {
                ...state,
                createToastError: action.err,
            };
        default:
            return { ...state }
    }
}