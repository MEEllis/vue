import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {bindActionCreators} from 'redux'
import StockAccount from '../components/StockList/js/StockListPacklists'
// import {actionsStart as getData} from '../actions/getData'
import {
  getRelationStocklist,
  getUnrelationStocklist,
  deleteRelationstock,
  updateRelationStockPriority,
  relationStock,
} from '../redux/stockList';

const getRelationStocklistData = (state) => state.stockList.getRelationStocklistResult || []
const getRelationStocklistSelector = createSelector([getRelationStocklistData], (stateItem) => {
  if (!stateItem.Data) {
    return false;
  }
  return stateItem;
});

// const stateGetDataSelector = createSelector([getDataSelector], (stateItem) => {
//   console.log(1111, stateItem);
//   switch (stateItem.source) {
//     case 'UnLinkStock':
//       return stateItem;
//       break;
//     case 'SaveRelationStockList':
//       return stateItem;
//       break;
//     case 'GetPrepaidCardList':
//       if (!stateItem.Data) {
//         return false
//       };
//       // 结构不太对 从新修改下
//       let itemContext = {
//         Data: stateItem.Data.Context,
//         PageNumber: stateItem.PageNumber,
//         PageSize: stateItem.PageSize,
//         TotalPages: stateItem.TotalPages,
//         TotalRecords: stateItem.TotalRecords
//       }
//       let itemObj = '';
//       for (let k in itemContext.Data) {
//         itemObj = itemContext.Data[k];
//         itemObj.key = parseInt(k) + parseInt(stateItem.PageSize) * (parseInt(stateItem.PageNumber) - 1);
//         itemObj.StockName = itemObj.StockName + '（' + itemObj.StockCode + '）';
//         if (itemObj.Status == '1') {
//           itemObj.Status = '充足';
//         } else if (itemObj.Status == '1') {
//           itemObj.Status = '警报';
//         } else {
//           itemObj.Status = '断货';
//         }
//         itemObj.EnableSecret = itemObj.EnableSecret
//           ? '是'
//           : '否';
//       }
//       let itemState = itemContext;
//       itemState.source = 'GetPrepaidCardList';
//       return itemState;
//       break;
//     case 'GetAddRelationStockList':
//       if (!stateItem.Data) {
//         return false
//       };
//       // 结构不太对 从新修改下
//       itemState = stateItem.Data.Context;
//       itemObj = '';
//       for (let k in itemState.Data) {
//         itemObj = itemState.Data[k];
//         itemObj.key = itemObj.Id;
//       }
//       itemState.source = 'GetAddRelationStockList';
//       return itemState;
//       break;
//     default:
//       if (!stateItem.Data) {
//         return false
//       };
//       return stateItem;
//       break;
//   };
//
// })
const mapStateToProps = (state) => {
  return {
    getRelationStocklistResult: getRelationStocklistSelector(state),
    getUnrelationStocklistResult: state.stockList.getUnrelationStocklistResult,
    deleteRelationstockResult: state.stockList.deleteRelationstockResult,
    updateRelationStockPriorityResult: state.stockList.updateRelationStockPriorityResult,
    relationStockResult: state.stockList.relationStockResult,
    isfetching: !!state.stockList.isfetching
  };
};
export default connect(
  mapStateToProps,
  {
    getRelationStocklist,
    getUnrelationStocklist,
    deleteRelationstock,
    updateRelationStockPriority,
    relationStock,
  })(StockAccount);
