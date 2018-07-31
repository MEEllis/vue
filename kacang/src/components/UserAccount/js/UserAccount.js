import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, message, Spin } from 'antd';
import { browserHistory } from 'react-router';
import Icon, * as icons from '../../Icon/js/Icon';

import '../../CardType/less/cardType.less';
import FL from '../../../utils/FL';
import { A } from '../../Auth/js/Auth';
import EditAccount from '../../../containers/EditChildAccount';
import AddAccount from './AddAccount';
import '../less/userAccount.less';

const confirm = Modal.confirm;


class UserAccount extends React.Component {
  static propTypes = {
    subAccountList: PropTypes.func.isRequired,
    subAccountListResult: PropTypes.shape({
    }),
    unLockSubAccountResult: PropTypes.shape({
      Status: PropTypes.string.isRequired
    }),
    lockSubAccountResult: PropTypes.shape({
      Status: PropTypes.string.isRequired
    }),
  };

  static defaultProps = {
    subAccountListResult: undefined,
    unLockSubAccountResult: undefined,
    lockSubAccountResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      reload2: false,
      subAccountListSearch: {
        pageNumber: 1,
        pageSize: FL.PAGESIZE
      },
      subAccountListDataSource: []
    };
  }
  componentWillMount() {
    const { props } = this;
    props.subAccountList(this.state.subAccountListSearch);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { subAccountListResult, unLockSubAccountResult, lockSubAccountResult } = nextProps;
    if (subAccountListResult !== props.subAccountListResult) {
      this.setState({ subAccountListDataSource: subAccountListResult.dataSource });
    }
    // 启用
    if (unLockSubAccountResult !== props.unLockSubAccountResult) {
      if (unLockSubAccountResult.Status === 200) {
        props.subAccountList(this.state.subAccountListSearch);
      }
    }
    // 禁用
    if (lockSubAccountResult !== props.lockSubAccountResult) {
      if (lockSubAccountResult.Status === 200) {
        props.subAccountList(this.state.subAccountListSearch);
      }
    }
  }

  handleEnabledClick = (account) => {
    const { props } = this;
    confirm({
      title: `您是否确认 ${account.titleEnable} 这项内容`,
      onOk: () => {
        // 如果点击的是禁用的话
        if (account.Status) {
          props.unLockSubAccount({
            openId: account.OpenId
          });
        } else {
          props.lockSubAccount({
            openId: account.OpenId
          });
        }
      }
    });
  }

  handleEditClick = (account) => {
    this.setState({
      title: '编辑帐号',
      visible: true,
      isEdit: true,
      account
    });
  }

  render() {
    const { props } = this;
    if (props.children) {
      return props.children;
    }
    // const items = props.items;
    // const dataSource = items.dataSource;
    // if (!dataSource) return false;
    const { isfetching } = props;
    const { subAccountListResult } = props;
    const { subAccountListDataSource, subAccountListSearch } = this.state;
    const { total } = subAccountListResult;
    const pagination = {
      total,
      showSizeChanger: true,
      pageSize: subAccountListSearch.pageSize,
      onShowSizeChange: (current, pageSize) => {
        subAccountListSearch.pageSize = pageSize;
        subAccountListSearch.pageNumber = current;
        this.setState({ subAccountListSearch }, () => {
          props.subAccountList(this.state.subAccountListSearch);
        });
      },
      onChange: (current, pageSize) => {
        subAccountListSearch.pageSize = pageSize;
        subAccountListSearch.pageNumber = current;
        this.setState({ subAccountListSearch }, () => {
          props.subAccountList(this.state.subAccountListSearch);
        });
      }
    };
    const columns = [
      {
        title: '用户名',
        dataIndex: 'UserName'
      },
      {
        title: '使用者姓名',
        dataIndex: 'RealName'
      },
      {
        title: '帐号状态',
        dataIndex: 'Enable'
      },
      {
        title: '备注',
        dataIndex: 'ReMark'
      },
      {
        title: '操作',
        width: '120px',
        dataIndex: 'OpenId',
        // <UserAccountModifyModal options={text} props={props} />
        render: (text, record) => (<div>
          <div className="account-modify">
            <A
              authOpts={{ hint: '编辑' }}
              onClick={() => { this.handleEditClick(record); }}
            >
              <Icon glyph={icons.iEdit} />
            </A>
          </div>
          <div className="enable-options">
            <A
              authOpts={{ hint: record.titleEnable }}
              onClick={() => { this.handleEnabledClick(record); }}
            >
              <Icon glyph={record.Status ? icons.iEnabled : icons.iDisabled} />
            </A>
          </div>
          <A
            authOpts={{ hint: '分配权限' }}
            onClick={() => {
              browserHistory.push(`/user/account/permission/${record.RoleId}`);
            }}
          >
            <Icon glyph={icons.iSetting} />
          </A>
        </div>)
      }];

    return (
      <div>
        {this.state.isEdit &&
          <EditAccount
            editEnd={() => {
              this.setState({ isEdit: false });
              props.subAccountList(this.state.subAccountListSearch);
            }}
            account={this.state.account}
          />}
        <Spin spinning={isfetching}>
          <div>
            <AddAccount
              addSubAccount={props.addSubAccount}
              addSubAccountResult={props.addSubAccountResult}
              addEnd={() => {
                this.setState({ isEdit: false });
                props.subAccountList(this.state.subAccountListSearch);
              }}
            />
          </div>
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={subAccountListDataSource}
          />
        </Spin>
      </div>
    );
  }
}

export default UserAccount;
