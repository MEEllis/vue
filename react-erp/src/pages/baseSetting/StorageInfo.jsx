import React, { Fragment } from 'react';
import { Form, Icon, Input, Button, } from 'antd';
const FormItem = Form.Item;
class StorageInfo extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                 仓库信息
            </Fragment>
        )
    }
}

export default Form.create()(StorageInfo)