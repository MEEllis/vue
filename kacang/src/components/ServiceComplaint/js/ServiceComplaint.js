import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Radio, message, Select } from 'antd';
import { browserHistory } from 'react-router';
import '../less/ServiceComplaint.less';

const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class ServiceComplaint extends React.Component {
  static propTypes = {
    operatorComplaint: PropTypes.func.isRequired,
    operatorWaitcomplaint: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    params: PropTypes.shape({
      cid: PropTypes.string.isRequired,
      oid: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
    }).isRequired,
    complaintDetailResult: PropTypes.shape({
      LaunchComplaintId: PropTypes.string.isRequired
    }),
    operatorComplaintResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    operatorWaitcomplaintResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  }
  static defaultProps = {
    isfetching: true,
    complaintDetailResult: undefined,
    operatorComplaintResult: undefined,
    operatorWaitcomplaintResult: undefined
  };
  constructor(props) {
    super(props);
    const { cid, mode, oid } = this.props.params;
    this.state = {
      value: '',
      cid,
      mode,
      oid,
      radioValue: '退款',
      radioLoad: false,
      refresh: false,
      waitload: false,
      launchcomplaintId: '',
      detailLoad: false,
      showPrice: false,
      confirmDirty: false,
    };
  }
  componentWillMount() {
    const { props } = this;
    props.getOrderDetail({ orderId: this.state.oid });
    if (this.state.mode !== '1') {
      props.complaintDetail({ ComplaintId: this.state.cid });
      this.setState({
        detailLoad: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.complaintDetailResult !== this.props.complaintDetailResult) {
      const Question = nextProps.complaintDetailResult.Question;
      if (Question === '卡密错误或卡密不可用') {
        this.setState({
          radioLoad: true,
        })
      }
      this.setState({
        LaunchComplaintId: nextProps.complaintDetailResult.LaunchComplaintId,
        detailLoad: false,
      });
    }
    if (nextProps.operatorComplaintResult && this.state.refresh) {
      if (nextProps.operatorComplaintResult.Status === 200) {
        setTimeout(() => {
          browserHistory.push('/service/receive');
        }, 1000);
        if (this.state.refresh) {
          // this.props.complaintDetail({
          //   ComplaintId: this.state.cid
          // });
          this.setState({
            refresh: false
          });
        }
      }
    }
    if (nextProps.operatorWaitcomplaintResult && this.state.waitload) {
      if (nextProps.operatorWaitcomplaintResult.Status === 200) {
        setTimeout(() => {
          browserHistory.push('/service/receive');
        }, 1000);
        if (this.state.waitload) {
          // this.props.complaintDetail({
          //   ComplaintId: this.state.cid
          // });
          this.setState({
            waitload: false
          });
        }
      }
    }
  }
  handleSubmit1 = () => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      }
      this.props.operatorComplaint({
        LaunchComplaintId: this.state.LaunchComplaintId,
        Content: value.content,
        IsReturnMoney: value.IsRefundSelect,
        ReturnMoney: value.ReturnMoney,
        OrderNo: this.state.oid
      });
      this.setState({ refresh: true });
    });
  }
  handleSubmit2 = () => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      }
      this.props.operatorWaitcomplaint({
        LaunchComplaintId: this.state.LaunchComplaintId,
        Content: value.content,
        IsReturnMoney: value.IsRefundSelect,
        ReturnMoney: value.ReturnMoney,
        OrderNo: this.state.oid
      });
      this.setState({ waitload: true });
      this.props.form.resetFields();
    });
  }
  handleChange = () => {
    this.setState({
      radioLoad: !this.state.radioLoad,
    });
  }
  handleReset = () => {
    const mode = this.state.mode;
    if (mode === '1') {
      browserHistory.push('/order/detail');
    } else {
      browserHistory.push('/service/receive');
    }
  }
  changePrice = (value) => {
    if (value === '1') {
      this.setState({
        showPrice: true,
      });
    } else {
      this.setState({
        showPrice: false,
      });
    }
  }
  // 匹配两次金额是否相同
  handlePrice = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPrice = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('ReturnMoney')) {
      callback('两次输入金额不一样!');
    } else {
      callback();
    }
  }
  render() {
    const { props } = this;
    const orderDetail = props.orderDetailResult;
    const complaintDetail = props.complaintDetailResult;
    const { mode } = props.params;
    if (!orderDetail) {
      return false;
    }
    const { Question, HopeResult } = complaintDetail;
    const ChatRoot = complaintDetail.ChatRoot || [];
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <div className="showComplaintDiv">
        <div className="showComplaintLeft">
          <div className="showComplaintComponent-top">
            <p><label>客户订单号：</label>{orderDetail.CustomerOrderId}</p>
            <p><label>卡门网订单号：</label>{orderDetail.OrderId}</p>
            <p><label>订单状态：</label><span className="greenFont">{orderDetail.TopupStatus}</span></p>
            <p><label>商品名称/编号：</label>{orderDetail.DealerSiteName}/{orderDetail.DealerSiteId}</p>
            <p><label>商品类型：</label>{orderDetail.ProductType}</p>
          </div>
          <div className="showComplaintComponent-body">
            <Form>
              {
                mode === '1' ?
                  <FormItem {...formItemLayout} label="投诉问题">
                    {getFieldDecorator('Question', {
                      initialValue: '充值成功但实际未到账或者部分到账',
                      rules: [{ required: true, message: '请选择投诉问题' }],
                    })(
                      <Select
                        showSearch
                        onChange={this.handleChange}
                      >
                        <Select.Option value="充值成功但实际未到账或者部分到账">充值成功但实际未到账或者部分到账</Select.Option>
                        <Select.Option value="卡密错误或卡密不可用">卡密错误或卡密不可用</Select.Option>
                      </Select>
                      )}
                  </FormItem>
                  :
                  <FormItem {...formItemLayout} label="投诉问题">
                    {getFieldDecorator('Question', {
                      initialValue: Question,
                      rules: [{ required: true, message: '请选择投诉问题' }],
                    })(
                      <Select allowClear disabled>
                        <Select.Option value="1">1</Select.Option>
                      </Select>
                      )}
                  </FormItem>

              }
              {
                HopeResult === '退款' ?
                  mode === '2' && <FormItem {...formItemLayout} label="是否退款">
                    {getFieldDecorator('IsRefundSelect', {
                      initialValue: '',
                      rules: [{ required: true, message: '请选择是否退款' }],
                    })(
                      <Select onChange={this.changePrice} disabled={mode === '0' ? true : false}>
                        <Select.Option value="">请选择</Select.Option>
                        <Select.Option value="1">是</Select.Option>
                        <Select.Option value="2">否</Select.Option>
                      </Select>

                      )}
                  </FormItem> :
                  mode === '2' && <FormItem {...formItemLayout} label="是否退款" style={{ display: 'none' }}>
                    {getFieldDecorator('IsRefundSelect', {
                      initialValue: '2',
                      rules: [{ required: true, message: '请选择是否退款' }],
                    })(
                      <Select>
                        <Option value="2">否</Option>
                      </Select>
                      )}
                  </FormItem>
              }
              {
                this.state.showPrice &&
                <span>
                  <FormItem {...formItemLayout} label="金额">
                    {getFieldDecorator('ReturnMoney', {
                      initialValue: '',
                      rules: [{ required: true, message: '请输入金额' }],
                    })(
                      <Input type="number" />
                      )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="确认金额">
                    {getFieldDecorator('reReturnMoney', {
                      initialValue: '',
                      rules: [{ required: true, message: '请确认金额' }, { validator: this.checkPrice }],
                    })(
                      <Input type="number" onBlur={this.handlePrice} />
                      )}
                  </FormItem>
                </span>
              }
              {
                mode === '1' ?
                  <FormItem {...formItemLayout} label="希望处理结果">
                    {getFieldDecorator('HopeResult', {
                      initialValue: this.state.radioValue,
                      rules: [{
                        required: true,
                        message: '请选择处理结果'
                      }]
                    })(
                      <RadioGroup onChange={this.onchangeRaio}>
                        <Radio value="退款">退款</Radio>
                        {
                          this.state.radioLoad ? <Radio value="补卡">补卡</Radio> : <Radio value="补充完成">补充完成</Radio>
                        }
                      </RadioGroup>
                      )}
                  </FormItem>
                  :
                  <FormItem {...formItemLayout} label="希望处理结果">
                    {getFieldDecorator('HopeResult', {
                      initialValue: HopeResult,
                      rules: [{
                        required: true,
                        message: '请选择处理结果'
                      }]
                    })(
                      <RadioGroup disabled>
                        <Radio value="退款">退款</Radio>
                        {
                          this.state.radioLoad ? <Radio value="补卡">补卡</Radio> : <Radio value="补充完成">补充完成</Radio>
                        }
                      </RadioGroup>
                      )}
                  </FormItem>
              }
              <FormItem {...formItemLayout} label="内容">
                {getFieldDecorator('content', {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请输入内容'
                  }],
                })(
                  <Input
                    type="textarea"
                    rows={4}
                    maxLength="250"
                    disabled={
                      this.state.mode === '0' && true
                    }
                  />
                  )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={
                    this.state.mode === '0' && true
                  }
                  onClick={this.handleSubmit1}
                >处理</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={
                    this.state.mode === '0' && true
                  }
                  onClick={this.handleSubmit2}
                  style={{ marginLeft: 8 }}
                >投诉待查</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>返回</Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <div className="showComplaintRight">
          {
            mode !== '1' ?
              <div>
                {
                  ChatRoot && ChatRoot.length > 0 &&
                  <h2>投诉：{Question}&nbsp;&nbsp;&nbsp;&nbsp;希望处理结果：{HopeResult}</h2>
                }
                {
                  ChatRoot && ChatRoot.length > 0 && ChatRoot.map((dataitem, index) => {
                    return (
                      <div className="complaintList" key={index}>
                        {
                          dataitem && dataitem.length > 0 && dataitem.map((item, i) => {
                            return (
                              <div className={item.ComplainantType == '0' ? 'talk-in' : 'talk-out'} key={i}>
                                <p className={item.ComplainantType == '1' && 'nameTime'} >{item.ComplainantType == '0' ? item.DealerSiteName + ' (' + item.DealerSiteId + ')' : item.SupplierSiteName + '(' + item.SupplierSiteId + ')'}
                                  <span style={{ marginLeft: 15 }}>{item.CreateDate}</span>
                                </p>
                                <div className={item.ComplainantType == '0' ? 'messageCon' : 'messageRight messageCon'}>
                                  <span className={item.ComplainantType == '0' ? 'talk-message talk-message-me' : 'talk-message talk-message-p'}>{item.Content}</span>
                                </div>
                              </div>);
                          })}
                      </div>
                    );
                  })
                }
              </div>
              : ''
          }
        </div>
      </div>
    );
  }
}
export default createForm()(ServiceComplaint);
