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
import { addToast } from './toastActions'

export const createTask = (task) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        console.log('action');
        console.log(task);
        if(!task.userId) task.userId = getState().firebase.auth.uid;
        firestore.collection('tasks').add({
            ...task,
            totalTime: 0,
            timestamp: new Date(),
            done: false,
        }).then(() => {
            dispatch({ type: CREATE_TASK, task });
            dispatch(addToast({message: `Task ${task.taskName} created`, severity: 'success'}));
        }).catch((err) => {
            dispatch({ type: CREATE_TASK_ERROR }, err);
            dispatch(addToast({message: `Can't create task`, severity: 'error'}));
        });
    }
}

export const deleteTask = (taskId) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.collection('tasks').doc(taskId).delete()
            .then(() => {
                dispatch({ type: DELETE_TASK, taskId });
                dispatch(addToast({message: `Task deleted`, severity: 'success'}));
            }).catch(err => {
                dispatch({ type: DELETE_TASK_ERROR, err });
                dispatch(addToast({message: `Can't delete task`, severity: 'error'}));
            });
    }
}

export const setTaskTotalTime = (taskId, timeToAdd) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.update({ collection: 'tasks', doc: taskId }, { totalTime: timeToAdd })
            .then(() => {
                dispatch({ type: SET_TASK_TIME, taskId });
            }).catch(err => {
                dispatch({ type: SET_TASK_TIME_ERROR, err });
            });
    }
}

export const setTaskDone = (taskId, _done) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.update({ collection: 'tasks', doc: taskId }, { done: _done })
            .then(() => {
                dispatch({ type: SET_TASK_DONE, taskId });
            }).catch(err => {
                dispatch({ type: SET_TASK_DONE_ERROR, err})
            })
    }
}