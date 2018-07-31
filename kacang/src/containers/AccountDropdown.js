import { connect } from 'react-redux';
import AccountDropdown from '../components/AccountDropdown/js/AccountDropdown';
import { logOut } from '../redux/account';


const mapStateToProps = (state) => ({
  getCurrentResult: state.account.getCurrentResult,
  logOutResult: state.account.logOutResult
});

export default connect(
  mapStateToProps,
  { logOut }
)(AccountDropdown);
