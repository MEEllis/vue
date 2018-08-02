import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '请输入用户名',
    },
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '请输入密码',
    },
    rules: [
      {
        required: true,
        message: '请输入密码!',
      },
    ],
  },
};

export default map;
