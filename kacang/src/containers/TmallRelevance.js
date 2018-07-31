import { connect } from 'react-redux'
import TmallRelevance from '../components/TmallRelevance/js/TmallRelevance'

import {tmallRelevanceAction} from '../actions/tmall'

import {createSelector} from 'reselect'

const defaultValue = []
const stateItemSelector = (state) =>state.tmallRelevance.items || defaultValue

const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        if(!stateItem.Data){
            return false
        }
        let itemState ={
            dataSource:[],
        };
        stateItem.Data.map((item,index) =>{
            let Status = ''
            switch(item.Status){
                case 1: Status = '对接'
                    break;
                case 2: Status = '断开'
                    break;
                default:Status = ''
            }
            let temp ={
                key:index,
                // Tsc:item.Tsc,
                Tsc:index,
                FaceValue:item.FaceValue,
                CommodityName:item.CommodityName,
                Status:Status,
                ConnectCommodityNumber:item.ConnectCommodityNumber,
                ConnectCommodityName:item.ConnectCommodityName,
                SellPrice:item.SellPrice,
                Manufacturers:item.Manufacturers,
                option:item.option,
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
            dispatch(tmallRelevanceAction())
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TmallRelevance)
