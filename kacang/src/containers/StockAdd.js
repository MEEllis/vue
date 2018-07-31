import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {bindActionCreators} from 'redux'
import StockAdd from '../components/StockAdd/js/StockAdd'
// import {actionsStart} from '../actions/stockPackList.js'
// import {actionsStart as addStockActionsStart} from '../actions/addstock.js'
import {getStockList, createStock} from '../redux/stockList';

const stateItemSelector = (state) => state.stockList.getStockListResult || []
// const addstockStateItemSelector = (state) => state.addstock.data || []

const stateSelector = createSelector([stateItemSelector], (stateItem) => {
  if (!stateItem.Data) {
    return false
  }
  return stateItem
})

// const stateSelectorAddStock = createSelector([addstockStateItemSelector], (stateItem) => {
//   return stateItem
// })

const mapStateToProps = (state, ownProps) => {
  return {
    getStockListResult: stateSelector(state),
    createStockResult: state.stockList.createStockResult,
    // stockPackListData: stateSelector(state),
    // addstockData: stateSelectorAddStock(state),
    isfetching: !!state.stockList.isfetching
  };
}

export default connect(mapStateToProps,
  {
    getStockList,
    createStock
  })(StockAdd)
