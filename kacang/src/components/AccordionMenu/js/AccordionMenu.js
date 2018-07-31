import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
// import QueueAnim from 'rc-queue-anim';
import _ from 'lodash';
// import menuJson from '../../../../api/menu.json';
import menuJson from '../data/menu';
import Icon, { triangle, fold, retract } from '../../Icon/js/Icon';
import { Link } from '../../Auth';
import '../less/accordionMenu.less';

const SubMenu = Menu.SubMenu;

class AccordionMenu extends React.Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    toggleSidebar: PropTypes.func,
    getCurrentResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getSubAccountPermissionListExtendResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    toggleSidebar: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
      isMini: true,
      isMiniThree: false
    };
  }


  getAside = () => {
    const { pathname } = this.props;
    const childPaths = [];
    pathname.split('/').forEach(value => {
      if (value) {
        childPaths.push(value);
      }
    });
    if (childPaths.length >= 2) {
      const oneLevelIndex = _.findIndex(menuJson, { link: `/${childPaths[0]}` });
      const twoLevelIndex = _.findIndex(menuJson[oneLevelIndex].children, { link: `/${childPaths[0]}/${childPaths[1]}` });
      const twoLevelMenu = menuJson[oneLevelIndex].children[twoLevelIndex];
      if (!twoLevelMenu) return;
      const threeLevelMenus = twoLevelMenu.children;
      if (threeLevelMenus.length > 0) {
        const menuItems = threeLevelMenus.map(result =>
          (
            <li key={result.link}>
              <Link to={result.link} auth={result.unique} authOpts={{ noAuthType: 'hidden' }} activeClassName="active">
                {result.title}
              </Link>
            </li>
          )
        );
        return (
          <div data-collapsed={this.state.isMiniThree} className={this.state.isMiniThree ? 'app-aside collapsed' : 'app-aside'}>
            <div className="help-container">
              <div className="app-aside-inner">
                <a
                  className="app-toggle-aside"
                  onClick={() => {
                    this.setState({ isMiniThree: !this.state.isMiniThree });
                  }}
                  href="javascript:;"
                >
                  <span className="toggle-aside-bg" />
                  <Icon glyph={retract} className="icon icon-fold" />
                </a>
                <div className="app-aside-header">{twoLevelMenu.title}</div>
                <ul className="app-aside-menu">
                  {menuItems}
                </ul>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  }

  toggleSidebar = () => {
    const isMini = !this.state.isMini;
    if (this.props.toggleSidebar) {
      this.props.toggleSidebar(isMini);
    }
    this.setState({ isMini });
  }

  render() {
    const { props } = this;
    // 一二级导航菜单
    const menu = menuJson.map((result, index) => {
      const isAuth = (item) => {
        const { getCurrentResult, getSubAccountPermissionListExtendResult } = props;

        if (getCurrentResult && !getCurrentResult.Data.IsSubUser) {
          return true;
        }

        if (getSubAccountPermissionListExtendResult) {
          for (const per of getSubAccountPermissionListExtendResult.Data) {
            if (per.Category === item.unique) {
              return true;
            }
          }
        }
        return false;
      };

      const submenu = result.children.map((result, index) => {
        const item = (
          <Link
            auth={result.unique}
            to={result.link}
            authOpts={{ noAuthType: 'hidden' }}
            activeClassName="active"
          >
            <Icon glyph={result.icon} />
            <span className="menu-title">
              {result.title}
            </span>
          </Link>
        );
        if (isAuth(result)) {
          return (
            <Menu.Item key={index}>
              {this.state.isMini ? <Tooltip placement="right" title={result.title}>{item}</Tooltip> : item}
            </Menu.Item>
          );
        }
        return null;
      });

      if (isAuth(result)) {
        return (
          <SubMenu
            key={index}
            title={
              <div className="menu-trigger">
                <Icon glyph={triangle} className="icon icon-arrow" />
                <span className="menu-title">
                  {result.title}
                </span>
                <Icon glyph={{ id: result.icon, viewBox: '0 0 16 16' }} className="icon icon-append" />
              </div>
            }
          >
            {submenu}
          </SubMenu>
        );
      }

      return null;
    });

    const container = { height: '100%', float: 'left' };
    return (
      <div style={container}>
        <div className="app-sidebar">
          <Scrollbars
            autoHide
            autoHideTimeout={500}
            autoHideDuration={100}
            autoHeightMin={200}
          >
            <a
              className="app-toggle-sidebar"
              onClick={this.toggleSidebar}
              href="javascript:;"
            >
              <Icon glyph={fold} className="icon icon-fold" />
            </a>
            <Menu
              defaultOpenKeys={['0', '1', '2', '3']}
              mode="inline"
            >
              {menu}
            </Menu>
          </Scrollbars>
        </div>
        {this.getAside()}
      </div>

    );
  }
}

export default AccordionMenu;
