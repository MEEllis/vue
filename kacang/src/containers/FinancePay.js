import { connect } from 'react-redux'

import FinancePay from '../components/FinancePay/js/FinancePay'
import {financePayAction,financeVeriftionAction} from '../actions/finance'
import { bindActionCreators } from 'redux'


import { createSelector } from 'reselect'
const defaultValue = []
const stateItemSelector = (state) => state.financePay.items || defaultValue

const stateSelector = createSelector(
    [stateItemSelector],
    (stateItem)=>{
        if(!stateItem){
            return false
        }
        let itemState ={
            dataSource:[],
        };
        stateItem.map(item =>{
            let temp ={
                key: item.Id,
                Id:item.Id,
                Name:item.Name,
                Account:item.Account,
                AccountName:item.AccountName,
                BankName:item.BankName,
            };
            itemState.dataSource.push(temp)
        })
        return itemState
    }
)


const mapStateToProps = (state) =>{
    return {
        items:stateSelector(state),
        verfitionItems:state.financeVerfition.items
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        financePayAction:bindActionCreators(financePayAction,dispatch),
        financeVeriftionAction:bindActionCreators(financeVeriftionAction,dispatch),
    }
}

export default connect(
    mapStateToProps,
    {
        //initialDispatch,
        financePayAction,
        financeVeriftionAction,
    }
)(FinancePay)
