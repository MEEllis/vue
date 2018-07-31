import { connect } from 'react-redux';

import Confirmation from '../components/Confirmation/js/Confirmation';
//  sendWechatVerifyCode, validWeixin, authorization, sendPhoneVerifyCode, validPhoneVerifyCode
import { getCurrent } from '../redux/account';


const mapStateToProps = (state) => ({
  getCurrentResult: state.account.getCurrentResult
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
    getCurrent
  }
)(Confirmation);
