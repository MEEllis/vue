import { connect } from 'react-redux';
import EditAccount from '../components/UserAccount/js/EditAccount';
import { updateSubAccount } from '../redux/userAccount';

const mapStateToProps = (state) => ({
  updateSubAccountResult: state.userAccount.updateSubAccountResult,
  isfeching: state.userAccount.isfeching
});

export default connect(
  mapStateToProps,
  {
    updateSubAccount
  }
)(EditAccount);
