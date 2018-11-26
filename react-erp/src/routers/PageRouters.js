import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/guest/Login';
import Page404 from '../pages/error/Page404';//HashRouter  BrowserRouter


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route component={Page404} />
        </Switch>
    </Router>
)