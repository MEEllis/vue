import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spin, Icon } from 'antd';
import { browserHistory } from 'react-router';
// import { Link } from 'react-router'

import Dropdown, { DropdownTrigger, DropdownPanel } from '../../Dropdown/js/Dropdown';
import Icons, { triangle, username, balance } from '../../Icon/js/Icon';
// import avatar from '../images/user-avatar.png';

import '../less/dropdown-account.less';


class AccountDropdown extends React.Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired,
    getCurrent: PropTypes.func.isRequired,
    isfetching: PropTypes.bool.isRequired,
  }
  // 退出
  exit = () => {
    this.props.logOut({
      token: localStorage.getItem('token')
    });
    browserHistory.push('/login');
  }
  render() {
    const { props } = this;
    if (!props.getCurrentResult) return false;
    // 为空处理：如果不存在（没有定义）或为空（没有数据），就不渲染组件，否则就会报错，因为 dom 中有一些绑定数据的参数
    const data = {
      // avatar: avatar,
      userName: props.getCurrentResult.Data.UserName,
      siteName: props.getCurrentResult.Data.SiteName,
      siteId: props.getCurrentResult.Data.SiteId,
      balance: props.getCurrentResult.Data.Balance,
      freezeBalance: props.getCurrentResult.Data.FreezeBalance,
      marginBalance: props.getCurrentResult.Data.DataMarginBalance,
    };

    return (
      <Dropdown getCurrent={props.getCurrent} className="dropdown-account">
        <DropdownTrigger>
          <div className="user-avatar">
            {/* <img src={ data.avatar } width="28" height="28" /> */}
          </div>
          <span className="user-name">{data.userName}</span>
          <Icons glyph={triangle} className="icon icon-arrow" />
        </DropdownTrigger>
        <DropdownPanel className="pull-right">
          <Spin spinning={this.props.isfetching}>
            <ul className="account-info">
              <li>
                <Icons glyph={username} />
                <span>站点名称: </span>
                <span>{data.siteName}</span>
              </li>
              <li>
                <Icons glyph={username} />
                <span>站点 ID: </span>
                <span>{data.siteId}</span>
              </li>
              <li>
                <Icons glyph={balance} />
                <span>可用余额: </span>
                <span className="text-red">{data.balance}</span>
                <span> 元</span>
              </li>
              <li>
                <Icons glyph={balance} />
                <span>冻结金额: </span>
                <span className="text-red">{data.freezeBalance}</span>
                <span> 元</span>
              </li>
              <li>
                <Icons glyph={balance} />
                <span>保证金金额: </span>
                <span className="text-red">{data.marginBalance}</span>
                <span> 元</span>
              </li>
            </ul>
          </Spin>
          <div className="p10 text-right">
            <Button
              type="primary"
              onClick={this.exit}
            >
              退出
                        </Button>
          </div>

        </DropdownPanel>
      </Dropdown>
    );
  }
}
export default AccountDropdown;
