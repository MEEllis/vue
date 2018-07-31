import { connect } from 'react-redux'
import TmallFinance from '../components/TmallFinance/js/TmallFinance'
import { tmallFinanceAction } from '../actions/tmall'

import {createSelector} from 'reselect'

const defaultValue=[]
const stateItemSelector = (state) =>state.tmallFinance.items || defaultValue

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
            let TradeChildTypeName = ''
            switch(item.TradeChildTypeName){
                case 1: TradeChildTypeName = '收入'
                    break;
                case 2: TradeChildTypeName = '支出'
                    break;
                case 3: TradeChildTypeName = '资金冻结'
                    break;
                case 4: TradeChildTypeName = '资金解冻'
                    break;
                default:TradeChildTypeName = ''
            }
            let temp ={
                Code: item.Code,
                TradeChildTypeName: TradeChildTypeName,
                TradeNo: item.TradeNo,
                TradeBeforeAmount: item.TradeBeforeAmount,
                TradeAmount: item.TradeAmount,
                TradeAfterAmount: item.TradeAfterAmount,
                TradeTime: item.TradeTime,
                Type:item.TradeNo
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
            dispatch(tmallFinanceAction())
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TmallFinance)
