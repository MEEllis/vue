import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import LoginForm from '../components/Login/js/LoginForm';
//  sendWechatVerifyCode, validWeixin, authorization, sendPhoneVerifyCode, validPhoneVerifyCode
import { checkLogin, getCurrent, getSubAccountPermissionListExtend } from '../redux/account';


const mapStateToProps = (state) => ({
  checkLoginResult: state.account.checkLoginResult,
  getCurrentResult: state.account.getCurrentResult,
  getSubAccountPermissionListExtendResult: state.account.getSubAccountPermissionListExtendResult,
  isfetching: state.account.isfetching,
  // isLoading: state.loginFlow.isLoading,
  // wechatResult: state.loginFlow.wechatResult,
  // validWeixinResult: state.loginFlow.validWeixinResult,
  // authorizationResult: state.loginFlow.authorizationResult,
  // sendPhoneCodeResult: state.loginFlow.sendPhoneCodeResult,
  // validPhoneCodeResult: state.loginFlow.validPhoneCodeResult,
  // redirect,
  // isAuthenticated,
});
export default connect(
  mapStateToProps,
  {
    checkLogin,
    getCurrent,
    getSubAccountPermissionListExtend
  }
)(LoginForm);
