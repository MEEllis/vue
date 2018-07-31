import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, message, Input, Spin } from 'antd';
import FL, { getJSON } from '../../../utils/FL';
import JSEncrypt from 'jsencrypt';
import '../../CardType/less/cardType.less';
import '../less/userAccount.less';

const createForm = Form.create;
const FormItem = Form.Item;

// 新增帐号按钮弹出框
class AddAccount extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
    }).isRequired,
    addEnd: PropTypes.func.isRequired,
    addSubAccountResult: PropTypes.shape({
      Status: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    addSubAccountResult: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      setTimeoutTimer: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { addSubAccountResult } = nextProps;
    if (addSubAccountResult !== this.props.addSubAccountResult) {
      if (addSubAccountResult.Status === 200) {
        this.props.addEnd();
      }
    }
  }
  setVisible = () => {
    this.setState({ visible: true });
    this.setState({ confirmDirty: false });    // 两次密码匹配，设置state
  }
  hideModifyModal = () => {
    this.setState({ visible: false });
  }
  handleSubmit = () => {
    const { props } = this;
    props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      const encrypt = new JSEncrypt.JSEncrypt();
      encrypt.setPublicKey('MIIBOAIBAAJAZe0dPjf3UzFUoLI8frCJuLjG5g+hX+M9uBHC2b49pd4oyH7icsxleyixTzZABhEx5+gJjpwI/ZQSnzdqWeY4bwIDAQABAkBW3eSkWDJTFqHXatAf8PkPE3uAKyYPgK3jKE/2HyqPJ1mjlFfShoOwe0bixOpFw9ug+fpPNhDGTsjrntZBG0vxAiEAq75BxA4YetwEXptxoPUQPbs2VAWPc9rOufmnz44owOUCIQCX7lXRE7QsE68AKh720RCkEldwLJnHNkxP3PTvP9uCwwIgU244iqKCV+TcJo2C9Ls4KZTxvn15A8IO3R+f2t9ngtUCIAd6ierix2msBl9Bs4h+vgz1gixZZbByscr0m3HzeMC1AiBwlQmSnT7xq5YsnjJODIE2/UgirQ+oKJlzpBqVqE5+pw==');

      props.addSubAccount({
        SiteName: '',
        UserName: value.userName,
        RealName: value.realName,
        ReMark: value.remark,
        LoginPassword: encodeURIComponent(encrypt.encrypt(value.pwd))
      });
      this.props.form.resetFields();
      this.setState({ visible: false });
    });
  }
  // 匹配两次密码是否相同
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('两次密码不一致，请重新输入');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirm'], { force: true });
    }
    callback();
  }
  checkUserName = (rule, value, callback) => {
    // let newValue = value;
    // newValue = value.replace(/ /g, '');
    // console.log(11111);
    // if (this.state.setTimeoutTimer) {
    //   clearTimeout(this.state.setTimeoutTimer);
    // }
    // let setTimeoutTimer = setTimeout(function () {
    //   getJSON(FL.PATH.API.LoginNameCheck + newValue).then((data) => {
    //     if (data.state === 1) {
    //       callback('用户名已存在！');
    //     } else {
    //       callback();
    //     }
    //   });
    // }, 300);
    // this.setState({ setTimeoutTimer });
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 }
    }
    return (
      <div className="account-add">
        <Button type="primary" className="addNewBtn pull-right" onClick={this.setVisible}>新增帐号</Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModifyModal}
          title="新增帐号"
        >
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="用户名" hasFeedback>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  { pattern: /^\w{6,18}$/, message: '由6~18位字母和数字组成，可包含"_"符号' },
                  { validator: this.checkUserName }
                ],
              })(
                <Input placeholder="请输入用户名" maxLength="18" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="使用者姓名" hasFeedback>
              {getFieldDecorator('realName', {
                rules: [{ pattern: /^[^!*&?/\^]+$/, message: '不包含^,!,*,&,?,/等英文符号' }]
              })(
                <Input placeholder="请输入使用者姓名" maxLength="36" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="登录密码" hasFeedback>
              {getFieldDecorator('pwd', {
                rules: [
                  { required: true, message: '请设置登录密码!' },
                  { pattern: /^[a-zA-Z0-9!@#$%^&*.,]{6,20}$/, message: '密码由6~20数字、字母、符号组成' },
                  { validator: this.checkConfirm },
                ],
              })(
                <Input type="password" placeholder="请输入登录密码" maxLength="20" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码" hasFeedback>
              {getFieldDecorator('passwordConfirm', {
                rules: [
                  { required: true, message: '请输入确认密码!' },
                  { validator: this.checkPassword }
                ],
              })(
                <Input type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} maxLength="20" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" hasFeedback>
              {getFieldDecorator('remark', {
                rules: [{ pattern: /^[^!*&?/\^]+$/, message: '不包含^,!,*,&,?,/等英文符号' }]
              })(
                <Input placeholder="请输入备注" />
                )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default createForm()(AddAccount);
