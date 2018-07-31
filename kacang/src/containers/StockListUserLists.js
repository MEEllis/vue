import { connect } from 'react-redux';
import StockListUserLists from '../components/StockList/js/StockListUserLists';
import { getStockAccount, deleteStockAccount, batchDeleteStockAccount, batchUpdateStockAccount } from '../redux/stockAccount';

const mapStateToProps = (state) => ({
  getStockAccountResult: state.stockAccount.getStockAccountResult,
  deleteStockAccountResult: state.stockAccount.deleteStockAccountResult,
  batchDeleteStockAccountResult: state.stockAccount.batchDeleteStockAccountResult,
  batchUpdateStockAccountResult: state.stockAccount.batchUpdateStockAccountResult,
  isfetching: state.stockAccount.isfetching,
});

export default connect(
  mapStateToProps,
  { getStockAccount, deleteStockAccount, batchDeleteStockAccount, batchUpdateStockAccount }
)(StockListUserLists);
