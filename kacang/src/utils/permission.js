import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { flatMenu } from '../components/AccordionMenu/data/menu';

function getMenuChildern(link) {
  const menu = _.find(flatMenu, { link });
  if (menu) return menu.children;
  return [];
}


export default (args) => {
  const { authSelector } = args;
  // Wraps the component that needs the auth enforcement
  function wrapComponent(DecoratedComponent) {
    @connect(
      (state, ownProps) => ({
        auths: authSelector(state, ownProps)
      }),
      {}
    )
    class UserPermissionWrapper extends React.Component {
      static propTypes = {
        auths: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        location: PropTypes.shape().isRequired,
        router: PropTypes.shape().isRequired,
      }


      constructor(props) {
        super(props);
        this.isInit = true;
      }

      componentWillReceiveProps(nextProps) {
        const { auths } = nextProps;
        if (this.isInit || this.props.location.pathname !== nextProps.location.pathname
          || !_.isEqual(auths, this.props.auths)) {
          this.isInit = false;
          let pathname = this.props.router.location.pathname;
          const { routes } = this.props.router;
          const currentRoutePath = routes[routes.length - 1].path;
          if (currentRoutePath && currentRoutePath.indexOf(':') !== -1) {
            pathname = currentRoutePath;
          }
          if (!auths) {
            return;// browserHistory.push('/');
            // return browserHistory.push('/');
          }
          if (auths.length === 0) return browserHistory.push('/');
          // 设置密价路由不做需求
          if (pathname === '/supply/price/groupSearch' || pathname === '/supply/price/productSearch') {
            return;
          }
          if (pathname !== '/' && !auths.admin) {
            for (let i = 0; i < auths.length; i += 1) {
              const perm = auths[i];
              if (perm.link === pathname) {
                if (pathname === '/product/api' || pathname === '/operation/stock' || pathname === '/operation/sup' || pathname === '/operation/service') {
                  const children = getMenuChildern(pathname);
                  for (let j = 0; j < children.length; j += 1) {
                    const child = children[j];
                    const auth = _.find(auths, { link: child.link });
                    if (auth) {
                      return browserHistory.push(auth.link);
                    }
                  }
                }
                return;
                // return browserHistory.push('/');
              }
            }
            return browserHistory.push('/');
          } else if (auths.admin) {
            if (pathname === '/product/api') {
              return browserHistory.push('/product/api/user');
            } else if (pathname === '/operation/stock') {
              return browserHistory.push('/operation/stock/list');
            } else if (pathname === '/operation/sup') {
              return browserHistory.push('/operation/sup/search');
            } else if (pathname === '/operation/service') {
              return browserHistory.push('/operation/service/receive');
            }
          }
        }
      }
      render() {
        return <DecoratedComponent {...this.props} />
      }
    }

    return hoistStatics(UserPermissionWrapper, DecoratedComponent);
  }

  return wrapComponent;
};
