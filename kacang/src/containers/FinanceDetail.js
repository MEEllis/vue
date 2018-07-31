import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FinanceDetail from '../components/FinanceDetail/js/FinanceDetail';
import { financedetail, getStatistics } from '../redux/finance';

// import { createSelector } from 'reselect'
// const defaultValue = []
// const stateItemSelector = (state) => state.financeDetail.items || defaultValue
//
// const stateSelector = createSelector(
//     [stateItemSelector],
//     (stateItem)=>{
//         if(!stateItem.Finances){
//             return false
//         }
//         let itemState ={
//             dataSource:[],
//             TotalRecords:stateItem.Finances.TotalRecords,
//             TotalPages:stateItem.Finances.TotalPages
//         };
//
//
//         stateItem.Finances.Data.map(item =>{
//             let TradeAmount = item.TradeAmount;
//             if(item.TradeMark=='+'){
//                 TradeAmount = '+'+TradeAmount;
//             }else {
//                 TradeAmount = '-'+TradeAmount;
//             }
//             let temp ={
//                 Code:item.Code,
//                 TradeNo:item.TradeNo,
//                 TradeChildTypeName:item.TradeChildTypeName,
//                 TradeBeforeAmount:item.TradeBeforeAmount,
//                 TradeAmount:TradeAmount,
//                 TradeAfterAmount:item.TradeAfterAmount,
//                 TradeTime:item.TradeTime,
//                 Status:item.TradeNo
//             };
//             itemState.dataSource.push(temp)
//         })
//         return itemState
//     }
// )

const mapStateToProps = (state) => ({
  financedetailResult: state.finance.financedetailResult,
  getStatisticsResult: state.finance.getStatisticsResult,
  // items:stateSelector(state),
  // data:state.financeDetail.items.Records,
  isfetching: state.finance.isfetching,
});
const mapDispatchToProps = (dispatch) => ({
  financedetail: bindActionCreators(financedetail, dispatch),
  getStatistics: bindActionCreators(getStatistics, dispatch),
  // financeDetailAction: bindActionCreators(financeDetailAction,dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinanceDetail);
