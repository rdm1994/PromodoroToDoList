import {
    CREATE_TOAST,
    CREATE_TOAST_ERROR,
} from '../types'

import { Toast } from '../../components/Snackbar'


export const addToast = (toast: Toast) => {
    return (dispatch: any) => {
        try {
            console.log('loled');
            dispatch({ type: CREATE_TOAST, toast });
        } catch (err) {
            console.log(err);
            dispatch({ type: CREATE_TOAST_ERROR }, err);
        };
    }
}