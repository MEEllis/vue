import React from 'react';
import { Form, Button, Table, Spin, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import '../../CardType/less/cardType.less';
import StockListZoneImport from '../../../containers/StockListZoneImport'; // 区域库存 导入
import StockListUserLists from '../../../containers/StockListUserLists'; // 帐号列表
import Icon, * as icons from '../../Icon/js/Icon';
import { A } from '../../Auth/js/Auth';
import FL from '../../../utils/FL';

const createForm = Form.create;

class StockListZoneLists extends React.Component {
  static propTypes = {
    hideZoneListModal: PropTypes.func.isRequired,
    deleteRelationStockImportZone: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    getZoneStocklistResult: PropTypes.arrayOf(PropTypes.shape({

    })).isRequired,
    stock: PropTypes.objectOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Id: PropTypes.string.isRequired,
      FaceValue: PropTypes.string.isRequired,
    })).isRequired,
    deleteRelationStockImportZoneResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };
  static defaultProps = {
    deleteRelationStockImportZoneResult: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      getZoneStocklistResult: [],
      PostData: {
        condition: {
          PageIndex: 1,
          PageNumber: 1,
          PageSize: 5
        }
      },
      baseSource: [],
      currentStock: {},
      zoneStockDetailsVisible: true, // 显示区域列表 / 列表详情
      zoneStockDetails: [], // 地区详情
      prepaidCardList: [], // 区域卡密列表
      prepaidCardInfo: ''
    };
  }
  componentWillMount() {
    // const { props } = this;
    this.displayData();
  }
  componentWillReceiveProps = (nextProps) => {
    const { getZoneStocklistResult, deleteRelationStockImportZoneResult } = nextProps;
    const { props } = this;
    // 获取库存列表
    if (getZoneStocklistResult !== props.getZoneStocklistResult) {
      const baseSource = [];
      FL.REGION.forEach((list, index) => {
        const zoneList = {};
        if (getZoneStocklistResult.length > 0) {
          getZoneStocklistResult.forEach((value) => {
            if (value.Region === list.value) {
              zoneList.Id = value.Id;
              zoneList.Name = value.Name;
              zoneList.StockCount = value.StockCount;
            }
          });
        }
        zoneList.Region = list.value;
        zoneList.keyNumber = index;
        baseSource.push(zoneList);
      });

      this.setState({ baseSource });
      if (getZoneStocklistResult) {
        this.setState({ getZoneStocklistResult });
      }
    }
    // 解除关联
    if (deleteRelationStockImportZoneResult !== props.deleteRelationStockImportZoneResult
      && deleteRelationStockImportZoneResult.Status === 200) {
      this.displayData();
      this.props.search();
    }
  }
  onClose = () => {
    if (!this.state.zoneStockDetailsVisible) {
      this.setState({ zoneStockDetailsVisible: true });
      return false;
    }
    this.props.hideZoneListModal();
  }
  displayData = () => {
    const { props } = this;
    props.getZoneStocklist({ Id: props.stock.Id });
  }
  // 区域库存删除关联库存
  deleteRelationStock = (deleteData) => {
    this.props.deleteRelationStockImportZone({
      StockId: this.props.stock.Id,
      RelationStockId: deleteData.Id,
      Region: deleteData.Region
    });
  }
  // 导入库存
  ZoneImport = (stock) => {
    this.setState({ currentStock: stock, importStock: true });
  }
  // 账号列表
  PrepaidCardList = (stock) => {
    this.setState({ currentStock: stock, stockPrepaidList: true });
  }
  // 隐藏子组件Modal
  hideZoneImportModal = () => { this.setState({ importStock: false }); }
  hidePrepaidModal = () => { this.setState({ stockPrepaidList: false }); }


  render() {
    const { props } = this;
    const dataSource = this.state.baseSource || [];
    const columnsZoneStockDetails = [
      {
        title: '区域',
        width: '20%',
        dataIndex: 'Region'
      }, {
        title: '库存编号',
        width: '20%',
        dataIndex: 'Id'
      }, {
        title: '库存名称',
        width: '25%',
        dataIndex: 'Name'
      }, {
        title: '帐号数量',
        width: '20%',
        dataIndex: 'StockCount'
      }, {
        title: '操作',
        width: 100,
        // fixed:'right',
        render: (data) => (<div>
          <span style={{ paddingRight: '15px' }}>
            {/* 区域库存  导入库存 */}
            <A
              authOpts={{ hint: '导入库存' }}
              onClick={() => {
                this.ZoneImport({
                  zoneStock: data,
                  Id: this.props.stock.Id,
                  FaceValue: this.props.stock.FaceValue,
                  Name: this.props.stock.Name,
                });
              }}
            >
              <Icon glyph={icons.iImport} />
            </A>
          </span>
          {data.Id ?
            <span style={{ paddingRight: '15px' }}>
              {/* 账号列表 */}
              <A
                authOpts={{ hint: '账号列表' }}
                onClick={() => {
                  this.PrepaidCardList({ zoneData: data });
                }}
              >
                <Icon glyph={icons.iViewList} />
              </A>
            </span> : ''
          }
          {data.Id ?
            <span>
              {/* 解除关联 */}
              <A
                authOpts={{ hint: '解除关联' }}
                onClick={() => {
                  this.deleteRelationStock(data);
                }}
              >
                <Icon glyph={icons.iUnconnect} />
              </A>
            </span> : ''}
        </div>)
      }
    ];

    const { currentStock, importStock, stockPrepaidList } = this.state;

    return (
      <span>
        {/* 区域列表 导入库存 */}
        {importStock &&
          <StockListZoneImport
            search={this.props.search}
            stock={currentStock}
            hideZoneImportModal={this.hideZoneImportModal}
            getZoneStocklist={this.displayData}
          />
        }
        {/* 账号列表 */}
        {stockPrepaidList &&
          <StockListUserLists
            stock={currentStock}
            ImportAccount={this.ImportAccount}
            hidePrepaidModal={this.hidePrepaidModal}
          />
        }
        <Modal
          onCancel={() => { props.hideZoneListModal(); }}
          title={this.state.zoneStockDetailsVisible ? '添加新库存' : this.state.prepaidCardInfo}
          visible
          width="80%"
          footer={[<Button key="button" type="default" size="large" onClick={this.onClose}>
            {this.state.zoneStockDetailsVisible ? '关闭' : '返回'} </Button>]}
        >
          <Spin spinning={false}>
            <div className="modal-demo-content">
              <Table
                rowKey="keyNumber"
                columns={columnsZoneStockDetails}
                dataSource={dataSource}
                pagination={false}
                scroll={{ y: 390 }}
              />
              {/* {this.state.zoneStockDetailsVisible
                ?
                  <Table
                    rowKey="key"
                    columns={columnsZoneStockDetails}
                    dataSource={dataSource}
                    pagination={false}
                    scroll={{ y: 390 }}
                  />
                :
                  <Table
                    rowKey={this.state.prepaidCardList.key}
                    columns={columnsPrepaidCardList}
                    dataSource={this.state.prepaidCardList}
                  />
              } */}
            </div>
          </Spin>
        </Modal>

      </span>
    );
  }
}

export default createForm()(StockListZoneLists);
