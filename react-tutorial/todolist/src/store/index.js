import {createStore,applyMiddleware,compose } from 'redux'
import reduces from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

const store=createStore(
    reduces,
    enhancer
)

//图书馆
export default store; 