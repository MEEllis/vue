import React from 'react';
import { Form, Input, Select, Switch, Row, Col, Button, Table, Spin, Modal, message, Steps, DatePicker } from 'antd';
import { dateFormat } from '../../../utils';
import PropTypes from 'prop-types';
// import { DatePicker } from 'react-component-date';
import moment from 'moment';
import FL from '../../../utils/FL';
import '../../CardType/less/cardType.less';

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;
const Step = Steps.Step;

class StockListAdd extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    currentStock: PropTypes.shape({
      Id: PropTypes.string,
      Name: PropTypes.string,
      Region: PropTypes.string,
      FaceValue: PropTypes.number,
    }),
    getPreviewPwdCard: PropTypes.func.isRequired,
    createPasswordCardResult: PropTypes.shape({ Status: PropTypes.number.isRequired }),
    getPreviewPwdCardResult: PropTypes.shape({ Status: PropTypes.number.isRequired }),
    importPwdCardResult: PropTypes.shape({ Status: PropTypes.number.isRequired }),
    hidePwdCardModal: PropTypes.func.isRequired,
    refreshStockList: PropTypes.func.isRequired,
  };
  static defaultProps = {
    currentStock: undefined,
    getPreviewPwdCard: undefined,
    createPasswordCardResult: undefined,
    getPreviewPwdCardResult: undefined,
    importPwdCardResult: undefined,
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      PostData: {
        condition: {
          PageIndex: 1,
          PageNumber: 1,
          PageSize: 5
        }
      },
      dataSource: [],
      batchCode: '',
      pwdLists: [],
      cardInfo: [],
      current: 0,
      getPreview: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    // 创建预览卡密成功,请求预览卡密接口
    const createPwdCard = nextProps.createPasswordCardResult;
    if (createPwdCard !== props.createPasswordCardResult && createPwdCard.Status === 200) {
      const postData = {
        BatchCode: createPwdCard.Data.BatchCode,
        StockId: nextProps.currentStock.Id,
      };
      props.getPreviewPwdCard(postData);
      this.setState({
        current: 1,
        getPreview: false,
        BatchCode: createPwdCard.Data.BatchCode,
      });
    }
    // 请求预览卡密成功,处理返回数据
    const previewPwdCard = nextProps.getPreviewPwdCardResult;
    if (previewPwdCard && previewPwdCard.Status === 200) {
      if (previewPwdCard.Data) {
        const pwdListsData = previewPwdCard.Data.Cards;
        const pwdListsNumber = [];
        const sameAccount = [];
        const userArr = [];
        const pwdArr = [];
        pwdListsData.map((value, index) => {
          for (let i = 0, len = pwdArr.length - 1; i <= len; i++) {
            // 卡号 或者 卡密 相同则标记这条记录
            if ((value.CardNumber !== '' && userArr[i] === value.CardNumber) ||
              pwdArr[i] === value.Password) {
              this.setState({ isRepetition: true });
              sameAccount.isSame = true;
              pwdListsData[i].isSame = true;
              break;
            } else {
              sameAccount.isSame = false;
            }
          }
          userArr.push(value.CardNumber);
          pwdArr.push(value.Password);
          // 添加编号
          pwdListsNumber.index = index + 1;
          Object.assign(value, pwdListsNumber, sameAccount);
        });
        this.setState({ pwdLists: previewPwdCard.Data, });
      }
    }
    // 导入卡密成功
    if (nextProps.importPwdCardResult !== props.importPwdCardResult
      && nextProps.importPwdCardResult.Status === 200) {
      props.hidePwdCardModal();
      props.refreshStockList();
      this.setState({ current: 2, isRepetition: false });
    }
  }

  createPwdCard = () => {
    const { props } = this;
    const currentStock = this.props.currentStock;
    if (this.state.current === 0) {
      // 提交卡密信息
      this.props.form.validateFields((err, value) => {
        if (err) {
          return false;
        }
        const postData = {
          StockId: currentStock.Id,
          Cards: value.Cardlist,
          IsHasNumber: value.Hasnumber,
          Isprior: value.Isprior,
          Price: value.PurchaseValue,
          Expire: dateFormat(value.Expiredate),
          Supplier: value.Supplier,
          Remark: value.Remark,
          Zone: value.Region,
          FaceValue: value.Facevalue,
        };
        props.createPasswordCard(postData);
        return false;
      });
    } else if (this.state.current === 1) {
      if (this.state.isRepetition) {
        message.error('重复卡密不能导入!');
        return false;
      }
      const postData = {
        stockId: currentStock.Id,
        BatchCode: this.state.BatchCode,
      };
      props.importPwdCard(postData);
      return false;
    } else { return false; }
  }

  closeModal = () => {
    if (this.state.current === 0) {
      this.props.hidePwdCardModal();
    } else {
      const { pwdLists } = this.state;
      pwdLists.Cards = [];
      const current = this.state.current - 1;
      this.setState({ current, pwdLists, isRepetition: false });
    }
  }
  render() {
    const { props } = this;
    const { getFieldDecorator } = this.props.form;
    const currentStock = this.props.currentStock;
    const { current } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    };
    const beginTime = moment().add(1, 'y').format('YYYY-MM-DD 00:00:00');
    const columnsList = [
      {
        title: '编号',
        // dataIndex: 'index',
        render: data => (
          <div style={{ color: data.isSame ? 'red' : 'black' }}>{data.index}</div>
        )
      }, {
        title: '卡号',
        // dataIndex: 'CardNumber',
        render: data => (
          <div style={{ color: data.isSame ? 'red' : 'black' }}>{data.CardNumber}</div>
        )
      }, {
        title: '密码',
        // dataIndex: 'Password',
        render: data => (
          <div style={{ color: data.isSame ? 'red' : 'black' }}>{data.Password}</div>
        )
      }
    ];

    const today = new Date();
    today.setYear(today.getFullYear() + 1);
    const steps = [
      {
        title: '输入卡密信息',
        content: <Form style={{ marginBottom: 10, display: current === 0 ? 'block' : 'none' }}>
          <FormItem
            {...formItemLayout}
            label="库存归属"
          >
            {getFieldDecorator('StockId', {
              initialValue: currentStock.Id,
              disabled: true
            })(
              <Select id="select" size="large" disabled>
                <Option value={currentStock.Id} >{currentStock.Name}</Option>
                {/* {
                   stockList.map((list, index)=>{
                    return <Option key={index} value={list.Id}>{list.Name}</Option>
                   })
                } */}
              </Select>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="有无卡号">
            {getFieldDecorator('Hasnumber', {
              initialValue: 'true'
            })(
              <Select id="select" size="large">
                <Option value={'true'}>有卡号</Option>
                <Option value={'false'}>无卡号</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否优先取卡"
          >
            {getFieldDecorator('Isprior', {
              initialValue: false,
              valuePropName: 'checked'
            })(
              <Switch />
              )}
          </FormItem>
          <FormItem
            {...{
              labelCol: { span: 4 },
              wrapperCol: { span: 18 },
            }}
            label="卡密"
          >
            <Row gutter={12}>
              <Col span={16}>
                {getFieldDecorator('Cardlist', {
                  rules: [
                    {
                      required: true,
                      message: '请输入卡密'
                    }
                  ],
                  initialValue: ''
                })(<Input type="textarea" rows={8} />)}
              </Col>
              <Col span={8}>
                <div style={{ lineHeight: '1.5em' }}>
                  <h4>有卡号类型格式如下：</h4>
                  <p>1.卡号 密码（卡号+空格+密码）</p>
                  <p>2.卡号,密码（卡号+逗号+密码）</p>
                  <p className="mb10">以上2种格式均可，一行一张卡密。</p>
                  <h4>无卡号类型格式如下：</h4>
                  <p>卡密1</p>
                  <p>卡密2</p>
                  <p>一行一张卡密，开头不留空格。</p>
                </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="所属区域">
            {getFieldDecorator('Region', {
              initialValue: currentStock.Region || '全国'
            })(
              <Select id="select" size="large">
                {FL.REGION.map((list, index) => {
                  return <Option key={index} value={list.value}>{list.name}</Option>;
                }
                )}
              </Select>
              )}
          </FormItem>

          <FormItem {...formItemLayout} label="面值">
            {getFieldDecorator('Facevalue', {
              rules: [
                {
                  required: true,
                  message: '请输入面值'
                }
              ],
              initialValue: currentStock.FaceValue
            })(
              <Input disabled />
              )}
          </FormItem>

          <FormItem {...formItemLayout} label="有效期至">
            {getFieldDecorator('Expiredate', {
              initialValue: moment(beginTime)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="进货价格"
          >
            {getFieldDecorator('PurchaseValue', {
              rules: [
                { required: true, message: '请输入进货价格' },
                {
                  pattern: /^\d+(?=\.{0,1}\d+$|$)/,
                  message: '进货价格只能输入数字，请重新输入'
                }],
              initialValue: ''
            })(
              <Input />
              )}
          </FormItem>

          <FormItem {...formItemLayout} label="供应商名称">
            {getFieldDecorator('Supplier', { initialValue: '' })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('Remark', { initialValue: '' })(<Input />)}
          </FormItem>

        </Form>
      }, {
        title: '生成预览',
        content: <div className="modal-demo-content" style={{ display: current === 1 ? 'block' : 'none' }}>
          <Row gutter={12} className="mb20">
            <Col span={6}>
              共导入卡密：{this.state.pwdLists.CardCount}张
            </Col>
            <Col span={6}>
              导入库存：{this.state.pwdLists.StockName}
            </Col>
            <Col span={6}>
              面值：{this.state.pwdLists.FaceValue}元
            </Col>
            <Col span={6}>
              供应商：{this.state.pwdLists.Supplier}
            </Col>
          </Row>
          <Table rowKey="index" columns={columnsList} dataSource={this.state.pwdLists.Cards} />
        </div>
      }, {
        title: '', content: ''
      }
    ];

    return (
      <span>
        <Modal
          title={`${this.props.currentStock.Name} 导卡密`}
          visible
          width="80%"
          onCancel={() => {
            props.hidePwdCardModal();
          }}
          footer={[
            <Button key="back" type="default" size="large" onClick={this.closeModal} >
              {this.state.current === 0 ? '关闭' : '返回'}
            </Button>,
            <Button key="button" type="primary" size="large" onClick={this.createPwdCard}>
              {this.state.current === 0 ? '下一步' : '提交'}
            </Button>,
          ]}
        >
          <Spin spinning={false}>
            <div>
              <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
              </Steps>
              <div className="steps-content mt20">
                {steps[0].content}
                {steps[1].content}
              </div>
            </div>
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default createForm()(StockListAdd);
