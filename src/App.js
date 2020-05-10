import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// Components
import Navbar from './components/Navbar'
import MainRouter from './components/router/MainRouter'
import Snackbar from './components/Snackbar'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
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
      <Router>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Navbar />
          <MainRouter />
          <Snackbar />
        </ReactReduxFirebaseProvider>
      </Router>
    </Provider>
  );
}

export default App;
