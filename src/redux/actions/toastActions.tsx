import {
    ADD_TOAST,
    ADD_TOAST_ERROR,
} from '../types'

import { Toast } from '../../components/Snackbar'


export const addToast = (toast: Toast) => {
    return (dispatch: any) => {
        try {
            dispatch({ type: ADD_TOAST, toast });
        } catch (err) {
            dispatch({ type: ADD_TOAST_ERROR }, err);
        };
    }
}