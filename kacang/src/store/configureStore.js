/* eslint global-require: 0, no-underscore-dangle: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { nprogressMiddleware } from 'redux-nprogress';
// import rootSaga from '../sagas';
// import rootReducer from '../reducers';
import rootSaga from '../redux/sagas';
import rootReducer from '../redux/reducers';

export default (initialState = {}) => {
  // 创建 Saga 中间件
  const sagaMiddleware = createSagaMiddleware();

  // 创建路由中间件
  const routingMiddleware = routerMiddleware(browserHistory);

  // 开启 Redux DevTools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // 创建 Store
  const store = createStore(
    rootReducer,    // 导入根 reducer
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routingMiddleware,
        nprogressMiddleware(),
      )
    ), // 应用中间件
  );

  let sagaTask = sagaMiddleware.run(rootSaga);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // module.hot.accept('../reducers', () => {
    module.hot.accept('../redux/reducers', () => {
      store.replaceReducer(require('../redux/reducers'));
    });
    // module.hot.accept('../sagas', () => {
    module.hot.accept('../redux/sagas', () => {
      const rootNewSagas = require('../redux/sagas');
      sagaTask.cancel();
      sagaTask.done
        .then(() => (sagaTask = sagaMiddleware.run(rootNewSagas)))
        .catch((error) => {
          throw error;
        });
    });
  }

  return store;
};
