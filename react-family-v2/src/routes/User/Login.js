import React, { Component } from 'react';
import { Alert } from 'antd';
import { connect } from 'dva';
import Login from '../../components/Login/index';
import style from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  // 登录
  handleSubmit = (err, values) => {
    if (err) {
      return;
    }

    const { props } = this;
    const { userName, password } = values;
    props.dispatch({
      type: 'login/login',
      payload: {
        userName,
        password,
      },
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={style.loginForm}>
        <Login onSubmit={this.handleSubmit}>
          {login.status === 'error' && !login.submitting && this.renderMessage('账户或密码错误')}
          <UserName name="userName" placeholder="admin/user" />
          <Password name="password" placeholder="888888/123456" />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
