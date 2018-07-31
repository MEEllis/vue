import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Tooltip, Popconfirm } from 'antd';

export default (args) => {
  const { authSelector, authOpts } = { ...args };
  function injectAuth(component) {
    const checkAuth = (props) => {
      const { auth, auths } = props;
      // No Auth required
      if (auth == null) {
        return true;
      }
      if (auths) {
        if (Array.isArray(auths)) {
          for (const item of auths) {
            if (item.Category === auth) {
              return true;
            }
          }
        } else {
          return auths.admin;
        }
      }

      return false;
    };
    const WrappedClass = class extends component {
      static defaultProps = {
        authOpts: {
          noAuthType: 'hidden'
        }
      }
      constructor(props) {
        super(props);
        this.state = {
          isAuth: false
        };
      }

      validAuth = (props) => {
        const isAuth = checkAuth(props);
        if (isAuth !== this.state.isAuth) {
          this.setState({ isAuth });
          if (this.props.authChange) {
            this.props.authChange(isAuth);
          }
        }
      }

      componentWillMount() {
        this.validAuth(this.props);
      }
      componentWillReceiveProps(nextProps) {
        const { auths } = nextProps;
        if (auths !== this.props.auths) {
          this.validAuth(nextProps);
        }
      }

      render() {
        const { noAuthType = authOpts.noAuthType, confirmTip, hint, noAuthHint = authOpts.noAuthHint } = this.props.authOpts;
        if (this.state.isAuth) {
          const classes = classNames(this.props.className, 'permission');
          if (confirmTip && hint) {
            return (
              <Tooltip placement="top" title={hint}>
                <Popconfirm placement="top" title={confirmTip} onConfirm={this.props.onConfirm} onCancel={this.props.onCancel}>
                  {React.cloneElement(super.render(), {
                    className: classes
                  })}
                </Popconfirm>
              </Tooltip>
            );
          } else if (hint) {
            return (
              <Tooltip placement="top" title={hint}>
                {React.cloneElement(super.render(), {
                  className: classes
                })}
              </Tooltip>
            );
          } else if (confirmTip) {
            return (
              <Popconfirm placement="top" title={confirmTip} onConfirm={this.props.onConfirm} onCancel={this.props.onCancel}>
                {React.cloneElement(super.render(), {
                  className: classes
                })}
              </Popconfirm>
            );
          }
          return super.render();
        } else {
          if (noAuthType === 'disabled') {
            const classes = classNames(this.props.className, 'disabled', 'permission');
            if (noAuthHint) {
              return (
                <Tooltip placement="top" title={`${authOpts.isShowAllHint && hint ? `“${hint}”` : ''} ${noAuthHint}`}>
                  {React.cloneElement(super.render(), {
                    className: classes
                  })}
                </Tooltip>
              );
            }

            return React.cloneElement(super.render(), {
              className: classes,
              disabled: true
            });
          }
          return null;
        }
      }
    }

    const mapStateToProps = (state, ownProps) => {
      return {
        auths: authSelector(state, ownProps),
      };
    };

    return connect(mapStateToProps)(WrappedClass);
  }

  return injectAuth;
};
