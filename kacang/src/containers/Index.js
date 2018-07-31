import { connect } from 'react-redux';
import Index from '../components/Index/js/Index';
import { getCurrent, getSubAccountPermissionListExtend } from '../redux/account';


const mapStateToProps = (state) => ({
  getCurrentResult: state.account.getCurrentResult,
  getSubAccountPermissionListExtendResult: state.account.getSubAccountPermissionListExtendResult,
  isfetching: state.account.isfetching,
});

export default connect(
  mapStateToProps,
  {
    getCurrent, getSubAccountPermissionListExtend
  }
)(Index);
