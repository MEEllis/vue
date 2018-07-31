import { connect } from 'react-redux';

import ConfirmWait from '../components/Confirmation/js/ConfirmWait';
//  sendWechatVerifyCode, validWeixin, authorization, sendPhoneVerifyCode, validPhoneVerifyCode
import { getCurrent } from '../redux/account';


const mapStateToProps = (state) => ({
  getCurrentResult: state.account.getCurrentResult,
  isfetching: state.account.isfetching
});
export default connect(
  mapStateToProps,
  {
    getCurrent
  }
)(ConfirmWait);
