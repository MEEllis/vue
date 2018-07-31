import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'

import DropdownTrigger from './DropdownTrigger'
import DropdownPanel from './DropdownPanel'

import '../less/dropdown.less'

const Dropdown = React.createClass({

    getInitialState () {
        return {
            active: false
        };
    },

    getDefaultProps () {
        return {
            className: ''
        };
    },

    isActive () {
        return ( typeof this.props.active === 'boolean' ) ? this.props.active : this.state.active;
    },

    hide () {
        this.setState({
            active: false
        });
        if ( this.props.onHide ) {
            this.props.onHide();
        }
    },

    show () {
        this.setState({
            active: true
        });
        if ( this.props.onShow ) {
            this.props.onShow();
        }
    },

    _onWindowClick ( event ) {

        const dropdown_element = findDOMNode( this );

        if (
            event.target !== dropdown_element &&
            !dropdown_element.contains( event.target ) &&
            this.isActive()
        ) {
            this.hide();
        }

    },

    // _onToggleClick ( event ) {
    //
    //     event.preventDefault();
    //
    //     if ( this.isActive() ) {
    //         this.hide();
    //     } else {
    //         this.show();
    //     }
    //
    // },

    _onMouseEnter ( event ) {

        event.preventDefault();
        this.show();
        this.props.getCurrent({ openId: localStorage.getItem('openId') });
        // if ( this.isActive() ) {
        //     this.hide();
        // } else {
        //     this.show();
        // }

    },

    _onMouseLeave ( event ) {

        event.preventDefault();
        this.hide();
        // if ( this.isActive() ) {
        //     this.hide();
        // } else {
        //     this.show();
        // }

    },

    // componentDidMount () {
    //     window.addEventListener( 'click', this._onWindowClick );
    // },
    //
    // componentWillUnmount () {
    //     window.removeEventListener( 'click', this._onWindowClick );
    // },

    render () {
        const { children, className } = this.props;

        // 创建组件 class
        const active = this.isActive();
        let dropdown_classes = classnames({
            dropdown: true,
            'dropdown-active': active
        });
        dropdown_classes += ' ' + className;

        // 触发元素执行的回调
        const bound_children = React.Children.map( children, child => {
            if ( child.type === DropdownTrigger ) {
                child = React.cloneElement( child, {
                    ref: 'trigger',
                    // onClick: this._onToggleClick,
                });
            }
            return child;
        });

        return (
            <div
                style={ this.props.style }
                className={ dropdown_classes }
                onMouseEnter={ this._onMouseEnter }
                onMouseLeave= { this._onMouseLeave }
            >
                { bound_children }
            </div>
        )
    },

})

export { DropdownTrigger, DropdownPanel };
export default Dropdown;
