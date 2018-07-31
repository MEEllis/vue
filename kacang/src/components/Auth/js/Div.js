import React, { Component } from 'react';
import authWrapper from '../../../utils/authWrapper';
import classNames from 'classnames'


class Permission extends Component {

    render() {
        const { className, type } = this.props;
        const { isAuth } = this.state;
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default authWrapper(Permission);
