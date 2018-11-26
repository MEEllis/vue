import { createStore, combineReducers } from 'redux';
import reduces from './reduces'

// 组合最终的store
const store = createStore(combineReducers(reduces), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
