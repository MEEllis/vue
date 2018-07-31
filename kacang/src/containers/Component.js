import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Component from '../components/Component/js/Component'


const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Component)
