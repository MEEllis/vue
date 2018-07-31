import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, Spin, message, Form, Select, Radio, Input, Row, Col } from 'antd';
import find from 'lodash/find';
import CopyToClipboard from 'react-copy-to-clipboard';
import '../../CardType/less/cardType.less';
import { Button } from '../../Auth/js/Auth';
import Search from '../../../config/search';
import { dateFormat } from '../../../utils';
import Icon, * as icons from '../../Icon/js/Icon';
import '../less/showDetailComponent.less';
import JSONToCSV2 from '../../../utils/helper/exportExcel';

const createForm = Form.create;
const FormItem = Form.Item;
const OrderListSearch = Search.OrderList;
const RadioGroup = Radio.Group;

class ShowDetailComponent extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    orderId: PropTypes.string.isRequired,
    getData: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    manageOrder: PropTypes.bool,
    getOrderDetail: PropTypes.func.isRequired,
    handleOrder: PropTypes.func.isRequired,
    getOrderDetailResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    handleOrderResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    isfetching: true,
    getOrderDetailResult: undefined,
    handleOrderResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      orderDetail: {},
      showPriceText: '展开',
      copyData: '',
      postOrderSuccessInfo: true,
      postOrderFailInfo: false,
      radValue: '',
      showInfo: false,
      personInfo: '' // 用户自行输入信息
    };
  }

  componentDidMount() {
    const { orderId } = this.props;
    this.props.getOrderDetail({ orderId });
  }

  componentWillReceiveProps(nextProps) {
    const { getOrderDetailResult, handleOrderResult } = nextProps;
    if (getOrderDetailResult !== this.props.getOrderDetailResult) {
      if (getOrderDetailResult.Status === 200) {
        let copyData = '';
        if (getOrderDetailResult.Data.StockContent) {
          getOrderDetailResult.Data.StockContent.Data.forEach((item, index) => {
            copyData += `${index + 1} ${item.CardNumber} ${item.Password} ${dateFormat(item.Expire)}\n`;
          });
        }
        this.setState({
          orderDetail: getOrderDetailResult.Data,
          copyData
        });
      }
    }
    if (handleOrderResult !== this.props.handleOrderResult) {
      if (handleOrderResult.Status === 200) {
        this.props.close();
        this.props.getData();
      }
    }
  }

  getProductType = (type) => {
    const productType = find(find(OrderListSearch, { id: 'ProductType' }).items, { value: type });
    if (productType) return productType.name;
  }

  getStatus = (status) => {
    switch (status) {
      case '3':
        return '未处理';
      case '4':
        return '充值中';
      case '5':
        return '成功';
      case '6':
        return '交易失败';
      case '7':
        return '可疑';
      default:
        return '未知';
    }
  }
  hideDetailModal = () => {
    this.props.close();
  }
  // 展示价格
  showPrice = () => {
    let showPriceText = this.state.showPriceText;
    if (showPriceText === '展开') {
      showPriceText = '收起';
    } else {
      showPriceText = '展开';
    }
    this.setState({ showPriceText });
  }
  // 将订单处理为下拉事件
  handleChange = (value) => {
    // 如果改变了商品类型为卡密值储
    if (value === '5') {
      this.setState({ postOrderSuccessInfo: true, postOrderFailInfo: false });
    } else if (value === '6') {
      this.setState({ postOrderSuccessInfo: false, postOrderFailInfo: true });
    }
  }
  // 确定处理
  handleSubmit = () => {
    const { orderDetail, personInfo, showInfo, postOrderSuccessInfo } = this.state;
    this.props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      if (!postOrderSuccessInfo && showInfo && personInfo === '') {
        return message.error('请选择充值描述');
      }
      const Description = postOrderSuccessInfo
        ? value.Description : (showInfo ? personInfo : value.DescriptionFail);
      this.props.handleOrder({
        ...value,
        Charger: orderDetail.Charger,
        ChargeUseAccount: orderDetail.ChargeUseAccount,
        OrderId: orderDetail.OrderId,
        Description
      });
    });
  }
  radOnChange = (e) => {
    if (e.target.value === '自行输入原因') {
      this.setState({
        showInfo: true,
      });
    }
    else {
      this.setState({
        showInfo: false,
      });
    }
  }
  personInfoChange = (e) => {
    this.setState({
      personInfo: e.target.value
    });
  }
  exportExcel = () => {
    let tabledata = [{ "OilCard_Oid": "1", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 1, "Fee_EndDate": "2016-12-16", "Operate_Name": "易运客服", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "11", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 11, "Fee_EndDate": "2016-11-16", "Operate_Name": "易运客服", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "12345", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 45, "Fee_EndDate": "2016-12-16", "Operate_Name": "易运客服", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "333", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 3, "Fee_EndDate": "2016-12-16", "Operate_Name": "易运客服", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "3333333333333333333333333333333333333333333333", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 7777, "Fee_EndDate": "2016-11-10", "Operate_Name": "势航成都", "Operate_Org": "101002      ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "44", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 4, "Fee_EndDate": "2016-12-16", "Operate_Name": "势航成都", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "55", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 5, "Fee_EndDate": "2016-12-16", "Operate_Name": "势航成都", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "77", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 7, "Fee_EndDate": "2016-12-16", "Operate_Name": "易运客服", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }, { "OilCard_Oid": "88", "Use_Org": "101         ", "OilCard_Type": "中国石油", "OilCard_Type_Oid": "AS", "Fee": 8, "Fee_EndDate": "2016-12-16", "Operate_Name": "易运客服", "Operate_Org": "            ", "Org_Name": "赛托斯总部" }];
    let columname = ["加油卡卡号", "油卡公司", "使用机构", "油卡费用", "有效期"];
    let colums = ["OilCard_Oid", "OilCard_Type", "Org_Name", "Fee", "Fee_EndDate"];
    JSONToCSV2(tabledata, "油卡设置表", columname, '油卡设置表', colums);
  }
  render() {
    const { isfetching, manageOrder } = this.props;
    const { orderDetail, showPriceText, postOrderSuccessInfo, postOrderFailInfo, showInfo } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 12
      }
    };
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '序号',
        width: 50,
        render: (_, record, index) => (index + 1)
      },
      {
        title: '卡号',
        dataIndex: 'CardNumber'
      },
      {
        title: '密码',
        dataIndex: 'Password',
      },
      {
        title: '有效期',
        dataIndex: 'Expire',
        render: (text) => (dateFormat(text))
      }
    ];

    return (
      <div className="ShowDetailComponent">
        <Modal title="订单详情" width={904} visible onOk={this.hideDetailModal} onCancel={this.hideDetailModal}>
          <Spin spinning={isfetching}>
            {/*订单处理*/}
            {manageOrder && <div>
              <Form className="stepTwoBody">
                <FormItem label="将订单处理为" {...formItemLayout}>
                  {getFieldDecorator('TopupStatus', {
                    initialValue: '5',
                    rules: [
                      {
                        required: true,
                        message: '请输入商品类型'
                      }
                    ]
                  })(
                    <Select onChange={this.handleChange}>
                      {/* <Option value="2">手工代充</Option> */}
                      <Select.Option value="5">交易成功</Select.Option>
                      <Select.Option value="6">交易失败</Select.Option>
                    </Select>
                    )}
                </FormItem>
                {/*交易成功*/}
                {
                  postOrderSuccessInfo && <div>
                    <FormItem label="充值描述" {...formItemLayout}>
                      {getFieldDecorator('Description', {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: '请输入充值描述'
                          }
                        ]
                      })(
                        <Input type="textarea" rows={4} />
                        )}
                    </FormItem>
                  </div>
                }
                {/*交易失败*/}
                {postOrderFailInfo && <div>
                  <FormItem label="充值描述" {...formItemLayout}>
                    {getFieldDecorator('DescriptionFail', {
                      initialValue: '厂商系统出错或维护，无法充值、请稍后重新购买',
                      rules: [
                        { required: true, message: '请输入商品类型' }
                      ]
                    })(
                      <RadioGroup onChange={this.radOnChange}>
                        <Radio className="radStyle" value="厂商系统出错或维护，无法充值、请稍后重新购买">厂商系统出错或维护，无法充值、请稍后重新购买</Radio>
                        <Radio className="radStyle" value="用户名不符，无法充值，请重新下单购买">用户名不符，无法充值，请重新下单购买</Radio>
                        <Radio className="radStyle" value="充值区域不符，无法充值，请重新下单购买">充值区域不符，无法充值，请重新下单购买</Radio>
                        <Radio className="radStyle" value="商品库存不足、请待我们补充库存再行购买">商品库存不足、请待我们补充库存再行购买</Radio>
                        <Radio className="radStyle" value="由于厂商或某些其他不可控因素不能充值、请重新提交本次充值">由于厂商或某些其他不可控因素不能充值、请重新提交本次充值</Radio>
                        <Radio className="radStyle" value="自行输入原因">自行输入原因</Radio>

                      </RadioGroup>
                      )}
                  </FormItem>
                  {showInfo &&
                    <Row>
                      <Col span={3}></Col>
                      <Col span={10}> <Input type="textarea" onChange={this.personInfoChange} rows={4} /></Col>
                    </Row>
                  }
                  <FormItem label="卡密返回" {...formItemLayout}>
                    {getFieldDecorator('ReturnCards', {
                      initialValue: 'true',
                    })(
                      <RadioGroup>
                        <Radio className="radStyle" value="true">将卡密返回库存</Radio>
                      </RadioGroup>
                      )}
                  </FormItem>
                </div>
                }
                <div>
                  <Button
                    style={{
                      margin: '0 15px 10px 131px'
                    }}
                    type="primary"
                    onClick={() => this.handleSubmit()}
                  >确定处理</Button><Button
                    style={{
                      marginRight: 8
                    }}
                    type="primary"
                    onClick={() => this.hideDetailModal()}
                  >暂不处理</Button>
                </div>
              </Form>
            </div>}

            {/*订单详情*/}
            <div className="modalDetail">
              <div className="detailLeft">
                <div className="orderBasicInfo">
                  <div className="detailTitle">
                    订单处理基本信息
                  <div className="titleLeft"></div>
                  </div>
                  <p>
                    <span>订单编号：</span>
                    <span>{orderDetail.OrderId}</span>
                  </p>
                  <p>
                    <span>订单金额：</span>
                    <span>{orderDetail.SupplierSaleTotal}</span>元 =
                  <span>{orderDetail.TopupCount}</span>(个)*
                      <span>{orderDetail.SupplierProductPrice}</span> 元
                    </p>
                  <p>
                    <span>进货商：</span>
                    <span>
                      {`${orderDetail.DealerSiteName ? orderDetail.DealerSiteName : ''}(${orderDetail.DealerSiteId ? orderDetail.DealerSiteId : ''})`}
                    </span></p>
                  <p>
                    <span>订单状态：</span>
                    <span style={{ color: '#bf4346' }}>{this.getStatus(orderDetail.TopupStatus)}</span>
                  </p>
                  <p>
                    <span>客户编号：</span>
                    <span>{orderDetail.DealerSiteId}</span></p>
                  <p>
                    <span>下单IP：</span>
                    <span>{orderDetail.TopupContent ? orderDetail.TopupContent.OutSaleIp : ''}</span>
                  </p>
                  <p>
                    <span>下单时间：</span>
                    <span>{dateFormat(orderDetail.ReceiveTime)}</span>
                  </p>
                  {orderDetail.CompletionTime &&
                    <p>
                      <span>处理时间：</span>
                      <span>{dateFormat(orderDetail.CompletionTime)}</span>
                    </p>
                  }
                </div>
                {
                  orderDetail.ProductType !== '1' && orderDetail.ProductType !== '2' ?
                    <div className="chargeDescription">
                      <div className="detailTitle">
                        消费内容
                        <div className="titleLeft">
                        </div>
                      </div>
                      <p>
                        <span>充值账户：</span>
                        <span>{orderDetail.TopupAccount}</span>
                      </p>
                      <p>
                        <span>购买数量：</span>
                        <span>{orderDetail.TopupCount}</span>
                      </p>
                      <p>
                        <span>游戏名称</span>
                        <span>{orderDetail.TopupContent ? orderDetail.TopupContent.ChargeGame : ''}</span>
                      </p>
                      <p>
                        <span>充值描述</span>
                        <span>{orderDetail.ChargeDescription}</span>
                      </p>
                      <p>
                        <span>服务器</span>
                        <span>{orderDetail.TopupContent ? orderDetail.TopupContent.OutSaleIp : ''}</span>
                      </p>
                    </div>
                    :
                    (orderDetail.ProductType === '1' || orderDetail.ProductType === '2') &&
                    <div className="cardType">
                      <div className="detailTitle">
                        {`${orderDetail.ProductType === '1' ? '出库卡密' : '直储卡密'}:`}
                        <div className="titleLeft">
                        </div>
                        {/* <div className="controlTable">
                          <CopyToClipboard
                            text={this.state.copyData}
                            onCopy={() => message.success('复制成功')}
                          >
                            <div className="copyToClipboard">
                              <Icon glyph={icons.copy} /> 复制到剪贴板
                            </div>
                          </CopyToClipboard>
                         <div className="exportToExcel">
                              <Icon glyph={icons.excel} /> 导出excel
                         </div>
                        </div> */}
                      </div>
                      <div>
                        <Table rowKey="Id" columns={columns} dataSource={orderDetail.StockContent ? orderDetail.StockContent.Data : []} size="small" />
                      </div>
                    </div>
                }
              </div>
              <div className="detailRight">
                <div className="orderManage">
                  <div className="detailTitle">
                    订单处理过程
                  <div className="titleLeft"></div>
                  </div>
                  <div>
                    <p><span>操作员：</span><span><i>{orderDetail.Charger}</i></span></p>
                    <p><span>代充帐号：</span><span><i>{orderDetail.ChargeUseAccount}</i></span></p>
                    <p><span>充值描述：</span><span style={{ color: '#bf4346' }}><i>{orderDetail.ChargeDescription}</i></span></p>
                  </div>
                </div>

                <div className="productInfo">
                  <div className="detailTitle">
                    商品信息
                  <div className="titleLeft"></div>
                  </div>
                  <p><span>商品：</span>{orderDetail.SupplierProductName}（{orderDetail.SupplierProductId}）</p>
                  <p><span>面值：</span><span style={{ color: '#bf4346' }}><i>{orderDetail.SupplierProductParvalue}元</i></span></p>
                  {showPriceText === '收起' &&
                    <div>
                      <p><span>售价：</span><span style={{ color: '#bf4346' }}><i>{orderDetail.SupplierProductPrice}元</i></span></p>
                      <p><span>商品类型：</span><span>{this.getProductType(orderDetail.ProductType)}</span></p>
                    </div>
                  }
                  <a className="showPrice" onClick={this.showPrice}>{showPriceText}</a>
                </div>
              </div>
            </div>
          </Spin>
        </Modal>
      </div >
    );
  }
}
export default createForm()(ShowDetailComponent);
