import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'

import ApiRemittanceList from '../components/ApiRemittance/js/ApiRemittanceList'
import { getApiRemittanceList } from '../actions/apiRemittanceList'


const mapStateToProps = (state, ownProps) => {
    return {
        items: state.apiRemittanceList,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getApiRemittanceList: bindActionCreators(getApiRemittanceList, dispatch),
    }
}
export default connect(
    mapStateToProps,
    { getApiRemittanceList }
    // mapDispatchToProps
)(ApiRemittanceList)
