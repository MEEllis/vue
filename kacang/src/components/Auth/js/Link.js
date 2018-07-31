import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import authWrapper from '../../../utils/authWrapper';

class Permission extends Component {
  static propTypes = {
    auth: PropTypes.string,
    authOpts: PropTypes.object,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired
  }
  static defaultProps = {
    auth: '',
    authOpts: {}
  }

  render() {
    const { to, auth, authOpts, auths, dispatch, ...props } = this.props;
    const { isAuth } = this.state;
    return <Link to={isAuth ? to : undefined} {...props} />;
  }
}

export default authWrapper(Permission);






