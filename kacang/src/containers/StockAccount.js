import { connect } from 'react-redux';
import StockAccount from '../components/StockAccount/js/StockAccount';
import { getStockAccount, deleteStockAccount, batchDeleteStockAccount, batchUpdateStockAccount } from '../redux/stockAccount';

const mapStateToProps = (state) => ({
  getStockAccountResult: state.stockAccount.getStockAccountResult,
  deleteStockAccountResult: state.stockAccount.deleteStockAccountResult,
  batchDeleteStockAccountResult: state.stockAccount.batchDeleteStockAccountResult,
  batchUpdateStockAccountResult: state.stockAccount.batchUpdateStockAccountResult,
  isfetching: state.stockAccount.isfetching,
});

// const mapDispatchToProps = (dispatch, ownProps) => (
//   {
//     getStockAccount: bindActionCreators(actionsStart, dispatch),
//     getBatchRemovePrepaidAccount: bindActionCreators(actionsStartDel, dispatch),
//     getBatchUpdatePrepaidCardIsUse: bindActionCreators(batchUpdatePrepaidCardIsUse, dispatch),
//     getData: bindActionCreators(getDataStart, dispatch),
//   }
// );

export default connect(
  mapStateToProps,
  { getStockAccount, deleteStockAccount, batchDeleteStockAccount, batchUpdateStockAccount }
)(StockAccount);
