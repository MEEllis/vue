import { connect } from 'react-redux';
import StockListUpdate from '../components/StockList/js/StockListUpdata';
import { updateStock } from '../redux/stockList';

const mapStateToProps = (state) => ({
  isfetching: state.stockList.isfetching,
  updateStockResult: state.stockList.updateStockResult,
});

export default connect(
    mapStateToProps,
  {
    updateStock
  }
)(StockListUpdate);
