import {combineReducers} from 'redux';

import posts from './reducers';

export default combineReducers({
    posts:posts,
});