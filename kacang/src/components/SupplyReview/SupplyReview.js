import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Col, Row, Tabs, Modal, Tooltip, Form, Button, Select } from 'antd';
import { A } from '../Auth/js/Auth';
import Icon, * as icon from '../../components/Icon/js/Icon';
import SearchForm from '../SearchForm';
import tableColumns from '../../config/tableColumns';
import tablePagenation from '../../config/tablePagenation';
import '../CardType/less/cardType.less';
import './less/supplyReview.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const createForm = Form.create;

class SupplyReview extends React.Component {

  static contextTypes = {
    pageSize: PropTypes.number
  };

  static propTypes = {
    isfetching: PropTypes.bool,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    getList: PropTypes.func.isRequired,
    allowSupply: PropTypes.func.isRequired,
    denySupply: PropTypes.func.isRequired,
    stasticPurchaseApplyAudit: PropTypes.func.isRequired,
    stasticPurchaseApplyAuditResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getListResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    allowSupplyResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    denySupplyResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    })
  }

  static defaultProps = {
    isfetching: true,
    getListResult: undefined,
    allowSupplyResult: undefined,
    denySupplyResult: undefined,
  }

  constructor(props, context) {
    super(props);

    this.state = {
      pageNumber: 1,
      total: 0,
      dataSource: [],
      condition: {},
      pageSize: context.pageSize,
      checkModal: false,
      checkInfo: {},
      checkStatus: '1',
      // 保存数量
      subCount: {
        TotalCount: 0,
        VerifyCount: 0,
        AgreeCount: 0,
        AbortAcount: 0
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { getListResult, allowSupplyResult, denySupplyResult, stasticPurchaseApplyAuditResult } = nextProps;
    let { subCount } = this.state;
    if (this.props.getListResult !== getListResult) {
      if (getListResult.Status === 200) {
        this.setState({
          total: getListResult.Total,
          pageSize: getListResult.PageSize,
          dataSource: getListResult.Data
        });
      }
    }
    if (this.props.stasticPurchaseApplyAuditResult !== stasticPurchaseApplyAuditResult) {
      if (stasticPurchaseApplyAuditResult.Status === 200) {
        subCount = stasticPurchaseApplyAuditResult.Data;
        this.setState({
          subCount
        });
      }
    }
    if (this.props.allowSupplyResult !== allowSupplyResult) {
      if (allowSupplyResult.Status === 200) {
        this.setState({
          checkModal: false
        });
        this.getData();
      }
    }
    if (this.props.denySupplyResult !== denySupplyResult) {
      if (denySupplyResult.Status === 200) {
        this.setState({
          checkModal: false
        });
        this.getData();
      }
    }
  }
  onChange = (value) => {
    const condition = this.state.condition;
    for (const key in value) {
      condition[key] = value[key].value;
    }
    this.setState({ condition });
  }
  getStatus = (text) => {
    let nowStatus = '';
    let color = '';
    switch (text) {
      case 1:
        nowStatus = '待审核';
        color = '#FF6100';
        return <span style={{ color }}>{nowStatus}</span>;
      case 2:
        nowStatus = '正常供货';
        color = 'green';
        return <span style={{ color }}>{nowStatus}</span>;
      case 3:
        color = 'red';
        return (<span style={{ color }}>
          断开供货<Tooltip title="审核拒绝供货">
            <span style={{ marginLeft: 5 }}><Icon glyph={icon.jinggao}></Icon></span>
          </Tooltip></span>);
      case 4:
        color = 'red';
        return (<span style={{ color }}>
          断开供货<Tooltip title="手动停止供货">
            <span style={{ marginLeft: 5 }}><Icon glyph={icon.jinggao}></Icon></span>
          </Tooltip></span>);
      default:
        break;
    }
  }
  getData = (obj) => {
    const { pageNumber, pageSize, condition } = this.state;
    this.props.stasticPurchaseApplyAudit(condition);
    this.props.getList({
      orderBy: 'CreateTime desc',
      pageNumber,
      pageSize,
      ...condition,
      ...obj
    });
  }
  getOper = (supply) => (<div>
    {supply.PurchaseStatus === 4 &&
      <span className="mr15">
        <A
          auth="subAudit"
          authOpts={{
            hint: '继续供货'
          }}
          onClick={() => this.handleAllowClick(supply)}
        >
          <Icon glyph={icon.iAgreePurchase}></Icon>
        </A>
      </span>
    }
    {supply.PurchaseStatus === 3 &&
      ''
    }
    {supply.PurchaseStatus === 2 &&
      <span className="mr15">
        <A
          auth="subAudit"
          authOpts={{
            hint: '停止供货'
          }}
          onClick={() => this.handleDenyClick(supply)}
        >
          <Icon glyph={icon.tingzhigonghuo}></Icon>
        </A>
      </span>
    }
    {supply.PurchaseStatus === 1 &&
      <div><span className="mr15">
        <A
          auth="subAudit"
          authOpts={{
            hint: '审核'
          }}
          onClick={() => this.handleCheck(supply)}
        >
          <Icon glyph={icon.shenhe}></Icon>
        </A>
      </span>
      </div>
    }
  </div>);

  search = (err, values) => {
    if (err) return false;
    values.PurchaseStatus = this.state.condition.PurchaseStatus;
    this.setState({ condition: values, pageNumber: 1 },
      () => { this.getData({ ...values, pageNumber: 1 }); });
  }

  init = (values) => {
    this.getData({ ...values, pageNumber: 1 });
  }
  handleCheck = (supply) => {
    this.setState({
      checkModal: true,
      checkInfo: supply
    });
  }
  handleAllowClick = (supply) => {
    this.props.allowSupply(supply);
  }

  handleDenyClick = (supply) => {
    // 如果是停止供货
    if (supply.PurchaseStatus === 2) {
      confirm({
        title: '停止供货后，进货商将无法继续销售此商品，确定要停止吗？',
        onOk: () => {
          this.props.denySupply(supply);
        }
      });
    } else {
      this.props.denySupply(supply);
    }
  }

  handleStatusChange = (status) => {
    const { condition } = this.state;
    condition.PurchaseStatus = status;
    this.setState({ pageNumber: 1, condition }, () => {
      this.getData({ PurchaseStatus: status });
    });
  }
  handleChange = (value) => {
    this.setState({
      checkStatus: value
    });
  }
  btnOk = () => {
    const { checkStatus, checkInfo } = this.state;
    // 允许供货
    if (checkStatus === '1') {
      this.props.allowSupply(checkInfo);
    }
    // 拒绝供货
    else {
      confirm({
        title: '停止供货后，进货商将无法继续销售此商品，确定要停止吗？',
        onOk: () => {
          this.props.denySupply(checkInfo);
        }
      });
    }
  }
  hideModal = () => {
    this.setState({ checkModal: false });
  }
  render() {
    const { props } = this;

    const { isfetching } = props;
    const columns = tableColumns.supplyReviewColumns(this);
    const pagenation = tablePagenation(this);
    const { checkInfo, checkStatus, subCount } = this.state;
    return (
      <div>
        <Spin spinning={isfetching}>
          <SearchForm name="SupplyReviewList" init={this.init} search={this.search} onChange={this.onChange} />
          <Tabs onChange={this.handleStatusChange} defaultActiveKey="">
            <TabPane tab={`全部(${subCount.TotalCount})`} key="" />
            <TabPane tab={`待审核(${subCount.VerifyCount})`} key="1" />
            <TabPane tab={`正常供货(${subCount.AgreeCount})`} key="2" />
            <TabPane tab={`断开供货(${subCount.AbortAcount})`} key="3" />
          </Tabs>
          <Table
            rowKey="Id"
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={pagenation}
          />
        </Spin>

        <Modal
          title="审核"
          width={400}
          visible={this.state.checkModal}
          footer={null}
          onCancel={this.hideModal}
        >
          <Spin spinning={false}>
            <div className="formName">
              <Form>
                <Row>
                  <Col span={6}>商品类型:</Col>
                  <Col span={18}>{`${checkInfo.ProductName}(${checkInfo.ProductId})`}</Col>
                </Row>
                <Row>
                  <Col span={6}>面值:</Col>
                  <Col span={18}>{checkInfo.FaceValue}</Col>
                </Row>
                <Row>
                  <Col span={6}>售价:</Col>
                  <Col span={6}>{checkInfo.SecretPrice ? <s>{checkInfo.Price}</s> : checkInfo.Price}</Col>
                  <Col span={6}>密价:</Col>
                  <Col span={6}>{checkInfo.SecretPrice}</Col>
                </Row>
                <Row>
                  <Col span={6}>进货商信息:</Col>
                  <Col span={18}>{`${checkInfo.DealerName}(${checkInfo.DealerId})`}</Col>
                </Row>
                <Row>
                  <Col span={6}>审核状态:</Col>
                  <Col span={15}>
                    <Select defaultValue={checkStatus} onChange={this.handleChange}>
                      {/* <Option value="2">手工代充</Option> */}
                      <Select.Option value="1">同意供货</Select.Option>
                      <Select.Option value="2">不同意供货</Select.Option>
                    </Select>
                  </Col>
                </Row>
                <Row className="btnRow">
                  <Button type="primary" onClick={this.btnOk} size="large" span={6}>确定</Button>
                </Row>
              </Form>
            </div>
          </Spin>

        </Modal>

      </div>
    );
  }
}

export default createForm()(SupplyReview);
