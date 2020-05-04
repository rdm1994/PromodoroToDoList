import {
    CREATE_TOAST,
    CREATE_TOAST_ERROR,
} from '../types'


export const createToast = (toast) => {
    return (dispatch) => {
        try {
            dispatch({ type: CREATE_TOAST, toast });
        } catch (err) {
            console.log(err);
            dispatch({ type: CREATE_TOAST_ERROR }, err);
        };
    }
}