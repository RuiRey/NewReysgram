import { createStore, compose } from 'redux';//Creates a Redux store that holds the complete state tree of your app.
                                    //There should only be a single store in your app.
//import comments from './data/comments';
 //import posts from './data/posts';
//import the root reducer
import rootReducer from './reducers/index';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
 
const firebaseConfig = {
    apiKey: "AIzaSyCxRTmdesVl9eAgEQ9K00V4ZBxtRuZLNQM",
    authDomain: "reysgram.firebaseapp.com",
    databaseURL: "https://reysgram.firebaseio.com",
    projectId: "reysgram",
    torageBucket: "reysgram.appspot.com",
    messagingSenderId: "968540393010"
}

const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

// initialize firebase instance
firebase.initializeApp(firebaseConfig)
 
// initialize firestore
// firebase.firestore() // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    // reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)

const defaultState ={

};

const store = createStoreWithFirebase(rootReducer, defaultState);
//const store = createStore(rootReducer, defaultState)

export default store;

const localState = {

}

export const localStore = createStore(rootReducer,localState);
