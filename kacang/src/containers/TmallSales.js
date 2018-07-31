import { connect } from 'react-redux'
import TmallSales from '../components/TmallSales/js/TmallSales'
import {tmallSalesAction} from '../actions/tmall'


import {createSelector} from 'reselect'

const defaultValue =[]
const stateItemSelector = (state) =>state.tmallSales.items || defaultValue

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
                case 1: Status = '处理中'
                    break;
                case 2: Status = '订单可疑'
                    break;
                case 3: Status = '订单成功'
                    break;
                case 4: Status = '订单失败'
                    break;
                default:Status = ''
            }
            let temp ={
                Code : item.Code,
                ExternalOrderNumber : item.ExternalOrderNumber,
                Name : item.Name,
                Amount : item.Amount,
                Price : item.Price,
                OrderPrice : item.OrderPrice,
                ConsumerCode : item.ConsumerCode,
                ConsumerName : item.ConsumerName,
                RechargeTo : item.RechargeTo,
                OrderFromCode : item.OrderFromCode,
                OrderTime : item.OrderTime,
                TotalCost : item.TotalCost,
                Profit:(item.OrderPrice - item.TotalCost).toFixed(2),
                Status : Status,
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
            dispatch(tmallSalesAction())
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TmallSales)
