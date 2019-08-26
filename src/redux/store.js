// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// FireBase
import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import 'firebase/firestore'

// Reducers
import userReducer from './reducers/userReducer'
import taskReducer from './reducers/taskReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore'

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};

const middleWare = [thunk.withExtraArgument(getFirestore)];

const reducers = combineReducers({
    user: userReducer,
    task: taskReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

const store = createStore(
    reducers, 
    initialState, 
    compose( 
        applyMiddleware(...middleWare), 
        reduxFirestore(firebase)
    ));

export default store;