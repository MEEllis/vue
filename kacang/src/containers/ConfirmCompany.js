import { connect } from 'react-redux';

import ConfirmCompany from '../components/Confirmation/js/ConfirmCompany';
//  sendWechatVerifyCode, validWeixin, authorization, sendPhoneVerifyCode, validPhoneVerifyCode
import { imgUpload, sendCodeCompany, createCompanyIdentification, updateIdentificationCompany } from '../redux/account';


const mapStateToProps = (state) => ({
  imgUploadResult: state.account.imgUploadResult,
  sendCodeCompanyResult: state.account.sendCodeCompanyResult,
  createCompanyIdentificationResult: state.account.createCompanyIdentificationResult,
  updateIdentificationCompanyResult: state.account.updateIdentificationCompanyResult,
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
    imgUpload,
    sendCodeCompany,
    createCompanyIdentification,
    updateIdentificationCompany
  }
)(ConfirmCompany);
