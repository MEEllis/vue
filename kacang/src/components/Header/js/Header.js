import React from 'react';
import { Link, IndexLink } from 'react-router';
import NoticeDropdown from '../../../containers/OrderState';
import AccountDropdown from '../../../containers/AccountDropdown';
import Icon, { logo } from '../../Icon/js/Icon';

import '../less/header.less';



class Header extends React.Component {
  render() {
    const { props } = this;

    return (
      <div className="app-header">
        <h1 className="app-header-logo">
          <IndexLink
            className="app-logo"
            to="/"
          >
            <span>
              <Icon glyph={logo} />
            </span>
          </IndexLink>
        </h1>
        <div className="app-header-main">
          <ul className="navbar navbar-top-links pull-right mr30">
            <li><NoticeDropdown /></li>
            <li><AccountDropdown { ...props } /></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
