import React, { PropTypes } from 'react'

const DropdownPanel = React.createClass({

    propTypes: {
        children: PropTypes.node,
        className: PropTypes.string
    },

    getDefaultProps () {
        return {
            className: ''
        };
    },

    render () {
        const { children, className } = this.props;
        const props = {
            ...this.props,
            className: `dropdown-panel ${className}`
        };

        return (
            <div {...props}>
                { children }
            </div>
        )
    }

})

export default DropdownPanel
