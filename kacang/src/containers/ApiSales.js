import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'

import ApiSales from '../components/ApiSales/js/ApiSales'
import { getApiSales } from '../actions/apiSales'

import menuData from '../../api/menu.json'

const mapStateToProps = (state, ownProps) => {
    return {
        apiSales: state.apiSales
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getApiSales: bindActionCreators(getApiSales, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    // mapDispatchToProps
)(ApiSales)
