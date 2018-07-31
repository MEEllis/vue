import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import StockListZoneLists from '../components/StockList/js/StockListZoneLists';
// import { actionsStart as getDataStart } from '../actions/getData';
import { getZoneStocklist, deleteRelationStockImportZone } from '../redux/stockList';


const stateItemGetData = (state) => state.getData.data || [];
const stateGetDataSelector = createSelector(
    [stateItemGetData],
    (stateItem) => {
        switch (stateItem.source) {
            case 'GetZoneStockDetails':
                stateItem.Data = stateItem.Data.Context;
                for(let k in stateItem.Data){
                    //stateItem.Data[k].key = stateItem.Data[k].StockId;
                    stateItem.Data[k].key = k;
                }
                return stateItem;
                break;
            case 'getPrepaidCardList':
                if(!stateItem.Data){
                    return false
                };
                // 结构不太对 从新修改下
                let itemContext = {
                    Data : stateItem.Data.Context,
                    PageNumber : stateItem.PageNumber,
                    PageSize : stateItem.PageSize,
                    TotalPages : stateItem.TotalPages,
                    TotalRecords : stateItem.TotalRecords
                }
                let itemObj = '';
                for(let k in itemContext.Data){
                    itemObj = itemContext.Data[k];
                    itemObj.key = parseInt(k)+parseInt(stateItem.PageSize)*(parseInt(stateItem.PageNumber)-1);
                    itemObj.StockName = itemObj.StockName+'（'+itemObj.StockCode+'）';
                    if( itemObj.Status == '1' ){
                        itemObj.Status = '充足';
                    }else if( itemObj.Status == '1' ){
                        itemObj.Status = '警报';
                    }else{
                        itemObj.Status = '断货';
                    }
                    itemObj.EnableSecret = itemObj.EnableSecret ? '是' : '否';

                }
                let itemState = itemContext;
                itemState.source = 'getPrepaidCardList';
                return itemState;
              break;
            default:
                return stateItem;
                break;
        }
    }
 )

const stateItemSelector = (state) => state.stockList.getZoneStocklistResult || [];
const stateSelector = createSelector([stateItemSelector], (stateItem) => {
  if (!stateItem) {
    return false;
  }
  const zoneStocklist = [];
  const ItemData = stateItem.Data;
  if (ItemData) {
    ItemData.map((value, index)=>{
      const z = {};
      z.Id = value.Id;
      z.Name = value.Name;
      z.Region = value.Region;
      z.StockCount = value.StockCount;
      z.key = index;
      zoneStocklist.push(z);
    });
  }
  return zoneStocklist;
});

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    // getZoneStocklistResult: state.stockList.getZoneStocklistResult || [],
    getZoneStocklistResult: stateSelector(state),
    deleteRelationStockImportZoneResult: state.stockList.deleteRelationStockImportZoneResult,
    // isfetching: !!state.getData.isfetching,  //还原
    //  data: stateGetDataSelector(state),     //还原
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZoneStocklist: bindActionCreators(getZoneStocklist, dispatch),
    deleteRelationStockImportZone: bindActionCreators(deleteRelationStockImportZone, dispatch),
     //getData:  bindActionCreators(getDataStart, dispatch),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockListZoneLists);
