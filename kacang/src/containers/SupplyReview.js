import { connect } from 'react-redux';
import SupplyReview from '../components/SupplyReview';
import { getList, denySupply, allowSupply, stasticPurchaseApplyAudit } from '../redux/supplyReview';

const mapStateToProps = (state) => ({
  getListResult: state.supplyReview.getListResult,
  denySupplyResult: state.supplyReview.denySupplyResult,
  allowSupplyResult: state.supplyReview.allowSupplyResult,
  stasticPurchaseApplyAuditResult: state.supplyReview.stasticPurchaseApplyAuditResult,
  isfetching: state.supplyReview.isfetching
});

export default connect(
  mapStateToProps,
  { getList, denySupply, allowSupply, stasticPurchaseApplyAudit }
)(SupplyReview);
