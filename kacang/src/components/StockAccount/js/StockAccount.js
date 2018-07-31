import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Spin, message, Table } from 'antd';
import omit from 'object.omit';
import { A, Button } from '../../Auth/js/Auth';
import Icon, { iDelete, iEdit } from '../../Icon/js/Icon';
import { dateFormat } from '../../../utils';
import SearchForm from '../../SearchForm';
import UpdatePrepaidCard from '../../../containers/UpdatePrepaidCard';
import '../../CardType/less/cardType.less';
import '../../StockList/less/stockList.less';

const confirm = Modal.confirm;

class StockAccount extends React.Component {
  static contextTypes = {
    pageSize: PropTypes.number
  };

  static propTypes = {
    isfetching: PropTypes.bool,
    getStockAccount: PropTypes.func.isRequired,
    deleteStockAccount: PropTypes.func.isRequired,
    batchDeleteStockAccount: PropTypes.func.isRequired,
    batchUpdateStockAccount: PropTypes.func.isRequired,
    batchUpdateStockAccountResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    batchDeleteStockAccountResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    deleteStockAccountResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getStockAccountResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    })
  }

  static defaultProps = {
    isfetching: true,
    batchUpdateStockAccountResult: undefined,
    batchDeleteStockAccountResult: undefined,
    deleteStockAccountResult: undefined,
    getStockAccountResult: undefined
  }

  constructor(props, context) {
    super(props);
    this.state = {
      stockAccounts: [],
      pageNumber: 1,
      total: 0,
      pageSize: context.pageSize,
      selectedRowKeys: [],
      selectedRows: [],
      condition: {},
      isEdit: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { getStockAccountResult, deleteStockAccountResult,
      batchDeleteStockAccountResult, batchUpdateStockAccountResult } = nextProps;
    if (getStockAccountResult !== this.props.getStockAccountResult) {
      if (getStockAccountResult.Status === 200) {
        this.setState({
          stockAccounts: getStockAccountResult.Data,
          total: getStockAccountResult.Total
        });
      }
    }
    if (deleteStockAccountResult !== this.props.deleteStockAccountResult) {
      if (deleteStockAccountResult.Status === 200) {
        message.success('删除成功！');
        this.getData();
      }
    }
    if (batchDeleteStockAccountResult !== this.props.batchDeleteStockAccountResult) {
      if (batchDeleteStockAccountResult.Status === 200) {
        message.success('批量删除成功！');
        this.getData();
      }
    }
    if (batchUpdateStockAccountResult !== this.props.batchUpdateStockAccountResult) {
      if (batchUpdateStockAccountResult.Status === 200) {
        message.success('批量更新成功！');
        this.setState({
          selectedRowKeys: ''
        });
        this.getData();
      }
    }
  }

  getData = () => {
    const { AddTime } = this.state.condition;
    const { pageNumber, pageSize } = this.state;
    this.props.getStockAccount({
      pageNumber,
      pageSize,
      ...omit(this.state.condition, 'AddTime'),
      BeginTime: AddTime && AddTime.length ? dateFormat(AddTime[0]) : '',
      EndTime: AddTime && AddTime.length > 1 ? dateFormat(AddTime[1]) : ''
    });
  }

  search = (err, values) => {
    if (err) return false;
    this.setState({ condition: values, pageNumber: 1 }, () => { this.getData(); });
  }

  init = (values) => {
    this.setState({ condition: values }, () => { this.getData(); });
  }
  batchUpdatePrepaidCardIsUse = (isused) => {
    if (isused) {
      confirm({
        title: '所选账号更新为已用完后，此库存账号将无法使用，确认要更新吗？',
        onOk: () => {
          this.props.batchUpdateStockAccount({ ids: this.state.selectedRowKeys, isused });
        }
      });
    } else {
      this.props.batchUpdateStockAccount({ ids: this.state.selectedRowKeys, isused });
    }
  }

  delete = (data) => {
    // 如果是单条删除
    if (data.Id) {
      confirm({
        title: data.IsUsed ? '删除后将无法恢复，确认删除吗？' : '所选账号未用完，请谨慎删除，删除后将无法恢复，确认删除吗？',
        onOk: () => {
          const id = data.Id;
          this.props.deleteStockAccount({ id });
        }
      });
    } else {
      const { selectedRows } = this.state;
      let isUsed = false;
      let isUsedAll = false;
      for (let index = 0; index < selectedRows.length; index += 1) {
        // 如果有一个账号为未用完账号
        if (!selectedRows[index].IsUsed) {
          isUsed = true;
        }
        // 如果有一个账号为已用完账号
        if (selectedRows[index].IsUsed) {
          isUsedAll = true;
        }
      }
      let title = '';
      // 如果有未用完也有已用完
      if (isUsed && isUsedAll) {
        title = '所选账号包含未用完，请谨慎删除，删除后将无法恢复，确认删除吗？';
      }
      // 如果有未用完没有已用完
      if (isUsed && !isUsedAll) {
        title = '所选账号未用完，请谨慎删除，删除后将无法恢复，确认删除吗？';
      }
      // 如果有已用完没有未用完
      if (!isUsed && isUsedAll) {
        title = '删除后将无法恢复，确认删除吗？';
      }
      confirm({
        title,
        onOk: () => {
          this.props.batchDeleteStockAccount({ ids: this.state.selectedRowKeys });
        }
      });
    }
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
      }
    };
    const { selectedRowKeys, isEdit, currentItem } = this.state;
    const pagination = {
      total: this.state.total,
      showSizeChanger: true,
      pageSize: this.state.pageSize,
      current: this.state.pageNumber,
      onShowSizeChange: (current, pageSize) => {
        this.setState({
          pageNumber: current,
          pageSize
        }, () => {
          this.getData();
        });
      },
      onChange: (current) => {
        this.setState({
          pageNumber: current
        }, () => {
          this.getData();
        });
      },
    };

    const columns = [
      {
        title: '所属库存',
        dataIndex: 'StockName',
        render: (text, record) => (`${text}(${record.StockId})`)
      },
      {
        title: '用户名',
        dataIndex: 'RechargeUserName'
      },
      {
        title: '密码',
        dataIndex: 'RechargePassword',
        render: (text) => (text && text.length ? `${text[0]}******${text[text.length - 1]}` : '')
      },
      {
        title: '进货价格',
        dataIndex: 'Price'
      },
      {
        title: '调用顺序',
        dataIndex: 'Sort'
      },
      {
        title: '状态',
        dataIndex: 'IsUsed',
        render: (text) => (text ? '已用完' : '未用完')
      },
      {
        title: '启用密保',
        dataIndex: 'IsNeedSecretCard',
        render: (text) => (text ? '是' : '否')
      },
      {
        title: '操作',
        width: 100,
        fixed: 'right',
        render: (data) =>
          (<span>
            <A auth="stockAccountEdit" authOpts={{ hint: '修改' }} onClick={() => { this.setState({ isEdit: true, currentItem: data }); }}>
              <span style={{ paddingRight: '15px' }} >
                <Icon glyph={iEdit} />
              </span>
            </A>
            <A auth="stockAccountDel" authOpts={{ hint: '删除' }} onClick={() => { this.delete(data); }}>
              <span style={{ paddingRight: '15px' }} >
                <Icon glyph={iDelete} />
              </span>
            </A>
          </span>)
      }
    ];

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        {isEdit &&
          <UpdatePrepaidCard
            close={() => { this.setState({ isEdit: false }); this.getData(); }}
            currentStock={currentItem}
          />
        }
        <Spin spinning={this.props.isfetching}>
          <SearchForm name="StockAccountList" init={this.init} search={this.search} isShowMore showCount={6} />
          <div style={{ marginBottom: 16 }}>
            <Button
              auth="stockAccountDel"
              type="primary"
              onClick={this.delete}
              style={{ marginRight: 8 }}
              disabled={!hasSelected}
            >批量删除</Button>
            <Button
              auth="stockAccountUpdate"
              type="primary"
              onClick={() => { this.batchUpdatePrepaidCardIsUse(false); }}
              style={{ marginRight: 8 }}
              disabled={!hasSelected}
            >批量更新为未用完</Button>
            <Button
              auth="stockAccountUpdate"
              type="primary"
              onClick={() => { this.batchUpdatePrepaidCardIsUse(true); }}
              disabled={!hasSelected}
            >批量更新为已用完</Button>
          </div>
          <Table
            rowKey="Id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.stockAccounts}
            pagination={pagination}
          />
        </Spin>
      </div>
    );
  }
}

export default Form.create()(StockAccount);
