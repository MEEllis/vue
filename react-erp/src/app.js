import React, { Component } from 'react';
import { BrowserRouter,} from 'react-router-dom';
import Root  from './router'


export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Root/> 
        </BrowserRouter>
    );
  }
}
