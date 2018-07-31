import { connect } from 'react-redux'
import TmallOrders from '../components/TmallOrders/js/TmallOrders'


import {tmallOrdersAction} from '../actions/tmall'


import {createSelector} from 'reselect'

const defaultValue = []
const stateItemSelector = (state) =>state.tmallOrders.items || defaultValue

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
            let OrderState = ''
            switch(item.OrderState){
                case 1: OrderState = '未处理'
                    break;
                case 2: OrderState = '处理中'
                    break;
                case 3: OrderState = '成功'
                    break;
                case 4: OrderState = '失败'
                    break;
                default:OrderState = ''
            }
            let temp ={
                TmallOrderNum: item.TmallOrderNum,
                TradeTime: item.TradeTime,
                TscName: item.TscName,
                Amount: item.Amount,
                TotalCost: item.TotalCost,
                ChargeAccount: item.ChargeAccount,
                KmOrder: item.KmOrder,
                OrderState: OrderState,
                ChargeDescribe: item.ChargeDescribe,
                GameZone: item.GameZone,
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
            dispatch(tmallOrdersAction())
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TmallOrders)
