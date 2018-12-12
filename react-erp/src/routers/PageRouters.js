import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import Login from '../pages/guest/Login';
import Page404 from '../pages/error/Page404';//HashRouter  BrowserRouter
let Layout = null;
Layout = require('@/layout/TabMode').default;

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={()=><Redirect exact to="/app/home" push></Redirect>} />
            <Route path="/app" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route component={Page404} />
        </Switch>
    </Router>
)