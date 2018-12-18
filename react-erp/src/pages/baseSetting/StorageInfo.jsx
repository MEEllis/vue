import React, { Fragment } from 'react';
import { Form, Icon, Input, Button, } from 'antd';
const FormItem = Form.Item;
class StorageInfo extends React.PureComponent {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                    <Form onSubmit={this.handleSubmit} >
            <FormItem
                hasFeedback
            >
                {getFieldDecorator('userName', {
                    initialValue: 'admin',
                    rules: [{ required: true, message: '请输入登录账号!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </FormItem>
        
            <FormItem>
                <Button type="primary"  htmlType="submit" className="login-form-button">
                    查询
            </Button>
            </FormItem>
        </Form> 
            </Fragment>
        )
    }
}

export default Form.create()(StorageInfo)