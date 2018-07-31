import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FinanceWithDrawPage from '../components/FinanceWithDrawPage/js/FinanceWithDrawPage';
import { getWithDrawPage, getWithDrawAmount } from '../redux/finance';


const mapStateToProps = (state) => ({
  getWithDrawPageResult: state.finance.getWithDrawPageResult,
  getWithDrawAmountResult: state.finance.getWithDrawAmountResult,
  isfetching: state.finance.isfetching,
});
const mapDispatchToProps = (dispatch) => ({
  getWithDrawPage: bindActionCreators(getWithDrawPage, dispatch),
  getWithDrawAmount: bindActionCreators(getWithDrawAmount, dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinanceWithDrawPage);
