import React from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Spin,
  message,
  Modal,
  Icon,
} from 'antd';
import PropTypes from 'prop-types';
import * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';
import '../../StockList/less/stockList.less';
import IconComponent from '../../IconComponent/js/IconComponent';
import EditableCell from '../../StockList/js/EditableCell';

const createForm = Form.create;
const confirm = Modal.confirm;

class StockListAdd extends React.Component {
  static propTypes = {
    getRelationStocklist: PropTypes.func.isRequired,
    hideStockPackListModal: PropTypes.func.isRequired,
    getUnrelationStocklist: PropTypes.func.isRequired,
    relationStock: PropTypes.func.isRequired,
    updateRelationStockPriority: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    currentStock: PropTypes.objectOf(PropTypes.shape({
      Id: PropTypes.string.isRequired,
    })).isRequired,
    getRelationStocklistResult: PropTypes.shape({
      Data: PropTypes.object.isRequired
    }),
    getUnrelationStocklistResult: PropTypes.shape({
      Data: PropTypes.object.isRequired
    }),
    updateRelationStockPriorityResult: PropTypes.shape({
      Message: PropTypes.string.isRequired
    }),
    relationStockResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    deleteRelationstockResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    getRelationStocklistResult: undefined,
    getUnrelationStocklistResult: undefined,
    updateRelationStockPriorityResult: undefined,
    relationStockResult: undefined,
    deleteRelationstockResult: undefined
  };
  constructor(props) {
    super(props);
    // console.log('导库存包列表页', props);
    this.state = {
      packageId: props.currentStock.Id,
      postDataGetAddRelationStockList: {
        PageNumber: 1,
        PageSize: 5,
        PackageStockId: 0
      },
      locationData: this.props.currentStock,
      modalVisibleImport: false,
      reload: false,
      zoneListsSelectData: {},
      relationStocksTable: [],
      selectedRowKeys: [],
      isDisplayLists: true,
      addStockTotalRecords: 0,
      tableSourceAddStock: [],
      selectTableSourceAddStock: []
    };
  }

  componentDidMount() {
    const Id = this.state.locationData.Id;
    this.props.getRelationStocklist({ Id });
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { getRelationStocklistResult, getUnrelationStocklistResult,
      updateRelationStockPriorityResult, relationStockResult,
      deleteRelationstockResult } = nextProps;

    // 查询已关联库存
    if (getRelationStocklistResult !== props.getRelationStocklistResult) {
      this.setState({ relationStocksTable: getRelationStocklistResult.Data });
    }
    // 查询未关联库存
    if (getUnrelationStocklistResult !== props.getUnrelationStocklistResult) {
      this.reSetSableSourceAddStock(this.state.selectedRowKeys, getUnrelationStocklistResult.Data);
      this.setState({
        tableSourceAddStock:
        getUnrelationStocklistResult.Data,
        addStockTotalRecords: getUnrelationStocklistResult.Total
      });
    }
    // 关联库存
    if (relationStockResult !== props.relationStockResult && relationStockResult.Status === 200) {
      this.props.hideStockPackListModal();
    }
    // 解除关联
    if (deleteRelationstockResult !== props.deleteRelationstockResult
      && deleteRelationstockResult.Status === 200) {
      this.getData();
    }
  }
  onCloseImport = () => {
    this.props.hideStockPackListModal();
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.relationStocksTable];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  getData = () => {
    const Id = this.state.locationData.Id;
    this.props.getRelationStocklist({ Id });
  }
  setClass = (e, data) => {
    const dataSource = this.state.selectTableSourceAddStock;
    if (dataSource.length) {
      for (const k in dataSource) {
        if (dataSource[k].RelationId === data.Id) {
          dataSource[k].Priority = e.target.value;
          break;
        }
      }
    }
    this.setState({ selectTableSourceAddStock: dataSource });
  }
  unLinkStock = (data) => {
    const relationStockIdsArr = [];
    relationStockIdsArr.push(data.Id);
    const that = this;
    confirm({
      title: `是否要解除 ${data.Name} (${data.Id}) 关联`,
      onOk: function () {
        that.props.deleteRelationstock({
          id: that.state.locationData.Id,
          relationStockIds: relationStockIdsArr
        });
      }
    });
  }
  addStock = () => {
    const { isDisplayLists } = this.state;
    this.setState({
      isDisplayLists: !isDisplayLists
    });
    if (!isDisplayLists) {
      return false;
    }
    const { postDataGetAddRelationStockList } = this.state;
    postDataGetAddRelationStockList.PackageStockId = this.state.locationData.Id;
    this.props.getUnrelationStocklist(postDataGetAddRelationStockList);
  }
  reSetSableSourceAddStock = (rowKeys, data) => {
    const dataSource = data || this.state.tableSourceAddStock;
    const selectTableSourceAddStock = this.state.selectTableSourceAddStock;
    for (const k in dataSource) {
      for (const j in rowKeys) {
        dataSource[k].select = false;
        if (dataSource[k].Id === rowKeys[j]) {
          dataSource[k].select = true;
          break;
        }
      }
      for (const i in selectTableSourceAddStock) {
        if (selectTableSourceAddStock[i].RelationId === dataSource[k].Id) {
          dataSource[k].class = selectTableSourceAddStock[i].Priority;
        }
      }
    }
    this.setState({ tableSourceAddStock: dataSource });
  }
  // 保存库存包(关联库存)
  handleOk = () => {
    const arr = this.state.selectTableSourceAddStock;
    const Relationstocks = [];
    for (const k in arr) {
      if (!arr[k].Priority) {
        message.error('选中库存商品没有设置优先级');
        return;
      } else {
        const relationItem = {
          relationId: arr[k].RelationId,
          priority: arr[k].Priority,
          region: arr[k].region
        };
        Relationstocks.push(relationItem);
      }
    }
    const postData = {
      id: this.state.packageId,
      relationstocks: Relationstocks
    };
    this.props.relationStock(postData);
    this.props.search();
    this.setState({ reload: true });
  }
  closeOrSunmit = () => {
    if (this.state.selectedRowKeys.length) {
      // const { isDisplayLists } = this.state;
      this.handleOk();
    } else {
      this.onCloseImport();
    }
  }

  updateRelationStockPriority = (data) => {
    this.props.updateRelationStockPriority(data);
  }
  render() {
    const { props } = this;
    // const { getFieldDecorator } = props.form;
    const columnsRelationStocksTable = [
      {
        title: '关联库存编号',
        dataIndex: 'Id',
        width: '15%'
      }, {
        title: '关联库存名称',
        dataIndex: 'Name',
        width: '15%'
      }, {
        title: '库存面值',
        dataIndex: 'FaceValue',
        width: '15%'
      }, {
        title: '库存状态',
        dataIndex: 'StockStatus',
        width: '15%',
        render: (text, record) => {
          let stockStatus = '';
          switch (record.StockStatus) {
            case 1:
              stockStatus = '断货';
              break;
            case 2:
              stockStatus = '警报';
              break;
            case 3:
              stockStatus = '充足';
              break;
            default:
              return '';
          }
          return (stockStatus);
        }
      }, {
        title: '库存数量',
        dataIndex: 'StockCount',
        width: '15%'
      }, {
        title: '出库优先级',
        dataIndex: 'Priority',
        width: '15%',
        render: (text, record, index) => (<EditableCell value={text} currentData={{
          packageId: this.state.packageId,
          relationStockId: record.Id
        }} onChange={this.onCellChange(index, 'Priority')} update={this.updateRelationStockPriority} />)
      }, {
        title: '操作',
        width: '15%',
        render: (data) => (<div>
          <IconComponent
            title="解除关联"
            glyphIcon={icons.iUnconnect}
            click={() => {
              this.unLinkStock(data);
            }}
          />
        </div>)
      }
    ];
    const columnsAddStock = [
      {
        title: '库存编号',
        dataIndex: 'Id'
      }, {
        title: '库存名称',
        dataIndex: 'Name'
      }, {
        title: '库存面值',
        dataIndex: 'FaceValue'
      }, {
        title: '出库优先级',
        width: '100px',
        render: (data) => (<div>
          {data.select
            ? <Input
              defaultValue={data.class}
              onChange={(e) => {
                this.setClass(e, data);
              }}
            />
            : ''
          }
          <Icon className="editable-cell-icon" onClick={this.edit} />
        </div>)
      }
    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        this.reSetSableSourceAddStock(selectedRowKeys);
        const selectTableSourceAddStock = this.state.selectTableSourceAddStock;
        const newSelectTableSourceAddStock = [];
        for (const k in selectedRowKeys) {
          for (const i in selectTableSourceAddStock) {
            if (selectedRowKeys[k] == selectTableSourceAddStock[i].RelationId) {
              newSelectTableSourceAddStock.push(selectTableSourceAddStock[i]);
              break;
            }
            if (i == selectTableSourceAddStock.length - 1) {
              newSelectTableSourceAddStock.push({ RelationId: selectedRowKeys[k], Priority: '' })
            }
          };
          if (!selectTableSourceAddStock.length) {
            newSelectTableSourceAddStock.push({ RelationId: selectedRowKeys[k], Priority: '' })
          }
        }
        this.setState({ selectedRowKeys, selectTableSourceAddStock: newSelectTableSourceAddStock });
      }
    };

    const { locationData } = this.state;
    const TotalRecords = this.state.addStockTotalRecords;
    const { postDataGetAddRelationStockList } = this.state;
    postDataGetAddRelationStockList.packageStockId = this.state.locationData.Id;
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      pageSizeOptions: [
        '5', '10', '15'
      ],
      pageSize: this.state.postDataGetAddRelationStockList.PageSize,
      onShowSizeChange: (current, pageSize) => {
        postDataGetAddRelationStockList.PageNumber = current;
        postDataGetAddRelationStockList.PageSize = pageSize;
        this.props.getUnrelationStocklist(postDataGetAddRelationStockList);
        this.setState({ reload: true });
      },
      onChange: (current) => {
        postDataGetAddRelationStockList.PageNumber = current;
        this.props.getUnrelationStocklist(postDataGetAddRelationStockList);
        this.setState({ reload: true });
      }
    };
    return (
      <div>
        {/*  table1 库存包列表   table2 导库存包 */}
        <Modal
          onCancel={this.onCloseImport}
          title={locationData.stockName + ' 的库存包列表'}
          visible
          width={'80%'}
          footer={[
            <Button
              key="back"
              type={
                this.state.selectedRowKeys.length
                  ? 'primary'
                  : 'default'
              }
              onClick={
                this.closeOrSunmit
              }
            > {
                this.state.selectedRowKeys.length
                  ? '保存'
                  : '关闭'
              }
            </Button>]}
        >
          <Spin spinning={props.isfetching}>
            <div className="modal-demo-content">
              <div className={'mb10'}>
                <Button type="primary" onClick={this.addStock}>{this.state.isDisplayLists
                  ? '添加新库存'
                  : '返回'}</Button>
              </div>
              {this.state.isDisplayLists
                ? <Table
                  rowKey="Id"
                  columns={columnsRelationStocksTable}
                  dataSource={this.state.relationStocksTable}
                  pagination={false}
                  scroll={{
                    y: 550
                  }}
                />
                : <Table rowKey="Id" rowSelection={rowSelection} columns={columnsAddStock} dataSource={this.state.tableSourceAddStock} pagination={pagination} />
              }
            </div>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default createForm()(StockListAdd);
