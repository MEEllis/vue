import { connect } from 'react-redux';
import AccordionMenu from '../components/AccordionMenu/js/AccordionMenu';

const mapStateToProps = (state) => (
  {
    getCurrentResult: state.account.getCurrentResult,
    getSubAccountPermissionListExtendResult: state.account.getSubAccountPermissionListExtendResult,
  }
);

export default connect(
  mapStateToProps, {}
)(AccordionMenu);
