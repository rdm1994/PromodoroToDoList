import React from 'react'
// Components
import Navbar from './components/Navbar'
import MainRouter from './components/MainRouter'
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// FireBase
import * as firebase from 'firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
// Styles
import './App.css';

const rrfProps = {
  firebase,
  config: { 
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Navbar />
        <MainRouter />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
