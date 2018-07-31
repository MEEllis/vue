import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { RangePicker } from 'react-component-date';
import { Form, Input, Table, Col, Row, Select, Button, Alert, Spin } from 'antd';
import { A } from '../../../components/Auth/js/Auth';
import ShowDetailComponent from '../../../containers/ShowDetailComponent';
import FL from '../../../utils/FL';
import '../../FinanceDetail/less/financeDetail.less';
import { dateFormat } from '../../../utils';


const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

const beginTime = moment().format('YYYY-MM-DD 00:00:00');
const endTime = moment().format('YYYY-MM-DD 23:59:59');

class FinanceDetail extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    isfetching: PropTypes.bool,
    getStatisticsResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    financedetail: PropTypes.func.isRequired
  }
  static defaultProps = {
    isfetching: true,
    getStatisticsResult: undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        PageNumber: 1,
        PageSize: 10,
        TradeNo: '',
        BeginTime: beginTime,
        EndTime: endTime,
        PrimaryType: '',
        ChildType: '',
      },
      detailModal: false,
      // 以下是就代码
      transactionType: '',
      leverTwoShow: '',
      tradeChildType: '', // 传值给后端
      tradeNo: '',
      tradePrimaryType: '',
      pageIndex: 1,
      pageSize: 10,
      //  startTime:startTime,
      //  endTime:endTime,//传值给后端
      listForm: FL.LINK.FINANCEDETAIL,
      children: [],
      initialValue: '',
      primaryValue: '全部',
      showAll: true,
      title: '',
      childTitle: '',
      index: '',
      primaryIndex: null,
      childIndex: null,
      isShowDetail: false,
    };
  }
  componentWillMount() {
    const { props } = this;
    this.getData();
    props.getStatistics(this.state.postData);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { getStatisticsResult } = nextProps;
    // 统计数据
    if (getStatisticsResult !== props.getStatisticsResult && getStatisticsResult.Status === 200) {
      const Statistics = getStatisticsResult.Data;
      let StatisticsResult = '';
      let child = '';
      // const listForm = this.state.listForm.transactionType;
      Statistics.map((value) => {
        if (Statistics) {
          const ChildType = value.ChildType;
          switch (ChildType) {
            case 1: child = '供货收入'; break;
            case 2: child = '退单收入'; break;
            case 3: child = '退款收入'; break;
            case 4: child = '淘宝加款'; break;
            case 5: child = '接口加款'; break;
            case 6: child = '手工加款'; break;
            case 7: child = '提现撤销'; break;
            case 8: child = '手续费撤销'; break;
            case 9: child = '进货支出'; break;
            case 10: child = '退款支出'; break;
            case 11: child = '技术服务费支出'; break;
            case 12: child = '手工扣款'; break;
            case 13: child = '提现支出'; break;
            case 14: child = '退单收入'; break;
            case 15: child = '订单冻结'; break;
            case 16: child = '保证金冻结'; break;
            case 17: child = '淘宝加款冻结'; break;
            case 18: child = '订单解冻'; break;
            case 19: child = '保证金解冻'; break;
            case 20: child = '淘宝加款解冻'; break;
            case 21: child = '手工冻结'; break;
            case 23: child = '手工解冻'; break;
            default: child = '全部';
          }
          const item = `共有${value.Total}笔  ${child}项 , 共${value.Amount}元 ; `;
          StatisticsResult += item;
        }
      });
      this.setState({ StatisticsResult });
    }
  }
  onFocus = () => {
    this.setState({
      listForm: FL.LINK.FINANCEDETAIL
    });
  }
  getData = () => {
    this.props.financedetail(this.state.postData);
  }
  handlesubmits = () => {
    const { props } = this;
    props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      const { postData } = this.state;
      postData.PageNumber = 1;
      // 如果用户选择了时间
      let changeBeginTime = this.state.BeginTime;
      let changeEndTime = this.state.EndTime;
      if (value.exchangeTime) {
        changeBeginTime = dateFormat(value.exchangeTime[0]._d);
        changeEndTime = dateFormat(value.exchangeTime[1]._d);
      }
      const postDataInfo = {
        BeginTime: changeBeginTime,
        EndTime: changeEndTime,
        TradeNo: value.orderNumber || '',
        PrimaryType: this.state.primaryIndex === 0 ? null : this.state.primaryIndex,
        ChildType: value.tradeChildType ? value.tradeChildType[1] : null,
      };
      Object.assign(postData, postDataInfo);
      this.setState({ postData }, () => {
        this.getData();
        props.getStatistics(postData);
      });
    });
  }
  handleReset = () => {
    this.setState({
      children: [],
      listForm: { transactionType: [] }
    });
    this.props.form.resetFields();
  }
  ParentChange = (value) => {
    const { listForm } = this.state;
    this.setState({
      children: []
    });
    this.props.form.setFieldsValue({
      tradeChildType: ''
    });
    for (let i = 0; i < listForm.transactionType.length; i += 1) {
      if (listForm.transactionType[i].key === value[1] && value[1] !== 0) {
        this.setState({
          children: listForm.transactionType[i].children,
        });
      }
    }
    this.setState({
      primaryValue: value[0],
      primaryIndex: value[1],
      childIndex: null
    });
  }
  // 查看明细
  showFinanceDetail = (detail) => {
    this.setState({ detailData: detail, detailModal: true });
  }
  hideDetailModal = () => { this.setState({ detailModal: false }); }
  handleDetailClick = (item) => {
    this.setState({ isShowDetail: true, currentOrder: item });
  }
  handleHideDetailClick = () => {
    this.setState({ isShowDetail: false });
  }
  render() {
    const { props } = this;
    const { isfetching } = props;
    const listForm = this.state.listForm;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
    const columns = [
      {
        title: '财务订单号',
        width: '160px',
        dataIndex: 'Id',
      }, {
        title: '交易类型',
        width: '10%',
        dataIndex: 'ChildTypeName'
      }, {
        title: '订单编号',
        width: '160px',
        dataIndex: 'TradeNo',
        render: (text, record) => {
          if (record.ChildTypeName === '进货支出' || record.ChildTypeName === '退款收入' || record.ChildTypeName === '退单收入' || record.ChildTypeName === '退款支出' || record.ChildTypeName === '供货收入') {
            return (<A
              auth="financeViewDetail"
              authOpts={{
                hint: ''
              }}
              onClick={() => { this.handleDetailClick(record); }}
            >
              {record.TradeNo}
            </A>);
          }
          return record.TradeNo;
        }
      }, {
        title: '交易前金额',
        width: '12%',
        dataIndex: 'BeforeAmount'
      }, {
        title: '交易金额',
        width: '12%',
        dataIndex: 'Amount',
        render: (text, record) =>
          (<span>{record.Mark === 1 ? '+' : '-'} {text}</span>)
      }, {
        title: '交易后金额',
        width: '12%',
        dataIndex: 'AfterAmount'
      }, {
        title: '交易时间',
        width: '220px',
        dataIndex: 'TradeTime',
        render: (text) => (dateFormat(text))
      },
    ];

    let dataSource = [];
    let Total = '';
    const Result = props.financedetailResult;
    if (Result) {
      dataSource = props.financedetailResult.Data;
      Total = props.financedetailResult.Total;
    }

    const { children } = this.state;
    const pagination = {
      total: Total,
      showSizeChanger: true,
      pageSize: this.state.postData.PageSize,
      current: this.state.postData.PageNumber,
      onShowSizeChange: (current, pageSize) => {
        const { postData } = this.state;
        postData.PageNumber = current;
        postData.PageSize = pageSize;
        this.setState({ postData }, () => {
          this.getData();
        });
      },
      onChange: (current, pageSize) => {
        const { postData } = this.state;
        postData.PageNumber = current;
        postData.PageSize = pageSize;
        this.setState({ postData }, () => {
          this.getData();
        });
      }
    };
    // 统计结果

    const StatisticsResult = this.state.StatisticsResult;

    const { detailData, isShowDetail, currentOrder } = this.state;
    return (
      <div>
        {detailData &&
          <ShowDetailComponent
            hideDetailModal={this.hideDetailModal}
            detailData={detailData}
          />
        }
        <Spin spinning={isfetching}>
          <div style={{ marginBottom: '15px' }}>
            <Form className="searchdiv" onSubmit={this.handleSearch} >
              <Row gutter={40}>
                <Col span={5} key={1} >
                  <FormItem
                    {...formItemLayout}
                    label={'订单编号'}
                  >
                    {getFieldDecorator('orderNumber')(
                      <Input type="text" autoComplete="off" size="default" />
                    )}
                  </FormItem>
                </Col>
                <Col span={9} key={2} >
                  <FormItem
                    {...formItemLayout}
                    label={'交易时间'}
                  >
                    {getFieldDecorator('exchangeTime',
                      {
                        initialValue: [
                          moment(beginTime),
                          moment(endTime)
                        ]
                      })(
                      <RangePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
                      />
                      )}
                  </FormItem>
                </Col>
                <Col span={5} key={3} >
                  <FormItem
                    {...formItemLayout}
                    label={'交易类型'}
                  >
                    {getFieldDecorator('tradePrimaryType', { initialValue: ['全部', '0'] })(
                      <Select onChange={this.ParentChange} onFocus={this.onFocus}>
                        {
                          listForm.transactionType.map((list) =>
                            (
                              <Option value={[list.title, list.key]} key={list.key}>
                                {list.title}
                              </Option>
                            )
                          )
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={5} key={4}>
                  <FormItem wrapperCol={{ span: 18 }} >
                    {/* {initialValue:this.state.initialValue} */}
                    {getFieldDecorator('tradeChildType', { initialValue: ['全部', ''] })(
                      <Select size="large" >
                        {
                          children.map((list) => (
                            <Option
                              value={[list.title, list.indexStatus]}
                              key={list.indexStatus}
                            >
                              {list.title}
                            </Option>
                          )
                          )
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit" onClick={this.handlesubmits}>搜索</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Table rowKey="Id" columns={columns} dataSource={dataSource || []} pagination={pagination} />
        </Spin>
        <Alert
          message="查询结果:"
          description={StatisticsResult}
          type="info"
          style={{ marginTop: '10px', clear: 'both', float: 'left', width: '100%' }}
        />
        {isShowDetail &&
          <ShowDetailComponent
            orderId={currentOrder.TradeNo}
            close={this.handleHideDetailClick}
          />
        }
      </div>
    );
  }
}

export default createForm()(FinanceDetail);
