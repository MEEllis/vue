import { connect } from 'react-redux';
import NoticeDropdown from '../components/NoticeDropdown/js/NoticeDropdown';

const mapStateToProps = (state) => ({
  orderState: {}// state.account.data
});

export default connect(
  mapStateToProps,
)(NoticeDropdown);
