import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import comments from './comments';


const rootReducer = combineReducers({
    comments: comments,
    firebase: firebaseReducer
});

export default rootReducer;