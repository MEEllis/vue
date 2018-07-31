import { connect } from 'react-redux'
import TmallShop from '../components/TmallShop/js/TmallShop'

import {tmallShopAction} from '../actions/tmall'
import { createSelector } from 'reselect'

const defaultValue = []
const stateItemSelector = (state) =>state.tmallShop.items || defaultValue

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
            let temp ={
                MerchantName : item.MerchantName,
                MerchantId : item.MerchantId,
                MerchantKey : (item.MerchantKey).substr(0,6) +'***',
                AccessToken : (item.AccessToken).substr(0,6)+'***',
                option:[item.MerchantName,item.MerchantId,item.MerchantKey,item.AccessToken]
            };
            itemState.dataSource.push(temp)
        })
        return itemState
    }
)
const mapStateToProps = (state) =>{
    return {
        items:stateSelector(state)
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        initialDispatch(){
            dispatch(tmallShopAction())
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TmallShop)
