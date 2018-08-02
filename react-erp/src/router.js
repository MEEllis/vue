import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import lazyLoad from './common/lazyLoad';

import Login from 'bundle-loader?lazy&name=login!./containers/User/Login';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/user" component={lazyLoad(Login)}/>
            <Route path="/user/login" component={lazyLoad(Login)}/>
        </Switch>
    </Router>
);

export default Root;