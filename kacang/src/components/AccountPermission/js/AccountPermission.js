import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Checkbox, Button, Tooltip, message } from 'antd';
import { browserHistory } from 'react-router';
import toTree from '../../../utils/helper/toTree.js';
import Icon, * as icon from '../../Icon/js/Icon';

import '../less/AccountPermission.less';

class AccountPermission extends React.Component {
  static propTypes = {
    getSubAccountPermissionList: PropTypes.func.isRequired,
    setSubAccountPermission: PropTypes.func.isRequired,
    getSubAccountPermissionListResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    setSubAccountPermissionResult: PropTypes.shape({
      Status: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    addSubAccountResult: undefined,
    getSubAccountPermissionListResult: undefined,
    setSubAccountPermissionResult: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      permissions: {},
      treeData: [],
      permissinsIcon: {
        // 产品服务
        product: icon.product,
        // 云接口
        api: icon.cloud,
        // 用户中心
        user: icon.users,
        // 我的资金
        financeFund: icon.fund,
        // 财务管理
        finance: icon.finances,
        // 财务明细
        financeList: icon.finance,
        // 资金核算
        financeVerify: icon.verify,
        // 线下汇款
        financeRemittanceList: icon.remittance,
        // 运营中心
        operation: icon.operation,
        // 我的商品
        commodity: icon.commodity,
        // 我的库存
        stock: icon.stock,
        // 卡仓进货
        sup: icon.sup,
        // 订单明细
        ordersList: icon.orders,
        // 销售明细
        salesList: icon.xiaoshoumingxi,
        // 售后服务
        salseService: icon.shouhoufuwu,
        userList: icon.user,
        // 安全中心
        userSafety: icon.safety,
        // 基本资料
        userInfo: icon.info,
        subManage: icon.gonghuoguanli,
        subReview: icon.gonghuoshenghe,
        priceList: icon.shezimijia,
        orderManage: icon.orders,
        FinanceWithDrawList: icon.tixianjilu,
        visible: false
      }
    };
  }

  componentWillMount() {
    this.props.getSubAccountPermissionList({ RoleId: this.props.params.openid });
  }

  componentWillReceiveProps(nextProps) {
    const { getSubAccountPermissionListResult, setSubAccountPermissionResult } = nextProps;
    if (getSubAccountPermissionListResult !== this.props.getSubAccountPermissionListResult) {
      if (getSubAccountPermissionListResult.Status === '500') {
        browserHistory.push('/user/account');
      } else {
        const childPermission = getSubAccountPermissionListResult.dataSource;
        this.permissonTree = toTree(childPermission, '');
        const permissions = {};
        for (const item of childPermission) {
          permissions[item.unique] = item.isAuth;
        }
        this.setState({ permissions });
      }
    }
    if (setSubAccountPermissionResult !== this.props.setSubAccountPermissionResult) {
      if (setSubAccountPermissionResult.Status === 200) {
        setTimeout(() => {
          browserHistory.push({ pathname: '/user/account' });
        }, 3000);
      }
    }
  }


  // items当前节点数据 parent 父结点数据
  onHandleChange = (id, e, items, parent) => {
    const nowCheked = e.target.checked;
    const permissions = this.state.permissions;
    permissions[items.unique] = nowCheked;
    this.setState({ permissions });
    const { refs } = this;
    // var id=e.target.dataset.parentid;
    if (refs[id]) {
      refs[id].style.display = refs[id].style.display === 'block' ? 'none' : 'block';
    }
    // 如果当前checkbox没有选中
    if (!e.target.checked) {
      // 取消子节点选中
      this.cancelChildrenCheck(items);
      // 取消父节点选中
      // this.cancelParentCheck(items.parentId, parent.level)
      this.permissions = _.cloneDeep(this.state.permissions);
      // 如果当前节点level为3则做取消操作
      if (items.level === 3) {
        this.cancelParentChecked(parent);
      }
      this.setState({ permissions: this.permissions });
    }
    // 如果当前checkbox选中
    if (e.target.checked) {
      // 如果当前节点level为3则做取消操作
      if (items.level === 3) {
        // 父结点进行选中
        this.checkParent(parent);
      }
    }
  }
  // 父结点进行选中
  checkParent = (parent) => {
    // 获取权限
    const permissions = this.state.permissions;
    permissions[parent.unique] = true;
    // 获取父父节点数据
    const p = _.find(this.props.getSubAccountPermissionListResult.dataSource,
      { id: parent.parentId });
    permissions[p.unique] = true;
    this.setState({
      permissions
    });
  }
  cancelParentChecked = (parent) => {
    if (parent && parent.children && parent.children.length > 0) {
      // 判断当前父节点下的所有子节点是否全部没选中
      for (const item of parent.children) {
        if (this.permissions[item.unique]) {
          return;
        }
      }
      this.permissions[parent.unique] = false;
      const p = _.find(this.props.getSubAccountPermissionListResult.dataSource,
        { id: parent.parentId });
      if (p) {
        const childrens = [];
        for (const item of this.props.getSubAccountPermissionListResult.dataSource) {
          if (item.parentId === p.id) {
            childrens.push(item);
          }
        }

        this.cancelParentChecked({ id: p.id, unique: p.unique, children: childrens });
      }
    }
  }
  // 取消子节点选中
  cancelChildrenCheck(data) {
    if (data.children.length > 0) {
      const items = data.children;
      const permissions = this.state.permissions;
      for (let i = 0, len = items.length; i < len; i += 1) {
        for (let k in permissions) {
          permissions[items[i].unique] = false;
        }
        this.refs[items[i].id] && (this.refs[items[i].id].style.display = 'none');
        this.cancelChildrenCheck(items[i]);
      }
      this.setState({
        permissions
      });
    }
  }
  childrenList(item, id, flag) {
    const list = [];
    const myPermission = this.state.permissions;
    item.map((items) => {
      if (item.length > 0) {
        list.push(
          <li className="parent" key={items.id}>
            <Checkbox
              checked={myPermission[items.unique]}
              onChange={(e) => {
                this.onHandleChange(items.id, e, items, item);
              }}
            >{items.name}</Checkbox>
            {
              items.desc ? <Tooltip title={<div dangerouslySetInnerHTML={{ __html: items.desc }} />} placement="right"> <Icon glyph={icon.jinggao}></Icon></Tooltip> : ''
            }
            {items.children.length > 0 ? this.childrenList(items.children, items.id, items.isAuth) : ''}
          </li>
        )
      }
    })
    return (
      <ul style={{ marginLeft: '20px', display: flag ? 'block' : 'none' }} ref={id}>
        {list}
      </ul>
    )
  }
  findChildren(data) {
    if (!data) return;
    const topList = [];
    data.map((item) => {
      // icon数据由后台提供
      topList.push(
        <div key={item.id} className="permission-item">
          <div className="firstClass">
            <Icon glyph={this.state.permissinsIcon[item.unique]} />
            <span style={{ marginLeft: '20px', fontSize: '15px', fontWeight: '600' }}>{item.name}</span>
          </div>
          {
            item.children.map((items) =>
              (<div key={items.id}>
                <div>
                  <div className="secondClass">
                    <Icon glyph={this.state.permissinsIcon[items.unique]} />
                    <span style={{ marginLeft: '20px' }}>{items.name}</span>
                  </div>

                </div>
                {
                  items.children.map((item) =>
                    (<ul key={item.id} className="threeClass">
                      <li className="parent" >
                        <Checkbox
                          checked={this.state.permissions[item.unique]}
                          onChange={(e) => {
                            this.onHandleChange(item.id, e, item, items);
                          }}
                        >
                          {item.name}</Checkbox>
                        {
                          item.desc ? <Tooltip title={<div dangerouslySetInnerHTML={{ __html: item.desc }} />} placement="right"> <Icon glyph={icon.jinggao}></Icon></Tooltip> : ''
                        }
                        {item.children.length > 0 ? this.childrenList(item.children, item.id, item.isAuth) : ''}
                      </li>
                    </ul>)
                  )
                }
              </div>)
            )
          }
        </div>
      );
    });
    return topList;
  }

  handleSubmit = () => {
    const pers = [];
    for (const item of this.props.getSubAccountPermissionListResult.dataSource) {
      if (this.state.permissions[item.unique]) {
        pers.push(item.id);
      }
    }
    this.props.setSubAccountPermission({ RoleId: this.props.params.openid, PermissionIds: pers });
    // browserHistory.push('/user/account');
  }
  render() {
    const dataSource = this.permissonTree;
    // if (!dataSource) return <div></div>;
    return (
      <div className="permission">
        <div className="permission-action permission-hd">
          <Button onClick={() => {
            browserHistory.push('/user/account');
          }}
          >返回</Button>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </div>

        <div className="permission-bd">
          {this.findChildren(dataSource)}
        </div>

        <div className="permission-action permission-ft">
          <Button onClick={() => {
            browserHistory.push('/user/account');
          }}
          >返回</Button>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    );
  }
}
export default AccountPermission;
