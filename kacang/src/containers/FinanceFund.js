import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import FinanceFund from '../components/FinanceFund/js/FinanceFund'
import { getAuth, getChildAccountPermission, updatePermission } from '../sagas/auth'


const mapStateToProps = (state, ownProps) => {
    return {
        auths: state.auth.data,
    };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    { getAuth, getChildAccountPermission, updatePermission }
    // mapDispatchToProps
)(FinanceFund)
