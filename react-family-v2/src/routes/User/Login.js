import React, { Component } from 'react';
import { connect } from 'dva';
import LoginForm from '../../components/Login/Login';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class Login extends Component {
  state = {
    type: 'account',
  };

  // 登录
  handleSubmit = (err, values) => {
    if (err) {
      return;
    }

    const { type } = this.state;
    const { props } = this;
    props.dispatch({
      type: 'login/login',
      payload: {
        ...values,
        type,
      },
    });
  };

  render() {
    return <LoginForm onSubmit={this.handleSubmit} />;
  }
}
