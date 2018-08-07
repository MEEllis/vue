import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}


/*初始化*/
renderWithHotReload(getRouter());

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
             <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}