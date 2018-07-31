import React, { Component } from 'react';
import classNames from 'classnames';
import authWrapper from '../../utils/authWrapper';


class Permission extends Component {
  handleClick = (e) => {
    const onClick = this.props.onClick;
    if (onClick && this.state.isAuth) {
      onClick(e);
    }
  }
  render() {
    const { className, type } = this.props;
    const { isAuth } = this.state;
    return (
      <a href={isAuth ? this.props.href : 'javascript:;'}
        target={this.props.target}
        onClick={this.handleClick} className={className}>{this.props.children}</a>
    );
  }
}

export default authWrapper(Permission);
