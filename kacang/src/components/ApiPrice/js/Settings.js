import React from 'react';
import PropTypes from 'prop-types';
import { Input, message, Spin, Modal, Button, Form } from 'antd';
import Icon from '../../Icon/js/Icon';
import * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';
import IconComponent from '../../IconComponent/js/IconComponent';
import FL from '../../../utils/FL';
import { getData } from '../../../utils/helper/getData';

const createForm = Form.create;
const FormItem = Form.Item;

class Settings extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    data: PropTypes.shape({

    }),
    settings: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      SecretPrice: '',
      inputSecretPrice: '',
      isSettings: false,
      isfetching: false,
    };
  }
  handleOk = (data) => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      const newData = data;
      Object.assign(newData, { ...value });
      this.props.settings(data);
    });
  }
  render() {
    const { props } = this;
    const { data } = this.state;
    const { SecretPrice, Price } = data;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 6,
      },
    };
    return (
      <div>
        <Modal
          onClose={() => { props.hideSettingModal(); }}
          title="设置"
          visible
          footer={null}
        >
          <div className="modal-demo-content">
            <Form>
              <FormItem {...formItemLayout} label={'售价'}>
                {
                  getFieldDecorator('Price', {
                    rules: [{ required: true, message: '售价不能为空' }],
                    initialValue: Price ? Price : ''
                  })(
                    <Input type="number" />
                    )}
              </FormItem>
              <FormItem {...formItemLayout} label={'密价'}>
                {
                  getFieldDecorator('SecretPrice', {
                    rules: [{ required: true, message: '密价不能为空' }],
                    initialValue: SecretPrice ? SecretPrice : ''
                  })(
                    <Input type="number" />
                    )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" size="large" onClick={() => { this.handleOk(this.props.data); }}>确定</Button>
                <Button size="large" style={{ marginLeft: 20 }} onClick={() => { props.hideSettingModal(); }}>取消</Button>
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default createForm()(Settings);
