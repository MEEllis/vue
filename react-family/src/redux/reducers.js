import {combineReducers} from "redux";

import counter from './reducers/counter';
import userInfo from './reducers/userInfo';
import login from './reducers/login';

export default combineReducers({
    counter,
    userInfo,
    login,
});