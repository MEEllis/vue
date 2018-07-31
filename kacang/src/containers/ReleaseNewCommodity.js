import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import ReleaseNewCommodityComponent from '../components/SupState/js/ReleaseNewCommodityComponent'
import {releaseNewAction,releaseNewSubmitAction} from '../actions/release'

import {createSelector } from 'reselect'
const defaultValue = [];

const stateItemSelector = (state) =>state.releaseNewCommodityComponent.items || defaultValue
const submitItemSelector = (state) => state.releaseNewCommodityComponent.submitStatus || ''
const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        if(!stateItem.Data){
            return false
        }
        const Context = stateItem.Data.Context;
        let productType = '';
        switch(Context.ProductType){
            case 1 : productType = '卡密';
                break;
            case 2 : productType = '手工代充';
                break;
            case 4 : productType = '卡密直储';
                break;
            case 8 : productType = '在线直储';
                break;
            default : productType = '';
        }
        let itemState = {
            Name:Context.Name,
            ProductType:productType,
            Code:Context.Code,
            FaceValue:Context.FaceValue,
            Price:Context.Price,
        }
        return itemState
    }
)
// const submitSelector = createSelector(
//     [submitItemSelector],
//     (submitItem) => {
//         return submitItem;
//     }
// )
const mapStateToProps = (state,props) =>{
    return {
        items:stateSelector(state),
        props:props,
        submitStatus:submitItemSelector(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    releaseNewAction:bindActionCreators(releaseNewAction, dispatch),
    releaseNewSubmitAction:bindActionCreators(releaseNewSubmitAction,dispatch),
}}


export default connect(
    mapStateToProps,
    {
        releaseNewAction,
        releaseNewSubmitAction
    }
)(ReleaseNewCommodityComponent)
