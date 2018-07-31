import React, { PropTypes } from 'react'
import Dropdown, { DropdownTrigger, DropdownPanel } from '../../Dropdown/js/Dropdown'
import { Badge } from 'antd'
import Icon, { message } from '../../Icon/js/Icon'
import { Link } from '../../Auth/js/Auth';

import '../less/dropdown-notice';


const NoticeDropdown = React.createClass({
  render() {
    const { props } = this;
    const { state } = props.orderState;

    // 为空处理：如果不存在（没有定义）或为空（没有数据），就不渲染组件，否则就会报错，因为 dom 中有一些绑定数据的参数
    if (!state) return false;

    // 未处理 2  处理中 3 可疑 6
    var countArr = props.orderState.state.order,
      StandbyCount = 0,
      TopupCount = 0,
      DubiousCount = 0;

    for (var k in countArr) {
      switch (countArr[k].Status) {
        case 2:
          StandbyCount = countArr[k].Count;   //未处理
          break;
        case 3:
          TopupCount = countArr[k].Count;      //处理中
          break;
        case 6:
          DubiousCount = countArr[k].Count;     //可疑
          break;
        default:
      }
    };



    const data = {
      standbyCount: StandbyCount || 0,
      topupCount: TopupCount || 0,
      dubiousCount: DubiousCount || 0,
      stock: props.orderState.state.stock || 0,
      supComplaintCount: props.orderState.state.supComplaintCount || 0,
      apiComplaintCount: props.orderState.state.apiComplaintCount || 0,
      total: StandbyCount + TopupCount + DubiousCount + props.orderState.state.stock + props.orderState.state.supComplaintCount + props.orderState.state.apiComplaintCount || 0,
    }

    const renderContent = () => (
      <Dropdown className="dropdown-notice">
        <DropdownTrigger>
          <Badge count={data.total}>
            <Icon glyph={message} />
          </Badge>
        </DropdownTrigger>
        <DropdownPanel className="pull-right">
          <ul className="account-notice">
            <li>
              <div>
                <Link to='/operation/detail' auth='apiOrdersList' authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员' }} activeClassName="active">
                  <span className="notice-item notice-hd">未处理</span>
                  <span className="notice-item notice-bd">{data.standbyCount}</span>
                </Link>

              </div>
            </li>
            <li>
              <div>
                <Link to='/operation/detail' auth='apiOrdersList' authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员' }} activeClassName="active">
                  <span className="notice-item notice-hd">处理中</span>
                  <span className="notice-item notice-bd">{data.topupCount}</span>
                </Link>

              </div>
            </li>
            <li>
              <div>
                <Link to='/operation/detail' auth='apiOrdersList' authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员' }} activeClassName="active">
                  <span className="notice-item notice-hd">可疑</span>
                  <span className="notice-item notice-bd">{data.dubiousCount}</span>
                </Link>

              </div>
            </li>
            <li>
              <div>
                <Link to='/operation/stock/list' auth='stock' authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员' }} activeClassName="active">
                  <span className="notice-item notice-hd">断货</span>
                  <span className="notice-item notice-bd">{data.stock}</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to='/operation/service/launched' auth='serviceLaunchedList' authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员' }} activeClassName="active">
                  <span className="notice-item notice-hd">已投诉</span>
                  <span className="notice-item notice-bd">{data.supComplaintCount}</span>
                </Link>

              </div>
            </li>
            <li>
              <div>
                <Link to='/operation/service/receive' auth='serviceReceiveList' authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员' }} activeClassName="active">
                  <span className="notice-item notice-hd">被投诉</span>
                  <span className="notice-item notice-bd">{data.apiComplaintCount}</span>
                </Link>

              </div>
            </li>
          </ul>
        </DropdownPanel>
      </Dropdown>
    );

    return (
      <div>{data.total > 0 ? renderContent() : null}</div>
    )
  }
})

export default NoticeDropdown
