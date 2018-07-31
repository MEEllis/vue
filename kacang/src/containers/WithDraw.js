import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WithDraw from '../components/FinanceWithDrawPage/js/WithDraw';
import { applyWithDraw } from '../redux/finance';

const mapStateToProps = (state) => ({
  applyWithDrawResult: state.finance.applyWithDrawResult,
});

const mapDispatchToProps = (dispatch) => ({
  applyWithDraw: bindActionCreators(applyWithDraw, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithDraw);
