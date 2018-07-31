import { connect } from 'react-redux'

import {financeRemittanceAction} from '../actions/finance'

import FinanceRemittance from '../components/FinanceRemittance/js/FinanceRemittance'

import {createSelector} from 'reselect'
import { bindActionCreators } from 'redux'


const defaultValue = []
const stateItemSelector = (state) =>state.financeRemittance.items || defaultValue

const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        if(!stateItem.Data){
            return false
        }
        let itemState ={
            dataSource:[],
        };
        stateItem.Data.map(item =>{
            let Status = ''
            switch(item.Status){
                case 2: Status = '已通过'
                    break;
                case 3: Status = '未通过'
                    break;
                default:Status = '未处理'
            }
            let temp ={
                BankName:item.BankName,
                Account:item.Account,
                AccountName:item.AccountName,
                BankSubName:item.BankSubName,
                Sender:item.Sender,
                BankWaterNumber:item.BankWaterNumber,
                Amount:item.Amount,
                RemittanceTime:item.RemittanceTime,
                Status:Status
            };
            itemState.dataSource.push(temp)
        })
        return itemState
    }
)

const mapStateToProps = (state) =>{
    return {
        items:stateSelector(state),
        isfetching:state.financeRemittance.isfetching,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        financeRemittanceAction:bindActionCreators(financeRemittanceAction,dispatch),
    }
}
export default connect(
    mapStateToProps,
    {
        financeRemittanceAction
    }
)(FinanceRemittance)
