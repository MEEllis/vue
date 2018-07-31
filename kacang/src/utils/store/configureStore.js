import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { nprogressMiddleware } from 'redux-nprogress'
import { persistStore, autoRehydrate } from 'redux-persist'

// 导入 reducer 根文件
import rootReducer from '../reducers'


const configureStore = (initialState) => {

    // 创建 Saga 中间件
    const sagaMiddleware = createSagaMiddleware();

    // 创建路由中间件
    const routingMiddleware = routerMiddleware(browserHistory);

    // 开启 Redux DevTools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // 创建 Store
    const store = createStore(
        rootReducer,    // 导入根 reducer
        undefined,      // 初始化状态（initialState） || 持久化状态（persistStore）
        composeEnhancers(
            autoRehydrate(),
            applyMiddleware(
                sagaMiddleware,
                routingMiddleware,
                nprogressMiddleware(),
            )
        ), // 应用中间件
    );

    // 持久化状态
    persistStore(store, {
        // blacklist: ['routing', 'nprogress', 'collapsed'],
        whitelist: ['menu'],
        keyPrefix: 'km:'
    });

    return {
        ...store,
        runSaga: sagaMiddleware.run
    }
}

export default configureStore
