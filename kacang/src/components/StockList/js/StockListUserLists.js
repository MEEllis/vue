import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Table, Spin, message } from 'antd';
import '../../CardType/less/cardType.less';
import UpdatePrepaidCard from '../../../containers/UpdatePrepaidCard';   // 修改直储账号
import { A, Button } from '../../Auth/js/Auth';
import Icon, * as icons from '../../Icon/js/Icon';

const createForm = Form.create;
const confirm = Modal.confirm;

/* 此组件被库存列表中“账号列表” 和 区域库存中“帐号列表” 同时调用；两者各自的stockId，区域库存查看不需要修改、删除操作。
   判断传入props.stock中,有zoneData的数据则表明是区域库存查看“帐号列表”。
*/
class StockListUserLists extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    getStockAccount: PropTypes.func.isRequired,
    deleteStockAccount: PropTypes.func.isRequired,
    batchDeleteStockAccount: PropTypes.func.isRequired,
    batchUpdateStockAccount: PropTypes.func.isRequired,
    hidePrepaidModal: PropTypes.func.isRequired,
    ImportAccount: PropTypes.func.isRequired,
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
    }),
    stock: PropTypes.shape({
      Id: PropTypes.string,
      stockName: PropTypes.string,
      zoneData: PropTypes.string,
    }),
  }

  static defaultProps = {
    isfetching: true,
    ImportAccount: () => { },
    batchUpdateStockAccountResult: undefined,
    batchDeleteStockAccountResult: undefined,
    deleteStockAccountResult: undefined,
    getStockAccountResult: undefined,
    hidePrepaidModal: undefined,
    stock: undefined,
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      stock: props.stock || '',
      stockAccounts: [],
      pageNumber: 1,
      total: 0,
      pageSize: 10,
      selectedRowKeys: [],
      selectedRows: [],
      currentStock: {},
      isZone: props.stock.zoneData ? '' : false,
    };
  }

  componentWillMount() {
    this.getData();
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
        this.getData();
      }
    }
    if (batchDeleteStockAccountResult !== this.props.batchDeleteStockAccountResult) {
      if (batchDeleteStockAccountResult.Status === 200) {
        this.getData();
      }
    }
    if (batchUpdateStockAccountResult !== this.props.batchUpdateStockAccountResult) {
      if (batchUpdateStockAccountResult.Status === 200) {
        this.setState({
          selectedRowKeys: ''
        });
        this.getData();
      }
    }
  }

  getData = () => {
    const { props } = this;
    const postData = {
      // 若是区域库存列表查看直储账号列表，则stockId传区域库存Id；若是库存列表查看账号列表，则传库存Id
      stockId: props.stock.zoneData ? props.stock.zoneData.Id : props.stock.Id,
      PageNumber: this.state.pageNumber
    };
    props.getStockAccount(postData);
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
  // 修改直储账号信息
  update = (update) => {
    const pageNumber = this.state.pageNumber;
    const pageObj = { PageNumber: pageNumber };
    Object.assign(update, pageObj);
    this.setState({ currentStock: update, updateInfo: true });
  }
  hideInfoModal = () => { this.setState({ updateInfo: false }); }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
      }
    };
    const { selectedRowKeys } = this.state;
    const pagination = {
      total: this.state.total,
      showSizeChanger: true,
      pageSize: this.state.pageSize,
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
        width: 70,
        fixed: 'right',
        render: (data) => (
          props.stock.zoneData ? '--' :
            <div>
              <A authOpts={{ hint: '修改' }} onClick={() => { this.update(data); }}>
                <span style={{ paddingRight: '15px' }} >
                  <Icon glyph={icons.iEdit} />
                </span>
              </A>
              <A authOpts={{ hint: '删除' }} onClick={() => { this.delete(data); }}>
                <span>
                  <Icon glyph={icons.iDelete} />
                </span>
              </A>
            </div>
        )
      }
    ];

    const { props } = this;
    const hasSelected = selectedRowKeys.length > 0;
    const stockName = this.state.stock.stockName || [];
    let [zoneName, Region] = ['', ''];
    if (props.stock.zoneData) {
      zoneName = props.stock.zoneData.Name;
      Region = props.stock.zoneData.Region;
    }
    const { currentStock, updateInfo } = this.state;

    return (
      <span>
        {updateInfo &&
          <UpdatePrepaidCard
            close={this.hideInfoModal}
            currentStock={currentStock}
            getStockAccount={props.getStockAccount}
          />
        }
        <Modal
          onClose={() => { this.props.hidePrepaidModal(); }}
          title={
            props.stock.zoneData ? `${zoneName} ${Region} 地区` : `${stockName}  下的帐号列表`
          }
          visible={this.state.visible}
          width="80%"
          onCancel={() => { this.props.hidePrepaidModal(); }}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={() => { this.props.hidePrepaidModal(); }}>
              关闭
            </Button>
          ]}
        >
          <Spin spinning={this.props.isfetching}>
            <div style={{ marginBottom: 16, display: props.stock.zoneData ? 'none' : 'block' }} >
              <Button
                type="primary"
                onClick={this.delete}
                style={{ marginRight: 8 }}
                disabled={!hasSelected}
              >批量删除</Button>
              <Button
                type="primary"
                onClick={() => { this.batchUpdatePrepaidCardIsUse(false); }}
                style={{ marginRight: 8 }}
                disabled={!hasSelected}
              >批量更新为未用完</Button>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={() => { this.batchUpdatePrepaidCardIsUse(true); }}
                disabled={!hasSelected}
              >批量更新为已用完</Button>
              <Button
                type="primary"
                onClick={() => { this.props.ImportAccount(props.stock); }}
                hideImportModal={this.hideImportModal}
              >
                添加新账号
              </Button>
            </div>
            <Table
              rowKey="Id"
              rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.stockAccounts}
              pagination={pagination}
            />
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default createForm()(StockListUserLists);
