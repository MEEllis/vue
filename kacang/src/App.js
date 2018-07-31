import React, { Component } from 'react';
import { Router, browserHistory, } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
// 定义应用的 history
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router key={Math.random()} routes={routes} history={history} />
      </Provider>
    );
  }
}
