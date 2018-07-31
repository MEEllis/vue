import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StockListAdd from '../components/StockList/js/StockListAdd';
import { addStockAccount } from '../redux/stockAccount';

const mapStateToProps = (state) => ({
  addStockAccountResult: state.stockAccount.addStockAccountResult,
});

const mapDispatchToProps = (dispatch) => ({
  addStockAccount: bindActionCreators(addStockAccount, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockListAdd);
