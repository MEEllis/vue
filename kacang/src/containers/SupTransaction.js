import { connect } from 'react-redux'
import SupTransaction from '../components/SupTransaction/js/SupTransaction'
import { bindActionCreators } from 'redux'
import {supTransactionAction} from '../actions/sup'
import {createSelector } from 'reselect'

// import SupState from '../components/SupState/js/SupState'

const stateItemSelector = (state) => state.supTransaction.items || []
const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        // if(!stateItem.Items){
        if(!stateItem.Data && stateItem){
            return false
        }
        const stateItemData = stateItem.Data;
        let activeLi = '' ;//判断订单状态默认显示哪个
        if( stateItemData.SuspiciousCount > 0 ){
            activeLi = 6;
        }else if( stateItemData.UntreatedCount > 0 ){
            activeLi = 2;
        }else if( stateItemData.ProcessingCount > 0 ){
            activeLi = 3;
        }else if( stateItemData.SuccessCount > 0 ){
            activeLi = 4;
        }else if( stateItemData.FailedCount > 0 ){
            activeLi = 5;
        }
        let itemState ={
            dataSource:[],
            PageNumber:stateItem.PageNumber,
            ProcessingCount:stateItem.ProcessingCount,
            ProfitTotal:stateItem.ProfitTotal,
            SuccessCount:stateItem.SuccessCount,
            SuspiciousCount:stateItem.SuspiciousCount,
            TimeSpan:stateItem.TimeSpan,
            TotalAmount:stateItemData.TotalAmount,
            TotalCost:stateItem.TotalCost,
            TotalPages:stateItem.TotalPages,
            TotalProducts:stateItem.TotalProducts,
            TotalSales:stateItem.TotalSales,
            UntreatedCount:stateItem.UntreatedCount,
            orderStatusNum:[stateItemData.SuspiciousCount,stateItemData.UntreatedCount,stateItemData.ProcessingCount,stateItemData.SuccessCount,stateItemData.FailedCount],
            activeLi:activeLi,
        };
        // stateItem.Items.map(item=>{
        stateItemData.Items.map(item=>{
            switch(item.Status){
                case 1:item.Status = '处理中';
                    break;
                case 2:item.Status = '订单可疑';
                    break;
                case 3:item.Status = '订单成功';
                    break;
                case 4:item.Status = '订单失败';
                    break;
            }
            let term ={
                key: item.Id,
                Id : item.Id,
                Name : item.Name,
                NameCode : item.NameCode,
                Amount : item.Amount,
                OrderPrice : item.OrderPrice,
                ProductFrom : item.ProductFrom,
                ProductFromCode : item.ProductFromCode,
                OrderFrom:item.OrderFrom,
                OrderFromCode : item.OrderFromCode,
                RechargeTo : item.RechargeTo,
                OrderTime : item.OrderTime,
                TotalCost : item.TotalCost,
                Price : item.Price,
                LocalProfit:item.LocalProfit,
                // Profit:(item.OrderPrice - item.TotalCost).toFixed(2),
                Status : [item.Id,item.Status],
            };
                itemState.dataSource.push(term);
            })
        return itemState
    }
)
const fetchingSelector = (state)=>{
    let fetchingItem = state.supTransaction.isfetching;
    if(fetchingItem == undefined){
        fetchingItem = true
    }
    return fetchingItem;
}
const mapStateToProps = (state) =>{
    return {
        items:stateSelector(state),
        isfetching:fetchingSelector(state)

    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        initialDispatch:bindActionCreators(supTransactionAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    {
        supTransactionAction
    }
)(SupTransaction)
