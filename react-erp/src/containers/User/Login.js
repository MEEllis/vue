import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import style from './Login.less';
import Login from '../../components/Login/index';

const FormItem = Form.Item;
const { UserName, Password, Submit } = Login;

export default class LoginPage extends Component {
    state={
        status:'ok'
    }

    // 登录
    handleSubmit = (err, values) => {
        if (err) {
            return;
        }
    };

    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };

    render() {
        const { status } = this.state;
        return (
          <div className={style.loginForm}>
            <Login onSubmit={this.handleSubmit}>
              {status === 'error' && this.renderMessage('账户或密码错误')}
              <UserName name="userName" placeholder="请输入用户名" />
              <Password name="password" placeholder="请输入密码" />
              <Submit >登录</Submit>
            </Login>
          </div>
        );
    }
}
