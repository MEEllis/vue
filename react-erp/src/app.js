import React, { Component } from 'react';
import { BrowserRouter,Route,Switch, } from 'react-router-dom';


import Login from './routes/user/login';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/user" component={Login}/>
                <Route path="/user/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    );
  }
}
