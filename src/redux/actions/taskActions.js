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

export const createTask = (task) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.collection('tasks').add({
            ...task,
            totalTime: 0,
            userId: getState().firebase.auth.uid,
            timestamp: new Date(),
            done: false,
        }).then(() => {
            dispatch({ type: CREATE_TASK, task });
        }).catch((err) => {
            dispatch({ type: CREATE_TASK_ERROR }, err);
        });
    }
}

export const deleteTask = (taskId) => {
    return (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        firestore.collection('tasks').doc(taskId).delete()
            .then(() => {
                dispatch({ type: DELETE_TASK, taskId });
            }).catch(err => {
                dispatch({ type: DELETE_TASK_ERROR, err });
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