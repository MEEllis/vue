import React,{ Component } from 'react'
import { Form, Input, Select, Button } from 'antd';

import '../less/Withdrawal.less';

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

class Withdrawal extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('提现啦！');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        lg: { span: 4 },
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        lg: { span: 10 },
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        lg: {
          span: 4,
          offset: 4,
        },
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
    return (
      <div className="withdrawal">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="可提现金额"
          >
            <span className="Price">674元</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提现结算规则"
          >
            <span>10:00之前提现10:00~10:30结算，10:00~15:00提现15:00~15:30结算，15:00~18:00提现18:00~18:30结算，18:00~21:00提现20:30~21:00结算，21:00之后提现次日10:00~10:30处理；
每天最多可提交4次提现申请，最低不可低于1000元。</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提现金额"
            hasFeedback
          >
            {getFieldDecorator('raisedBalance', {
              rules: [{required: true, message: '金额不能为空'}],
            })(
              <Input placeholder="提现金额" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提现方式"
            hasFeedback
          >
            {getFieldDecorator('raisedBalance', {
              rules: [{required: true, message: '请选择提现方式'}],
            })(
              <Select>
                <Option value="">请选择提现方式</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收款账号"
            hasFeedback
          >
            {getFieldDecorator('raisedBalance', {
              rules: [{required: true, message: '请输入提现账号'}],
            })(
              <Input placeholder="收款账号" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收款人姓名"
            hasFeedback
          >
            {getFieldDecorator('raisedBalance', {
              rules: [{required: true, message: '请输入收款人姓名'}],
            })(
              <Input placeholder="收款人姓名" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开户行名称"
            hasFeedback
          >
            {getFieldDecorator('raisedBalance', {
              rules: [{required: true, message: '请输入开户行名称'}],
            })(
              <Input placeholder="开户行名称" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">提交申请</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
Withdrawal = createForm()(Withdrawal);
export default Withdrawal
