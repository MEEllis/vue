import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postLogin} from "../../redux/actions/login";
import Login from "components/Login/index";

class LoginPage extends Component {

    handleSubmit  = (err, values) => {
        if(err){
            return;
        }
        const {props} = this;
        const {userName,password} = values;
        props.postLogin({userName,password})
      }

    render() {
        return (
            <Login onSubmit={this.handleSubmit}></Login>
        )
    }
}

export default connect((state) => ({login: state.login}), {postLogin})(LoginPage);