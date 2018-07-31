import { connect } from 'react-redux';

import ConfirmPerson from '../components/Confirmation/js/ConfirmPerson';
//  sendWechatVerifyCode, validWeixin, authorization, sendPhoneVerifyCode, validPhoneVerifyCode
import { imgUpload, sendCode, createPersonalIdentification, updateIdentification } from '../redux/account';


const mapStateToProps = (state) => ({
  imgUploadResult: state.account.imgUploadResult,
  sendCodeResult: state.account.sendCodeResult,
  createPersonalIdentificationResult: state.account.createPersonalIdentificationResult,
  updateIdentificationResult: state.account.updateIdentificationResult,
  isfetching: state.account.isfetching
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
    imgUpload,
    sendCode,
    createPersonalIdentification,
    updateIdentification
  }
)(ConfirmPerson);
