import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Spin, message, Modal } from 'antd';
import '../../CardType/less/cardType.less';

const FormItem = Form.Item;
const Option = Select.Option;

class UpdatePrepaidCardInfo extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    currentStock: PropTypes.shape({
      StockId: PropTypes.string.isRequired,
      PageNumber: PropTypes.number,
    }),
    updatePrepaidCard: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    updatePrepaidCardResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getStockAccount: PropTypes.func
  }
  static defaultProps = {
    currentStock: undefined,
    updatePrepaidCardResult: undefined,
    getStockAccount: () => { }
  }
  constructor(props) {
    super(props);
    this.state = {
      stock: props.currentStock,
      modalVisibleDaozhanghao: false,
      stockType: ['卡密', '在线'],
      stockTypeVal: '卡密',
      selectedRows: [],
      PostData: {
        condition: {
          PageIndex: 1,
          PageNumber: 1,
          PageSize: 5,
        }
      },
      dataSource: [],
      enablesecret: false,
      reload: false,
      ieditData: {
        UserName: '',
        PassWord: '',
        Region: '',
        Price: '',
        Sequence: '',
        Guestname: '',
        Guestpwd: '',
        Supplier: '',
        SecretCard: '',
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { updatePrepaidCardResult } = nextProps;
    if (updatePrepaidCardResult !== props.updatePrepaidCardResult) {
      if (updatePrepaidCardResult.Status === 200) {
        props.close();

        props.getStockAccount({
          StockId: this.props.currentStock.StockId,
          PageNumber: this.props.currentStock.PageNumber
        });
      }
    }
  }

  postData = () => {
    if (!this.props.currentStock) {
      return false;
    }
    const locationData = this.props.currentStock;
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      }
      const postData = {
        Id: locationData.Id,
        RechargeUserName: value.Username,
        RechargePassword: value.Password,
        Price: value.Price,
        Sort: value.Sequence,
        QueryUserName: value.Guestname,
        QueryPassword: value.Guestpwd,
        IsNeedSecretCard: value.Enablesecret,
        Supplier: value.Supplier,
      };
      this.props.updatePrepaidCard(postData);
      this.setState({ reload: true });
      return false;
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { props } = this;
    const StockName = `${props.currentStock.StockName} ${props.currentStock.StockId}`;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    };
    return (
      <span>
        <Modal
          key={props.currentStock.Id}
          title={`${StockName} 修改直储账号`}
          visible
          onCancel={() => { props.close(); }}
          onOk={this.postData}
          okText="提交"
          cancelText="关闭"
        >
          <Spin spinning={false}>
            <Form style={{ marginBottom: 10 }}>
              <FormItem
                {...formItemLayout}
                label="选择库存归属"
              >
                {getFieldDecorator('StockId', {
                  initialValue: props.currentStock.Id
                })(
                  <Select size="large" disabled>
                    <Option value={props.currentStock.Id}>{props.currentStock.StockName}</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="直储帐号用户名"
              >
                {getFieldDecorator('Username', {
                  rules: [{ required: true, message: '请输入直储帐号用户名' }],
                  initialValue: props.currentStock.RechargeUserName
                })(
                  <Input />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="直储帐号密码"
              >
                {getFieldDecorator('Password', {
                  rules: [{ required: true, message: '请输入直储帐号密码' }],
                  initialValue: props.currentStock.RechargePassword
                })(
                  <Input type="PassWord" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="进货价格"
              >
                {getFieldDecorator('Price', {
                  rules: [
                    { required: true, message: '请输入价格' },
                    {
                      pattern: /^\d+(?=\.{0,1}\d+$|$)/,
                      message: '进货价格只能输入数字，请重新输入'
                    }],
                  initialValue: props.currentStock.Price
                })(
                  <Input type="number" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="调用顺序"
              >
                {getFieldDecorator('Sequence', {
                  rules: [
                    { required: true, message: '请输入调用顺序' },
                    {
                      pattern: /^[1-9]\d*$/,
                      message: '调用顺序只能输入数字，请重新输入'
                    }
                  ],
                  initialValue: props.currentStock.Sort
                })(<Input type="number" />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="查询账号用户名"
              >
                {getFieldDecorator('Guestname', {
                  rules: [{ required: true, message: '请输入查询账号用户名' }],
                  initialValue: props.currentStock.RechargeUserName
                })(<Input />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="查询账号密码"
              >
                {getFieldDecorator('Guestpwd', {
                  rules: [{ required: true, message: '请输入查询账号密码' }],
                  initialValue: props.currentStock.RechargePassword
                })(<Input type="PassWord" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="供应商名称"
              >
                {getFieldDecorator('Supplier', {
                  initialValue: props.currentStock.Supplier
                })(<Input />)}
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UpdatePrepaidCardInfo);
