import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import ReleaseExistedProductComponent from '../components/SupState/js/ReleaseExistedProductComponent'
import {releaseOldCommodityListAction,
    releaseOldCommodityList_StepOne_Action,
    releaseOldCommodityList_StepThree_Action,
    releaseOldCommodityList_Submit_Action,
} from '../actions/release'

import {createSelector } from 'reselect'
const defaultValue = [];

const stateItemSelector = (state) =>state.releaseOldCommodityComponent.items || defaultValue
const stateStepOneSelector = (state) =>state.releaseOldCommodityStepOneComponent.stepOneItems || defaultValue
const stateStepThreeSelector = (state) =>state.releaseOldCommodityStepThreeComponent.stepThreeItems ||defaultValue
const submitItemSelector = (state) => state.releaseOldCommoditySubmitComponent.submitItems || ''
const submitReturnSelector = (state) => state.releaseOldCommoditySubmitComponent.submitItems || ''
const submitReturnErrorSelector = (state) => state.releaseOldCommoditySubmitComponent.error || ''

// const fetchingStepOneSelector = (state) => {
//     return  state.releaseOldCommodityStepOneComponent.isfetching
// }


// const submitItemSelector = (state) => state.releaseNewCommodityComponent.submitStatus || ''
const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        if(!stateItem.Data){
            return false
        }
        let itemState = {
            dataSource:[],
            // columns:columnsDockType1,
            TotalRecords:stateItem.TotalRecords
        };
        stateItem.Data.Context.map((item,index) =>{
            let type = ''; //商品类型
            let productStockStatus = ''; //库存状态
            let saleStatus = ''; //销售状态
            switch(item.Type){
                case 1: type = '卡密';
                    break;
                case 2: type = '手工代充';
                    break;
                case 4: type = '卡密直储';
                    break;
                case 8: type = '在线直储';
                    break;
                default: type = ''
            };
            switch(item.ProductStockStatus){
                case 1: productStockStatus = '库存充足';
                    break;
                case 2: productStockStatus = '警报';
                    break;
                case 3: productStockStatus = '断货';
                    break;
                default: productStockStatus = ''
            };
            switch(item.SaleStatus){
                case 1: saleStatus = '已上架';
                    break;
                case 2: saleStatus = '未上架';
                    break;
                default: saleStatus = ''
            };

            let terms = {
                key:index,
                CreateTime:item.CreateTime,
                DockAssociateCode:item.DockAssociateCode,
                DockAssociateName:item.DockAssociateName,
                ProductId:item.ProductId,
                ProductName:item.ProductName,
                Type:type,
                ProductCode:item.ProductCode,
                FaceValue:item.FaceValue,
                ProductPrice:item.ProductPrice,

                ProductStockStatus:productStockStatus,
                // DockStock:item.DockStock,
                SaleStatus:[saleStatus,'未供卡仓'],
                Options:'ddd'
            }
            itemState.dataSource.push(terms)
        })

        return itemState
    }
)
const stepOneSelector = createSelector(
    [stateStepOneSelector],
    (stateStepOne) =>{
        if(!stateStepOne.Data){
            return false
        }
        let stepOneData = stateStepOne.Data.Context;
        let productType = '';
        switch(stepOneData.ProductType){
            case 1: productType = '卡密';
                break;
            case 2: productType = '手工代充';
                break;
            case 4: productType = '卡密直储';
                break;
            case 8 :productType = '在线直储';
                break;
            default:productType = '';
        }
        let stepOneState = {
            CategoryId:stepOneData.CategoryId,
            Code:stepOneData.Code,
            Content:stepOneData.Content,
            FaceValue:stepOneData.FaceValue,
            Id:stepOneData.Id,
            Name:stepOneData.Name,
            Price:stepOneData.Price,
            ProductType:productType,
            SaleStatus:stepOneData.SaleStatus,
            ProductRelations:[]
        }
        // if(stepOneData.ProductRelations.length > 0){
        //     stepOneData.ProductRelations.map(item =>{
        //         let termState = {
        //
        //         }
        //     })
        // }
        return stepOneState
    }
)
const stepThreeSelector = createSelector(
    [stateStepThreeSelector],
    (stateStepThree) =>{
        if(!stateStepThree.Data){
            return false;
        }
        let stepThreeData = stateStepThree.Data.Context;
        let stepThreeState = {
            ProductRelations:[]
        }
        if(stepThreeData.ProductRelations.length > 0){
            stepThreeData.ProductRelations.map(item =>{
                let termState = {
                    DockProductName:item.DockProductName,
                    Priority:item.Priority,
                }
                stepThreeState.ProductRelations.push(termState)
            })
        }

        return stepThreeState;
    }
)
// const submitSelector = createSelector(
//     [submitItemSelector],
//     (submitItem) =>{
//         if(!submitItem.Data){
//             return false;
//         }
//         return submit.Data
//     }
// )
const fetchingSelector = (state,fetchingItem)=>{
    let fetchingStepSelector = fetchingItem.isfetching;
    if(fetchingStepSelector == undefined){
        fetchingStepSelector = true
    }
    return fetchingStepSelector;
}
const mapStateToProps = (state,props) =>{
    return {
        items:stateSelector(state),
        props:props,
        stepOneItems:stepOneSelector(state),
        stepThreeItems:stepThreeSelector(state),
        submitItem:submitItemSelector(state),
        isfetchingStepOne:fetchingSelector(state,state.releaseOldCommodityStepOneComponent),
        isfetchingStepTwo:fetchingSelector(state,state.releaseOldCommodityComponent),
        isfetchingStepThree:fetchingSelector(state,state.releaseOldCommodityStepThreeComponent),
        // submitItem:submitReturnSelector(state),
        submitError:submitReturnErrorSelector(state),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        releaseOldCommodityListAction:bindActionCreators(releaseOldCommodityListAction, dispatch),
        releaseOldCommodityList_StepOne_Action:bindActionCreators(releaseOldCommodityList_StepOne_Action, dispatch),
        releaseOldCommodityList_StepThree_Action:bindActionCreators(releaseOldCommodityList_StepThree_Action, dispatch),
        releaseOldCommodityList_Submit_Action:bindActionCreators(releaseOldCommodityList_Submit_Action, dispatch),

}}


export default connect(
    mapStateToProps,
    {
        releaseOldCommodityListAction,
        releaseOldCommodityList_StepOne_Action,
        releaseOldCommodityList_StepThree_Action,
        releaseOldCommodityList_Submit_Action,
    }
)(ReleaseExistedProductComponent)
