import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import StockAccount from '../components/ApiPrice/js/ApiPrice'

const mapStateToProps = (state, ownProps) => {
    // return {
    //     data: stateGetDataSelector(state),
    //     isfetching: !!state.getData.isfetching
    // };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    // return {
    //     getData: bindActionCreators(getData, dispatch),
    // }
}
export default connect(
    // mapStateToProps,
    // mapDispatchToProps
)(StockAccount)
