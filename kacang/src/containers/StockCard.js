import { connect } from 'react-redux';
import StockCard from '../components/StockCard/js/StockCard';
import { getStockCard } from '../redux/stockCard';

const mapStateToProps = (state) => ({
  getStockCardResult: state.stockCard.getStockCardResult,
  isfetching: state.stockCard.isfetching
});

export default connect(
  mapStateToProps,
  { getStockCard }
)(StockCard);
