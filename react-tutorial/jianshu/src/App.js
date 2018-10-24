import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './common/Header'
import {GlobalStyle} from './style';
import {GlobalIconfontStyle} from './statics/iconfont/iconfont';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <GlobalStyle></GlobalStyle>
          <GlobalIconfontStyle></GlobalIconfontStyle>
          <Header></Header>
        </div>
      </Provider>
    );
  }
}

export default App;
