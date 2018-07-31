import { connect } from 'react-redux';
import UpdatePrepaidCardInfo from '../components/StockList/js/UpdatePrepaidCard';
import { updatePrepaidCard } from '../redux/stockList';

const mapStateToProps = (state) => ({
  updatePrepaidCardResult: state.stockList.updatePrepaidCardResult,
});

export default connect(
  mapStateToProps,
  { updatePrepaidCard }
)(UpdatePrepaidCardInfo);
