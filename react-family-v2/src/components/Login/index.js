import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';

import LoginSubmit from './LoginSubmit';
import styles from './index.less';

class Login extends Component {
  // 属性默认值:你可以通过配置 defaultProps 为 props定义默认值
  static defaultProps = {
    className: '',
    onSubmit: () => {},
  };
  // 属性类型检查
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };
  static childContextTypes = {
    form: PropTypes.object,
  };

  getChildContext() {
    return {
      form: this.props.form,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.onSubmit(err, values);
    });
  };
  render() {
    const { className, children } = this.props;
    return (
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={this.handleSubmit}>{[...children]}</Form>
      </div>
    );
  }
}

Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Form.create()(Login);
