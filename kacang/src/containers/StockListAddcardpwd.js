import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StockListAdd from '../components/StockList/js/StockListAddcardpwd';
import { createPasswordCard, getPreviewPwdCard, importPwdCard } from '../redux/stockList';


const mapStateToProps = (state) => ({
  createPasswordCardResult: state.stockList.createPasswordCardResult,
  getPreviewPwdCardResult: state.stockList.getPreviewPwdCardResult,
  importPwdCardResult: state.stockList.importPwdCardResult,
});

const mapDispatchToProps = (dispatch) => ({
  createPasswordCard: bindActionCreators(createPasswordCard, dispatch),
  getPreviewPwdCard: bindActionCreators(getPreviewPwdCard, dispatch),
  importPwdCard: bindActionCreators(importPwdCard, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockListAdd);
