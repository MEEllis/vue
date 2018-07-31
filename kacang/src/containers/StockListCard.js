import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import StockAccount from '../components/StockListCard/js/StockListCard'
// import { actionsStart } from '../actions/getPrepaidCardList'
// import { actionsStart as batchUpdatePrepaidCardIsUse} from '../actions/BatchUpdatePrepaidCardIsUse'
// import { actionsStart as actionsStartDel} from '../actions/batchRemovePrepaidAccount'

const stateItemSelector = (state) => state.getPrepaidCardList.data || []
const batchUpdatePrepaidCardIsUseSelector = (state) => state.batchUpdatePrepaidCardIsUse.data || []
const delAllItemSelector = (state) => state.batchRemovePrepaidAccount.data || []

const stateSelector = createSelector (
    [stateItemSelector],
    (stateItem) => {
        if(!stateItem.Data){
            return false
        }
        let itemState = stateItem;
        itemState.Data = stateItem.Data.Context;
        for(let k in itemState.Data){
            itemState.Data[k].Isuse = itemState.Data[k].Isuse ? '已用完' : '未用完';
            itemState.Data[k].key = itemState.Data[k].Id;
        }
        return itemState
    }
)

const batchUpdateSelector = createSelector(
    [batchUpdatePrepaidCardIsUseSelector],
    (stateItem) => {
        return stateItem
    }
)
const delAllSelector = createSelector(
    [delAllItemSelector],
    (stateItem) => {
        // if(!stateItem.Data){
        //     return false
        // };
        //
        // let itemState = stateItem;
        return stateItem
    }
)
const mapStateToProps = (state, ownProps) => {
    return {
        cardListData: stateSelector(state),
        isfetching: !!state.getPrepaidCardList.isfetching || !!state.batchUpdatePrepaidCardIsUse.isfetching || !!state.batchRemovePrepaidAccount.isfetching,
        batchUpdatePrepaidCardIsUseData: batchUpdateSelector(state),
        batchRemovePrepaidAccountData: delAllSelector(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPrepaidCardList: bindActionCreators(actionsStart, dispatch),
        getBatchRemovePrepaidAccount: bindActionCreators(actionsStartDel, dispatch),
        getBatchUpdatePrepaidCardIsUse: bindActionCreators(batchUpdatePrepaidCardIsUse, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockAccount)
