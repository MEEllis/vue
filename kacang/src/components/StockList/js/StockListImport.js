import React from 'react';
import { Form, Input, Select, Row, Col, Button, Table, Spin, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import FL from '../../../utils/FL';
import Icon, * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';
// import IconComponent from '../../IconComponent/js/IconComponent';
import { A } from '../../Auth/js/Auth';
import ShowPrepaidCardList from '../../../containers/ShowPrepaidCardList'; // 查看直储账号列表

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

class StockListZoneImport extends React.Component {
  static propTypes = {
    getStocklistImportzone: PropTypes.func.isRequired,
    hideZoneImportModal: PropTypes.func.isRequired,
    relationStockImportzone: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    stock: PropTypes.objectOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })).isRequired,
    zoneStockList: PropTypes.objectOf(PropTypes.shape({
      Id: PropTypes.string.isRequired,
    })).isRequired,
    relationStockImportzoneResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getStocklistImportzoneResult: PropTypes.shape({
      TotalRecords: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    stock: undefined,
    relationStockImportzoneResult: undefined,
    getStocklistImportzoneResult: undefined
  };
  constructor(props) {
    super(props);
    // console.log('props', props);
    this.state = {
      stock: props.stock,
      postData: {
        PageNumber: 1,
        PageSize: 5,
        Name: '',
        Nature: 1,
        StockStatus: '',
        StockType: 2,
        FaceValue: props.stock.FaceValue,
        BeginTime: '',
        EndTime: '',
      },
      stockDetailModal: false,
      locationData: {},
      modalVisibleImport: false,
      reload: false,
      zoneListsSelectData: {},
      relationStocksTable: [],
      selectedRowKeys: [],
      dataSourceStockAccount: [],
      isStockAccountShow: false
    };
  }
  componentWillMount() {
    const { props } = this;
    // 分页查询库存列表
    const postData = this.state.postData;
    props.getStocklistImportzone(postData);
  }
  componentWillReceiveProps = (nextProps) => {
    const { getStocklistImportzoneResult, relationStockImportzoneResult } = nextProps;
    const { props } = this;
    // 获取库存列表
    if (getStocklistImportzoneResult !== props.getStocklistImportzoneResult) {
      if (props.zoneStockList) {
        this.setState({
          reload: false,
          selectedRowKeys: [props.zoneStockList.Id]
        });
      }
    }
    // 关联库存
    if (relationStockImportzoneResult !== props.relationStockImportzoneResult) {
      if (relationStockImportzoneResult.Status === 200) {
        // 调用查询库存列表
        const postData = this.state.postData;
        this.props.getStocklistImportzone(postData);
        this.props.hideZoneImportModal();
      }
    }
  }
  onCloseImport = () => {
    const { isStockAccountShow } = this.state;
    if (isStockAccountShow) {
      this.setState({ isStockAccountShow: false });
    } else {
      this.props.hideZoneImportModal();
    }
  }
  submitImport = () => {
    if (!this.state.selectedRowKeys[0] || this.state.selectedRowKeys[0] === '00000000-0000-0000-0000-000000000000') {
      message.error('请选择关联地区');
      return false;
    }
    this.props.form.validateFields((err, value) => {
      this.props.relationStockImportzone({
        id: this.props.stock.Id,
        relationstocks: [{
          relationId: this.state.selectedRowKeys[0],
          region: value.Region,
          priority: 1
        }]
      });
    });
    this.props.search();
  }
  selectRegion(region) {
    const postData = this.state.postData;
    postData.region = region;
    this.props.getStocklistImportzone(postData);
  }
  // 查看
  stockDetail = (stock) => {
    this.setState({ currentStock: stock, stockDetailModal: true });
  }
  hidePrepaidCardModal = () => { this.setState({ stockDetailModal: false }); }
  render() {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    // 获取关联库存
    const dataSourceImportZone = props.getStocklistImportzoneResult.Data;
    // const stockDetail = props.getStockDetailResult.Data;
    const stockDetailData = '';
    const columnsStockAccount = [
      {
        title: '帐号',
        dataIndex: 'UserName'
      }, {
        title: '密码',
        dataIndex: 'PassWord'
      }, {
        title: '是否已用完',
        dataIndex: 'IsuseD'
      }, {
        title: '进价',
        dataIndex: 'Price'
      }, {
        title: '调用顺序',
        dataIndex: 'Sequence'
      }, {
        title: '修改时间',
        dataIndex: 'Created'
      }, {
        title: '修改人',
        dataIndex: 'UpdatorName'
      }, {
        title: '是否使用密保卡',
        dataIndex: 'EnableSecretD'
      }
    ];
    const columnsRelationStocksTable = [
      {
        title: '库存名称',
        dataIndex: 'Name'
      }, {
        title: '库存面值',
        dataIndex: 'FaceValue'
      }, {
        title: '库存数量',
        dataIndex: 'StockCount'
      }, {
        title: '操作',
        width: 50,
        render: (data) => (
          <div>
            {data.StockCount
              ?
              <A
                authOpts={{ hint: '查看' }}
                onClick={() => { this.stockDetail(data); }}
              >
                <Icon glyph={icons.chakan} />
              </A>
              : '--'}
          </div>
        )
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (selectedRowKeysInfo, selectedRows) => {
        this.setState({ selectedRowKeys: selectedRowKeysInfo, selectedRows });
      }
    };
    const FORMLAYOUTMIN = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 22
      }
    };
    const { stockDetailModal, currentStock } = this.state;
    return (
      <span>
        {stockDetailModal &&
          <ShowPrepaidCardList
            hidePrepaidCardModal={this.hidePrepaidCardModal}
            currentStock={currentStock}
            Stock={this.props.stock}
          />
        }
        <Modal
          onCancel={() => { props.hideZoneImportModal(); }}
          title="导入区域库存"
          visible
          width="80%"
          footer={
            [
              <Button
                key="back"
                type="default"
                onClick={
                  this.onCloseImport
                }
              > {
                  this.state.isStockAccountShow > 0
                    ? '返回'
                    : '关闭'
                } </Button>, <Button key="button" type="primary" onClick={this.submitImport}> 提交 </Button>]
          }
        >
          <Spin spinning={false}>
            {
              this.state.isStockAccountShow
                ? <Table rowKey="Id" columns={columnsStockAccount} dataSource={stockDetailData} />
                : <div className="modal-demo-content">
                  <Form style={{ marginBottom: 10 }}>
                    <FormItem label="库存名称" {...FORMLAYOUTMIN}>
                      {getFieldDecorator('Name',
                        { initialValue: this.props.stock.Name }
                      )(<Input disabled />)}
                    </FormItem>
                    <FormItem {...FORMLAYOUTMIN} label="所属区域">
                      {getFieldDecorator('Region',
                        { initialValue: '全国' }
                      )(
                        <Select
                          size="large"
                          onChange={(value) => { this.selectRegion(value); }}
                        >
                          {FL.REGION.map((list) =>
                            (<Option key={list.value} value={list.value}>{list.name}</Option>)
                          )}
                        </Select>
                        )}
                    </FormItem>
                  </Form>
                  <Row>
                    <Col span={22} offset={2}>
                      <Table
                        rowKey={this.state.relationStocksTable.key}
                        columns={columnsRelationStocksTable}
                        dataSource={dataSourceImportZone}
                        rowSelection={rowSelection}
                      />
                    </Col>
                  </Row>
                </div>
            }
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default createForm()(StockListZoneImport);
