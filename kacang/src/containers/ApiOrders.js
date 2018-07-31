import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import StockAccount from '../components/ApiOrders/js/ApiOrders'
import { actionsStart as getData} from '../actions/getData'
const getDataSelector = (state) => state.getData.data || []
const stateGetDataSelector = createSelector(
    [getDataSelector],
    (stateItem) => {
        switch( stateItem.source ){
            case 'apilist':
                let items = stateItem.Data.Items
                for(let k in items){
                    items[k].key = items[k].Id;
                };
                return stateItem;
                break;
            default:
                return stateItem;
                break;
        };

    }
)
import menuData from '../../api/menu.json'

const mapStateToProps = (state, ownProps) => {
    return {
        data: stateGetDataSelector(state),
        isfetching: !!state.getData.isfetching
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getData: bindActionCreators(getData, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockAccount)
