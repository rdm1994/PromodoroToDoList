import {
    ADD_TOAST,
    ADD_TOAST_ERROR,
} from '../types'

const initialState = {
    toasts: []
}

export default function toastReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_TOAST:
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
                addToastError: null,
            };
        case ADD_TOAST_ERROR:
            return {
                ...state,
                addToastError: action.err,
            };
        default:
            return { ...state }
    }
}