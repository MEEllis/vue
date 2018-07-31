import { connect } from 'react-redux'

import SupState from '../components/SupState/js/SupState'
import {supStateAction,supStateDeleteAction} from '../actions/sup'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'


const defaultValue = [];
const defaultString = '';
const stateItemSelector = (state) => state.supState.items || []
const actionItemSelector = (state) => state.supStateDelete.deleteAction || ''
// const actionItemSelector = (state) => {Status:'200'}
const fetchingItemSelector = (state) => state.supState.isfetching

const stateSelector = createSelector(
    [stateItemSelector],
    (stateItem) =>{
        if(!stateItem.Data){
            return false
        }
        let itemState ={
            dataSource:[],
            TotalRecords:stateItem.TotalRecords,
        };
        stateItem.Data.Context.map(item =>{
            let Status = ''
            switch(item.Status){
                case 1: Status = '同意供货'
                    break;
                case 2: Status = '未同意供货'
                    break;
                case 3: Status = '审核中'
                    break;
                default:Status = ''
            }
            let temp ={
                key:item.ProductCode,
                ProductName:item.ProductName+'('+item.ProductCode+')',
                ProductCode:item.ProductCode,
                FaceValue:item.FaceValue,
                Price:(item.Price).toFixed(4),
                SendType:'普通供货',
                SalerName:item.SalerName+'('+item.SalerId+')',
                SalerId:item.SalerId,
                Status:Status,
                ApplyTime:item.ApplyTime,
                Id:item.Id,
                Options:[item.Status,item.ProductName,item.FaceValue,item.Price,item.ProductCode,item.Id,item.ProductId],
            };
            itemState.dataSource.push(temp)
        })
        return itemState
    }
)
// const actionSelector = createSelector(
//     [actionItemSelector],
//     (actionItem) =>{
//         if(actionItem.Result){
//             return true //删除成功
//         }else{
//             return false  //删除失败
//         }
//     }
// )
const fetchingSelector = (state)=>{
    let fetchingItem = state.supState.isfetching;
    if(fetchingItem == undefined){
        fetchingItem = true
    }
    return fetchingItem;
}
const mapStateToProps = (state) => {
    return {
        items:stateSelector(state),
        deleteAction:actionItemSelector(state),
        isfetching:fetchingSelector(state)

    }
}
const mapDispatchToProps = (dispatch,ownProps) =>{
    return {
        supStateAction:bindActionCreators(supStateAction,dispatch),
        // onClickDispatch:bindActionCreators(supStateActionClick,dispatch),
        supStateDeleteAction:bindActionCreators(supStateDeleteAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    {
        supStateAction,
        // supStateActionClick,
        supStateDeleteAction,
    }
)(SupState)
