import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'

import ApiRemittanceBank from '../components/ApiRemittance/js/ApiRemittanceBank'
import { getApiRemittanceBank } from '../actions/apiRemittanceBank'
import {addPaymentAccount} from '../actions/addPaymentAccount'
import { delPaymentAccount } from '../actions/delPaymentAccount'
import {modifyPaymentAccount} from '../actions/modifyPaymentAccount'
import {getRemittanceBankItem} from '../actions/getRemittanceBankItem'
const defaultValue = []
const stateItemSelector = (state) => state.apiRemittanceBank.data || defaultValue



const stateSelector = createSelector(
    [stateItemSelector],
    (stateItem)=>{
        if(!stateItem.Data){
            return false
        }
        let itemState ={
            dataSource:[],
        };
        stateItem.Data.Context.map((item,i) =>{
        //     let TradeAmount = item.TradeAmount;
        //     if(item.TradeMark=='+'){
        //         TradeAmount = '+'+TradeAmount;
        //     }else {
        //         TradeAmount = '-'+TradeAmount;
        //     }
            let temp ={
                key:item.Id,
                Name:item.Name,
                Account:item.Account,
                AccountName:item.AccountName,
                BankName:item.BankName,
                Options:item.Id
            };
            itemState.dataSource.push(temp)
        })
        return itemState
    }
)
import menuData from '../../api/menu.json'

const mapStateToProps = (state, ownProps) => {
    return {
        items: stateSelector(state),
        data:state.addPaymentAccount,
        isfetching:state.apiRemittanceBank,
        feedback:state.delPaymentAccount.data,
        modify:state.modifyPaymentAccount.data,
        message:state.getRemittanceBankItem.data
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getApiRemittanceBank: bindActionCreators(getApiRemittanceBank, dispatch),
        addPaymentAccount:bindActionCreators(addPaymentAccount, dispatch),
        delPaymentAccount:bindActionCreators(delPaymentAccount, dispatch),
        modifyPaymentAccount:bindActionCreators(modifyPaymentAccount, dispatch),
        getRemittanceBankItem:bindActionCreators(getRemittanceBankItem, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    // mapDispatchToProps
)(ApiRemittanceBank)
