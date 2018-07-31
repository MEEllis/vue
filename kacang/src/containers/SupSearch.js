import { connect} from 'react-redux'
// import { bindActionCreators} from 'redux'

import SupSearch from '../components/SupSearch/js/SupSearch'
import {supSearchAction,supSearchPurchaseApplyAction,supSuppliers} from '../actions/sup'
import {commodityAddAction,commodityListTwoAction,commodityListThreeAction,
    commodityListFourAction}  from '../actions/commodity'
import { bindActionCreators } from 'redux'

import {createSelector } from 'reselect'


const defaultValue = [];
const stateItemSelector = (state) =>state.supSearch.items || []
// const fetchingItemSelector = (state) => state.supSearch.isfetching
const purchaseApplySelector = (state) =>state.supSearchPurchaseApply.items ||[]
const getSubpermissionSelector = (state) => state.account.data.permission || ''
const listStateItemSelector = (state) => state.commodityAdd.listItemOne || defaultValue
const listTwoStateItemSelector = (state) => state.commodityAddListTwo.listItemTwo || defaultValue
const listThreeStateItemSelector = (state) => state.commodityAddListThree.listItemThree|| defaultValue
const listFourStateItemSelector = (state) => state.commodityAddListFour.listItemFour || defaultValue


const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        if(!stateItem.Data){
            return false
        }
        let itemState = {
            dataSource : [],
            TotalAmount:stateItem.TotalRecords,
        }
        let dataSource = [];
        stateItem.Data.Context.map((item,index)=>{
            let productStockStatus = item.ProductStockStatus;
            let type = item.Type;
            let purchaseApplyStatus = item.PurchaseApplyStatus;
            // switch(purchaseApplyStatus){
            //     case 1:
            //         purchaseApplyStatus ='已同意供货';
            //         break;
            //     case 2:
            //         purchaseApplyStatus ='未同意供货';
            //         break;
            //     case 3:
            //         purchaseApplyStatus ='已申请进货';
            //         break;
            //     default:
            //         purchaseApplyStatus='';
            //         break;
            // }
            switch(productStockStatus){
                case 1:
                    productStockStatus ='库存充足';
                    break;
                case 2:
                    productStockStatus ='警报';
                    break;
                case 3:
                    productStockStatus ='断货';
                    break;
            }
            switch(type){
                case 1:
                    type ='卡密';
                    break;
                case 2:
                    type ='手工代充';
                    break;
                case 4:
                    type ='卡密直储';
                    break;
                case 8:
                    type ='在线直储';
                    break;
            }
            let temp = {
                ProductCode:item.ProductCode,
                ProductName:item.ProductName,
                SupplierName:item.SupplierName,
                SupplierId:item.SupplierId,
                // ProductId:item.ProductId,
                productStockStatus:productStockStatus,
                FaceValue:item.FaceValue,
                ProductPrice:item.ProductPrice,
                type:type,
                averageChargeTime:'-',
                complaintRate:'-',
                successRate:'-',
                today:'-',
                week:'-',
                month:'-',
                purchaseApplyStatus:[purchaseApplyStatus,item.ProductId],
                key:index,
            }
            itemState.dataSource.push(temp);
        })
        return itemState
    }
)
// const purchaseStateselector = createSelector (
//     [purchaseApplySelector],
//     (purchaseApply) => {
//         if(purchaseApply.Status!='200'){
//             return false
//         }
//         return true
//     }
// )
const fetchingSelector = (state) => {
    let fetchingItem = state.supSearch.isfetching;
    if(fetchingItem == undefined){
        fetchingItem = true
    }
    return fetchingItem;
}

const listStateSelector = createSelector (
    [listStateItemSelector],
    (listStateItem) => {
        if(!listStateItem.Data){
            return false
        }
        let itemState = {
            dataSource:[],
        };
        listStateItem.Data.Context.map(item =>{
            let temp = {
                Id:item.Id,
                Name:item.Name,
                Code:item.Code,
            }
            itemState.dataSource.push(temp);
        })
        // listStateItem.Data.map(item=>{
        //     let temp = {
        //         DockAssociateCode:item.DockAssociateCode,
        //         DockAssociateName:item.DockAssociateName,
        //         DockType:item.DockType,
        //         FaceValue:item.FaceValue,
        //         ProductCode:item.ProductCode,
        //         ProductId:item.ProductId,
        //         ProductName:item.ProductName,
        //         ProductPrice:item.ProductPrice,
        //         ProductStockStatus:item.ProductStockStatus,
        //         SaleStatus:item.SaleStatus,
        //         SecretPrice:item.SecretPrice,
        //         SecretPriceGroupCount:item.SecretPriceGroupCount,
        //         Type:item.Type,
        //     }
        //     itemState.dataSource.push(temp);
        // })
        return itemState
    }
)
const listTwoStateSelector = createSelector (
    [listTwoStateItemSelector],
    (listTwoStateItem) => {
        if(!listTwoStateItem.Data){
            return false
        }
        let itemState = {
            dataSource:[],
        };
        listTwoStateItem.Data.Context.map(item =>{
            let temp = {
                Id:item.Id,
                Name:item.Name,
                Code:item.Code,
            }
            itemState.dataSource.push(temp);
        })
        return itemState
    }
)
const listThreeStateSelector = createSelector (
    [listThreeStateItemSelector],
    (listThreeStateItem) => {
        if(!listThreeStateItem.Data){
            return false
        }
        let itemState = {
            dataSource:[],
        };
        listThreeStateItem.Data.Context.map(item =>{
            let temp = {
                Id:item.Id,
                Name:item.Name,
                Code:item.Code,
                FaceValue:item.FaceValue,
            }
            itemState.dataSource.push(temp);
        })
        return itemState
    }
)
const listFourStateSelector = createSelector (
    [listFourStateItemSelector],
    (listFourStateItem) => {
        if(!listFourStateItem.Data){
            return false
        }
        let itemState = {
            dataSource:[],
        };
        listFourStateItem.Data.Context.map(item =>{
            let temp = {
                Id:item.Id,
                Name:item.Name,
                Code:item.Code,
                FaceValue:item.FaceValue,
            }
            itemState.dataSource.push(temp);
        })
        return itemState
    }
)


const mapStateToProps = (state) =>{
    return {
        items:stateSelector(state),
        isfetching:state.supSearch.isfetching,
        purchaseApply:purchaseApplySelector(state),
        supSuppliersItems:state.supSuppliers.items,
        listItemOne:listStateSelector(state),
        listItemTwo:listTwoStateSelector(state),
        listItemThree:listThreeStateSelector(state),
        listItemFour:listFourStateSelector(state),
    }
}
const mapDispatchToProps = (dispatch,ownProps) =>{
    return {
        supSearchAction:bindActionCreators(supSearchAction,dispatch),
        supSearchPurchaseApplyAction:bindActionCreators(supSearchPurchaseApplyAction,dispatch),
        supSuppliers:bindActionCreators(supSuppliers,dispatch),
        commodityAddAction:bindActionCreators(commodityAddAction,dispatch),
        commodityListTwoAction:bindActionCreators(commodityListTwoAction,dispatch),
        commodityListThreeAction:bindActionCreators(commodityListThreeAction,dispatch),
        commodityListFourAction:bindActionCreators(commodityListFourAction,dispatch),
    }
}
export default connect(
    mapStateToProps,
    {
        supSearchAction,
        supSearchPurchaseApplyAction,
        supSuppliers,
        commodityAddAction,
        commodityListTwoAction,
        commodityListThreeAction,
        commodityListFourAction,
    }
)(SupSearch)
