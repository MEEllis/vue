import {createStore,compose,applyMiddleware} from 'redux'
import createSageMiddleware from 'redux-saga'
import reduces from './reduces'
import sagas from './sagas'

const sageMiddleware=createSageMiddleware()
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sageMiddleware),
  // other store enhancers if any
);
const store = createStore(reduces, enhancer);

sageMiddleware.run(sagas)

export default store;