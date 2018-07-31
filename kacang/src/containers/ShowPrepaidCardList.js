import { connect } from 'react-redux';
import ShowPrepaidCardList from '../components/StockList/js/ShowPrepaidCardList';
import { getStockDetail } from '../redux/stockList';

const mapStateToProps = (state) => ({
  getStockDetailResult: state.stockList.getStockDetailResult,
});

export default connect(
    mapStateToProps,
    { getStockDetail }
)(ShowPrepaidCardList);
