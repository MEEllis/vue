import { connect } from 'react-redux';
import Ponents from '../components/StockList/js/StockListCardPwdLists';
import { getPwdcardList } from '../redux/stockList';

const mapStateToProps = (state) => ({
  getPwdcardListResult: state.stockList.getPwdcardListResult,
  isfetching: state.stockList.isfetching
});

export default connect(
    mapStateToProps,
    { getPwdcardList }
)(Ponents);
