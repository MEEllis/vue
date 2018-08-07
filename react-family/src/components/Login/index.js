import  React,{Component}  from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';

const FormItem = Form.Item;
class NormalLoginForm extends Component{

    handleSubmit = ()=>{
        this.props.form.validateFields((err, values) => {
              this.props.onSubmit(err, values);
            }
       );
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form className="login-form">
                <FormItem>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>记住我</Checkbox>
                )}
                <a className="login-form-forgot" href="">忘记密码</a>
                <Button type="primary" htmlType="button" onClick={() =>this.handleSubmit()} className="login-form-button">
                    登录
                </Button>
                没有帐号？<a href="">注册</a>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(NormalLoginForm);