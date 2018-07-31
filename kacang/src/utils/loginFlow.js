import React from 'react';
import { Spin } from 'antd';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

// 需要身份认证
export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => {
    return state.loginFlow.data;
  },
  authenticatingSelector: (state) => {
    // 是否正在进行异步身份验证
    // 返回 true，渲染 LoadingComponent
    // 返回 false，渲染 FailureComponent，如果定义 FailureComponent，浏览器将不会重定向
    return state.loginFlow.isLoading;
  },
  LoadingComponent: () => (
    <div className="ant-spin-nested-loading help-container">
      <Spin size="large" tip="正在进行异步身份验证和授权检查..." />
    </div>
  ),
  // FailureComponent: (state, ownProps) => {},
  // failureRedirectPath: '/login',  // '/login'
  // redirectQueryParamName: 'redirect',  // 'redirect'
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',  // 'UserAuthWrapper'
});

// 不需要身份验证（如登录页）
export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.loginFlow,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  failureRedirectPath: (state, ownProps) => (ownProps.location.query.redirect || '/'),
  predicate: authData => (authData.data === null && authData.isLoading === false),
  allowRedirectBack: false,
});
