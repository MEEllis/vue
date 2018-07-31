import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import StockAccount from '../components/StockList/js/StockList';
import { getStockList, deleteStock } from '../redux/stockList';


const stateItemSelector = (state) => state.stockList.getStockListResult || [];

const stateSelector = createSelector([stateItemSelector], (stateItem) => {
  if (!stateItem) {
    return false;
  }
  const itemState = {};
  itemState.Data = stateItem.Data;
  itemState.TotalRecords = stateItem.Total;
  try {
    if (itemState.Data.length) {
      let itemObj = '';
      for (const k in itemState.Data) {
        itemObj = itemState.Data[k];
        itemObj.stockName = `${itemObj.Name} (${itemObj.Id})`;
        // itemObj.FaceValueD = itemObj.FaceValue;
        // TypeAndNature  类型/性质
        if (itemObj.StockType === 1) {
          itemObj.TypeAndNature = '卡密';
        } else if (itemObj.StockType === 2) {
          itemObj.TypeAndNature = '在线';
        }
        if (itemObj.Nature === 1) {
          itemObj.TypeAndNature += ' / 普通库存';
        } else if (itemObj.Nature === 2) {
          itemObj.TypeAndNature += ' / 库存包';
        } else if (itemObj.Nature === 3) {
          itemObj.TypeAndNature += ' / 区域库存';
        }

        // 库存状态
        switch (itemObj.StockStatus) {
          case 1:
            itemObj.Status = '断货';
            break;
          case 2:
            itemObj.Status = '警报';
            break;
          default:
            itemObj.Status = '充足';
            break;
        }
        // 报警量
        itemObj.WarningCount = itemObj.WarningCount;
        if (itemObj.Nature !== 1) {
          itemObj.WarningCount = '--';
        }
        itemObj.key = itemObj.Id;
      }
    }
} catch (e) {}
  return itemState;
});

const mapStateToProps = (state) => ({
  getStockListResult: stateSelector(state),
  deleteStockResult: state.stockList.deleteStockResult,
  isfetching: state.stockList.isfetching
});

const mapDispatchToProps = (dispatch) => ({
  getStockList: bindActionCreators(getStockList, dispatch),
  deleteStock: bindActionCreators(deleteStock, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockAccount);
