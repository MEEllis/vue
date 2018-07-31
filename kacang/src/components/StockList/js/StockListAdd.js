import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Spin, message, Modal } from 'antd';
import FL from '../../../utils/FL';
import '../../CardType/less/cardType.less';

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

class StockListAdd extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    addStockAccountResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    hideImportModal: PropTypes.func.isRequired,
    refreshStockList: PropTypes.func.isRequired
  }
  static defaultProps = {
    addStockAccountResult: undefined
  }
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.addStockAccountResult !== props.addStockAccountResult &&
      nextProps.addStockAccountResult.Status === 200) {
      props.hideImportModal();
      props.refreshStockList();
    }
  }

  postData = () => {
    const { props } = this;
    if (!props.stock) {
      return false;
    }
    props.form.validateFields((err, value) => {
      if (err) {
        return false;
      }
      const postData = {
        StockId: props.stock.Id,
        RechargeUserName: value.Username,
        RechargePassword: value.Password,
        Price: value.Price,
        Sort: value.Sequence,
        QueryUserName: value.Guestname,
        QueryPassword: value.Guestpwd,
        Supplier: value.Supplier,
      };
      props.addStockAccount(postData);
    });
  }


  render() {
    const { props } = this;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    };
    return (
      <span>
        <Modal
          key={props.stock.Id}
          title={`${props.stock.stockName} 添加新账号`}
          visible
          onCancel={() => { props.hideImportModal(); }}
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
                  initialValue: props.stock.Id,
                  disabled: true
                })(
                  <Select id="select" size="large" disabled>
                    <Option value={props.stock.Id}>{props.stock.Name}</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="直储帐号用户名"
              >
                {getFieldDecorator('Username', {
                  rules: [{ required: true, message: '请输入直储帐号用户名' }],
                  initialValue: ''
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
                  initialValue: ''
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
                    { required: true, message: '请输入进货价格' },
                    {
                      pattern: /^\d+(?=\.{0,1}\d+$|$)/,
                      message: '进货价格只能输入数字，请重新输入'
                    }
                  ],
                  initialValue: ''
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
                  initialValue: ''
                })(
                  <Input type="number" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="查询账号用户名"
              >
                {getFieldDecorator('Guestname', {
                  initialValue: ''
                })(
                  <Input />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="查询账号密码"
              >
                {getFieldDecorator('Guestpwd', {
                  initialValue: ''
                })(
                  <Input type="PassWord" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="供应商名称"
              >
                {getFieldDecorator('Supplier', {
                  initialValue: ''
                })(
                  <Input />
                  )}
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default createForm()(StockListAdd);
