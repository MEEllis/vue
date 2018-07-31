import React from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';

// import '../less/Withdrawal.less';

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

class WithDraw extends React.Component {
  static propTypes = {
  };
  static defaultProps = {
  };
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.applyWithDrawResult !== props.applyWithDrawResult &&
      nextProps.applyWithDrawResult.Status === 200) {
      props.getWithDrawPage();
      props.hideApplyWithDraw();
    }
  }
  handleSubmit = () => {
    const { props } = this;
    props.form.validateFields((err, value) => {
      if (err) {
        return false;
      }
      const postData = {
        WType: value.WType,
        Account: value.Account,
        NickName: value.NickName,
        BankName: value.BankName,
        Amount: value.Amount,
        Remark: value.Remark,
      };
      props.applyWithDraw(postData);
    });
  }
  render() {
    const { props } = this;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    return (
      <div className="withdrawal">
        <Modal
          onCancel={() => { props.hideApplyWithDraw(); }}
          title="申请提现"
          visible
          width="500px"
          footer={null}
        >
          <Form
            style={{ width: '80%', margin: '0 auto' }}
            onSubmit={this.handleSubmit}
          >
            <FormItem
              {...formItemLayout}
              label="可提现金额"
            >
              <span className="Price">{this.props.ammount}元</span>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="提现金额"
              hasFeedback
            >
              {getFieldDecorator('Amount', {
                rules: [
                  { required: true, message: '请输入提现金额' },
                  {
                    pattern: /^\d+(?=\.{0,1}\d+$|$)/,
                    message: '提现金额只能输入数字，请重新输入'
                  }
                ],
              })(
                <Input placeholder="请输入提现金额" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="提现方式"
              hasFeedback
            >
              {getFieldDecorator('WType', {
                rules: [{ required: true, message: '请输入提现方式' }],
              })(
                <Input placeholder="请输入提现方式" />
                // <Select>
                //   <Option value="">请选择提现方式</Option>
                // </Select>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="收款账号"
              hasFeedback
            >
              {getFieldDecorator('Account', {
                rules: [{ required: true, message: '请输入收款账号' }],
              })(
                <Input placeholder="请输入收款账号" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="收款人姓名"
              hasFeedback
            >
              {getFieldDecorator('NickName', {
                rules: [{ required: true, message: '请输入收款人姓名' }],
              })(
                <Input placeholder="请输入收款人姓名" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="开户行名称"
              hasFeedback
            >
              {getFieldDecorator('BankName', {
                rules: [{ required: true, message: '请输入开户行名称' }],
              })(
                <Input placeholder="请输入开户行名称" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="提现描述"
              hasFeedback
            >
              {getFieldDecorator('Remark', {
                rules: [{ required: true, message: '请输入提现描述' }],
              })(
                <Input placeholder="请输入提现描述" />
                )}
            </FormItem>
            <FormItem style={{ width: 200, margin: '0 auto' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => { this.handleSubmit(); }}
              >
                申请提现
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default createForm()(WithDraw);
