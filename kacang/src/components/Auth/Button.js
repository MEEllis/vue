import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import classNames from 'classnames';
import authWrapper from '../../utils/authWrapper';

const ButtonGroup = Button.Group;

class Permission extends Component {
  handleClick = (e) => {
    const onClick = this.props.onClick;
    if (onClick && this.state.isAuth) {
      onClick(e);
    }
  }

  render() {
    const { className, type, style, disabled } = this.props;
    // const classes = classNames(this.state.isAuth ? '' : 'disabled', className);
    // <Tooltip placement="top" title={'aaaaa'}>
    // </Tooltip>
    return (
      <Button onClick={this.handleClick} style={style} disabled={disabled} className={className} type={type}>{this.props.children}</Button>
    );
  }
}
let permission = authWrapper(Permission);
permission.Group = ButtonGroup;
export default permission;
