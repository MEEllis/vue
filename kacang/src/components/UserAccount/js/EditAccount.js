import React from 'react';
import PropTypes from 'prop-types';
import JSEncrypt from 'jsencrypt';
import omit from 'object.omit';
import { Form, Input, Modal, Col, Row, message, Button } from 'antd';
import '../../CardType/less/cardType.less';

const FormItem = Form.Item;

class EditAccount extends React.PureComponent {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
    }).isRequired,
    account: PropTypes.shape({
      UserName: PropTypes.string.isRequired,
      RealName: PropTypes.string.isRequired,
      OpenId: PropTypes.string.isRequired
    }).isRequired,
    editEnd: PropTypes.func.isRequired,
    updateSubAccountResult: PropTypes.shape({
      Status: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    updateSubAccountResult: undefined
  };

  constructor(props) {
    super(props);
    const { account } = props;
    this.state = {
      visible: true,
      UserName: account.UserName,
      RealName: account.RealName,
      OpenId: account.OpenId,
      ReMark: account.ReMark,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { updateSubAccountResult } = nextProps;
    if (updateSubAccountResult !== this.props.updateSubAccountResult) {
      if (updateSubAccountResult.Status === 200) {
        this.props.editEnd();
      }
    }
  }

  handleSubmit = () => {
    const { props } = this;
    props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      const { OpenId } = this.state;
      const encrypt = new JSEncrypt.JSEncrypt();
      encrypt.setPublicKey('MIIBOAIBAAJAZe0dPjf3UzFUoLI8frCJuLjG5g+hX+M9uBHC2b49pd4oyH7icsxleyixTzZABhEx5+gJjpwI/ZQSnzdqWeY4bwIDAQABAkBW3eSkWDJTFqHXatAf8PkPE3uAKyYPgK3jKE/2HyqPJ1mjlFfShoOwe0bixOpFw9ug+fpPNhDGTsjrntZBG0vxAiEAq75BxA4YetwEXptxoPUQPbs2VAWPc9rOufmnz44owOUCIQCX7lXRE7QsE68AKh720RCkEldwLJnHNkxP3PTvP9uCwwIgU244iqKCV+TcJo2C9Ls4KZTxvn15A8IO3R+f2t9ngtUCIAd6ierix2msBl9Bs4h+vgz1gixZZbByscr0m3HzeMC1AiBwlQmSnT7xq5YsnjJODIE2/UgirQ+oKJlzpBqVqE5+pw==');
      if (this.state.isEditPassword) {
        props.updateSubAccount({
          OpenId,
          ...value,
          PassWord: encodeURIComponent(encrypt.encrypt(value.PassWord))
        });
      } else {
        props.updateSubAccount({
          OpenId,
          ...omit(value, 'PassWord'),
        });
      }
      // props.form.resetFields();
    });
  }
  hideModifyModal = () => {
    this.props.editEnd();
  }
  changePwd = () => {
    this.setState({ isEditPassword: true });
  }
  // 匹配两次密码是否相同
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('PassWord')) {
      callback('两次密码不一致，请重新输入!');
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 }
    };
    return (
      <div className="account-modify">
        <Modal
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModifyModal}
          title="编辑帐号"
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="用户名" >
              {getFieldDecorator('userName', {
                initialValue: this.state.UserName,
              })(
                <Input readOnly className="no-border" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="使用者姓名" hasFeedback>
              {getFieldDecorator('realName', {
                initialValue: this.state.RealName,
                rules: [
                  { required: true, message: '请输入使用者姓名!' },
                  { pattern: /^[^!*&?/\^]+$/, message: '不包含^,!,*,&,?,/等英文符号' }
                ]
              })(
                <Input type="text" maxLength="36" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="登录密码" hasFeedback={this.state.isEditPassword}>
              <Row gutter={12}>
                <Col span={this.state.isEditPassword ? 24 : 12}>
                  {getFieldDecorator('PassWord', {
                    initialValue: '',
                    rules: [
                      { required: this.state.isEditPassword, message: '请设置新登录密码!' },
                      { pattern: /^[a-zA-Z0-9!@#$%^&*.,]{6,20}$/, message: '由6~20数字、字母、符号组成' },
                      { validator: this.checkConfirm }
                    ],
                  })(
                    <Input
                      type="password"
                      size="large"
                      placeholder={this.state.isEditPassword ? '登录密码' : '******'}
                      maxLength="20"
                      className={this.state.isEditPassword ? 'd' : 'no-border'}
                      readOnly={!this.state.isEditPassword}
                    />
                    )}
                </Col>
                <Col span={this.state.isEditPassword ? 0 : 12}>
                  <Button size="large" className="pull-right" onClick={this.changePwd}>修改密码</Button>
                </Col>
              </Row>
            </FormItem>
            {
              this.state.isEditPassword && (
                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                  {getFieldDecorator('passwordConfirm', {
                    rules: [
                      { required: this.state.isEditPassword, message: '请输入密码!' },
                      { validator: this.checkPassword }
                    ],
                  })(
                    <Input type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} maxLength="20" />
                    )}
                </FormItem>
              )
            }
            <FormItem {...formItemLayout} label="备注" hasFeedback>
              {getFieldDecorator('ReMark', {
                initialValue: this.state.ReMark,
                rules: [
                  { pattern: /^[^!*&?//^]+$/, message: '不包含^,!,*,&,?,/等英文符号' }, // /^[^!*&?/\^]+$/
                  { max: 125, message: '超出了系统最大长度' }]
              })(
                <Input placeholder="修改备注" />
                )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(EditAccount);
