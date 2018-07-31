import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import StockAccount from '../components/StockList/js/StockListPacklists'
const getDataSelector = (state) => state.getData.data || []
const stateGetDataSelector = createSelector(
    [getDataSelector],
    (stateItem) => {
        switch( stateItem.source ){
            case 'UnLinkStock':
                return stateItem;
                break;
            case 'SaveRelationStockList':
                return stateItem;
                break;
            case 'GetPrepaidCardList':
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
                itemState.source = 'GetPrepaidCardList';
              return itemState;
            break;
            case 'GetAddRelationStockList':
                if(!stateItem.Data){
                    return false
                };
                // 结构不太对 从新修改下
                itemState = stateItem.Data.Context;
                itemObj = '';
                for(let k in itemState.Data){
                    itemObj = itemState.Data[k];
                    itemObj.key = itemObj.Id;
                }
                itemState.source = 'GetAddRelationStockList';
              return itemState;
            break;
            default:
                if(!stateItem.Data){
                    return false
                };
                return stateItem;
            break;
        };

    }
)
const mapStateToProps = (state, ownProps) => {
    return {
        data: stateGetDataSelector(state),
        isfetching: !!state.getData.isfetching,
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getData: bindActionCreators(getData, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockAccount)
