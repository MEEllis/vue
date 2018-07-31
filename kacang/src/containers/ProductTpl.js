import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'

import ProductTpl from '../components/ProductTpl/js/ProductTpl'
import {  getProductTpl } from '../redux/productTpl'


const mapStateToProps = (state, ownProps) => {
    // const redirect = ownProps.location.query.redirect || '/';
    // const isAuthenticated = state.loginFlow.isAuthenticated || false;
    return {
        getProductTplResult: state.productTpl.getProductTplResult,
    }
}
export default connect(
    mapStateToProps,
    {
        getProductTpl
    }
)(ProductTpl)
