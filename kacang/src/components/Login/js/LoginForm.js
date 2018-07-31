import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { browserHistory } from 'react-router';

import JSEncrypt from 'jsencrypt';
import PropTypes from 'prop-types';
import FL from '../../../utils/FL';
import configs from 'configs';// eslint-disable-line

const FormItem = Form.Item;
const DELAY_TIME = 60;
class LoginForm extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    checkLogin: PropTypes.func.isRequired,
    isfetching: PropTypes.bool.isRequired,
    checkLoginResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    })
  }
  static defaultProps = {
    checkLoginResult: undefined,
    isfetching: false
  }
  constructor(props) {
    super(props);
    this.state = {
      errnum: 0,
      isValidWeChat: false,
      validWeChatError: false,
      telValid: false, // 是否手机验证
      wechatCode: '',
      one: '',
      two: '',
      three: '',
      four: '',
      time: DELAY_TIME,
      timeStr: DELAY_TIME + 's重新获取',
      tel: '',
      validateStatus: '',
      info: ''
    };
    this.weixinCode = '';
  }

  componentWillMount() {
    localStorage.clear();
  }
  componentWillUnmount() {
    if (this.timer)
      clearInterval(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    const { checkLoginResult, wechatResult, validWeixinResult, authorizationResult, validPhoneCodeResult, getSubAccountPermissionListExtendResult } = nextProps;
    if (checkLoginResult !== this.props.checkLoginResult) {
      // 1 FS001001001  用户不存在
      // 2 FS001001002  密码错误
      // 3 AS001001001   没有权限  // 跳到实名认证页面进行实名认证
      // 4 FS001001003  被锁定
      // 5 FS001001004  没有进行实名认证   // 跳到实名认证页面进行实名认证
      // 6 FS001001006   提交实名认证，等待审核  // 跳到实名认证页面查看实名认证
      // 7 FS001001007  提交实名，审核不通过   // 审核不通过加载审核不通过页面然后用户操作跳转到实名认证
      // 8 FS001001008  提交实名，审核通过
      // 如果账号没有权限或者没有进行实名认证
      if (checkLoginResult.Status === 500 && (checkLoginResult.ErrorCode === 'AS001001001' || checkLoginResult.ErrorCode === 'FS001001004')) {
        if (checkLoginResult.Data.OpenId) {
          localStorage.setItem('token', checkLoginResult.Data.Token);
          const openId = checkLoginResult.Data.OpenId;
          const userName = checkLoginResult.Data.UserName;
          window.location.href = `${window.location.origin}/confirmation?openId=${openId}&userName=${userName}`;
        }
      }
      // 如果是提交了实名认证等待审核
      else if (checkLoginResult.Status === 500 && checkLoginResult.ErrorCode === 'FS001001006') {
        if (checkLoginResult.Data.OpenId) {
          localStorage.setItem('token', checkLoginResult.Data.Token);
          const openId = checkLoginResult.Data.OpenId;
          const userName = checkLoginResult.Data.UserName;
          window.location.href = `${window.location.origin}/confirmWait?openId=${openId}&userName=${userName}&status=true`;
        }
      } else if (checkLoginResult.Status === 500 && checkLoginResult.ErrorCode === 'FS001001007') {
        if (checkLoginResult.Data.OpenId) {
          localStorage.setItem('token', checkLoginResult.Data.Token);
          const openId = checkLoginResult.Data.OpenId;
          const userName = checkLoginResult.Data.UserName;
          window.location.href = `${window.location.origin}/confirmWait?openId=${openId}&userName=${userName}&status=true&type=1`;
        }
      } else if (checkLoginResult.Status === 500 && checkLoginResult.ErrorCode === 'FS001001002') {
        this.setState({
          validateStatus: 'error',
          info: '用户名或密码有误'
        });
      }
      // else if (loginResult.Status === '501') {
      //   window.location.href = loginResult.Data;
      // } else if (loginResult.Status === '502') {
      //   this.setState({ tel: loginResult.Data.substring(0, 3) + '****' + loginResult.Data.substring(7) });
      //   this.props.sendWechatVerifyCode();
      // }
      if (checkLoginResult.Status === 200) {
        localStorage.setItem('token', checkLoginResult.Data.Token);
        localStorage.setItem('openId', checkLoginResult.Data.OpenId);
        // // 如果是子账号
        // if (checkLoginResult.Data.IsSubUser) {
        //   this.props.getSubAccountPermissionListExtend({ openId: checkLoginResult.Data.OpenId });
        // }
        // if (!checkLoginResult.Data.IsSubUser) {
        browserHistory.push('/');
        //}
      }
    }
    // if (getSubAccountPermissionListExtendResult !== this.props.getSubAccountPermissionListExtendResult) {
    //   localStorage.setItem('userAuth', JSON.stringify(getSubAccountPermissionListExtendResult.Data));
    //   browserHistory.push('/');
    // }
    // if (wechatResult !== this.props.wechatResult && wechatResult) {
    //   this.setState({ isValidWeChat: true });
    //   this.sendWeiXinCode();
    // }
    // if (validWeixinResult !== this.props.validWeixinResult && validWeixinResult) {
    //   if (validWeixinResult.Status != '200') {
    //     this.setState({ validWeChatError: true });
    //     setTimeout(() => this.setState({ validWeChatError: false }), 3000);
    //   } else {
    //     this.props.login(this.loginData);
    //   }
    // }
    // if (validPhoneCodeResult !== this.props.validPhoneCodeResult && validPhoneCodeResult) {
    //   if (validPhoneCodeResult.Status != '200') {
    //     this.setState({ validWeChatError: true });
    //     setTimeout(() => this.setState({ validWeChatError: false }), 3000);
    //   } else {
    //     this.props.login(this.loginData);
    //   }
    // }
    // if (authorizationResult !== this.props.authorizationResult && authorizationResult) {
    //   if (authorizationResult.Status === '200') {
    //     window.location.href = '/';
    //   }
    // }
  }
  sendWeiXinCode = () => {
    if (this.timer)
      clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time -= 1, timeStr: this.state.time + 's重新获取' });
      if (this.state.time <= 0) {
        clearInterval(this.timer);
        this.setState({ time: DELAY_TIME, timeStr: '获取验证码' });
        // this.sendWeiXinCode();
      }
    }, 1000);
  }
  sendWeiXinCodeClick = () => {
    if (this.state.time === DELAY_TIME) {
      this.props.sendWechatVerifyCode();
      this.sendWeiXinCode();
    }
  }
  sendPhoneCodeClick = () => {
    if (this.state.time === DELAY_TIME) {
      this.props.sendPhoneVerifyCode();
      this.sendWeiXinCode();
    }
  }
  onPhoneChange = (e) => {
    if (e.target.value.length == 4) {
      this.props.validPhoneVerifyCode(e.target.value);
      e.target.value = '';
    }
  }
  verifycodeChange = () => {
    let act = {
      verifycodeUrl: localStorage.getItem('PassportDomain') + `handler/ValidationCode.ashx?time=${new Date().toTimeString()}`
    }
    this.setState(act);
  }
  validWeixin = () => {
    this.one.focus();
  }
  wechatCodeChange = (e) => {
    this.setState({ wechatCode: e.target.value });
  }

  wechatInputClick = () => {
    this.setFocus();
  }
  oneKeyDown = (e) => {
    if (e.target.value && e.keyCode !== 8)
      return e.preventDefault();
    if (e.keyCode === 8) {
      this.weixinCode = this.weixinCode.substr(0, this.weixinCode.length - 1);
      this.setFocus();
      // e.preventDefault();
    }
  }
  setFocus = () => {
    if (this.weixinCode.length === 0)
      this.one.focus();
    else if (this.weixinCode.length === 1)
      this.two.focus();
    else if (this.weixinCode.length === 2)
      this.three.focus();
    else if (this.weixinCode.length === 3)
      this.four.focus();
    else {
      this.props.validWeixin(this.weixinCode);
      this.weixinCode = '';
    }
  }
  handleSubmit = () => {
    const { props } = this;
    props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const encrypt = new JSEncrypt.JSEncrypt();
      encrypt.setPublicKey('MIIBOAIBAAJAZe0dPjf3UzFUoLI8frCJuLjG5g+hX+M9uBHC2b49pd4oyH7icsxleyixTzZABhEx5+gJjpwI/ZQSnzdqWeY4bwIDAQABAkBW3eSkWDJTFqHXatAf8PkPE3uAKyYPgK3jKE/2HyqPJ1mjlFfShoOwe0bixOpFw9ug+fpPNhDGTsjrntZBG0vxAiEAq75BxA4YetwEXptxoPUQPbs2VAWPc9rOufmnz44owOUCIQCX7lXRE7QsE68AKh720RCkEldwLJnHNkxP3PTvP9uCwwIgU244iqKCV+TcJo2C9Ls4KZTxvn15A8IO3R+f2t9ngtUCIAd6ierix2msBl9Bs4h+vgz1gixZZbByscr0m3HzeMC1AiBwlQmSnT7xq5YsnjJODIE2/UgirQ+oKJlzpBqVqE5+pw==');
      // 触发登录并发送用户名及密码
      this.loginData = {
        UserName: values.username,
        // password: CryptoJS.AES.encrypt(values.password, 'secret key 123'),
        Pwd: encodeURIComponent(encrypt.encrypt(values.password)),
        // password: values.password,
        // verifycode: values.verifycode
        // Grant_Type: 'password', // 补助类型
        // client_id: '88888889',  // 客户端 ID
        // hd: '',         //
        // ip: '',         // IP
        // province: '',   // 省份
        // city: '',       // 市区
        // from: 'kamen',  // 来自
        // type: 'on'      // 类型
      };
      this.props.checkLogin(this.loginData);
    });
  }

  change = (e) => {
    this.weixinCode += e.target.value;
    this.setFocus();
  }
  switchPhone = () => {
    if (this.timer)
      clearInterval(this.timer);
    this.setState({ telValid: true, isValidWeChat: false, time: DELAY_TIME, timeStr: '获取验证码' })
    this.sendPhoneCodeClick();
  }
  checkUserConfirm = (rule, value, callback) => {
    if (value === '') {
      this.setState({
        validateStatus: 'error',
        info: '请输入用户名'
      });
    } else {
      this.setState({
        validateStatus: 'success',
        info: ''
      });
    }
    callback();
  }
  render() {
    const { validateStatus, info } = this.state;

    const { props } = this;
    const { getFieldDecorator } = props.form;
    const registUrl = configs.LOGIN + '/passport/register?returnUrl=' + encodeURIComponent(`${window.location.origin}/confirmation`) + '&clientId=88888888';
    return (
      <div className="sign-form">
        <Spin spinning={this.props.isfetching}>

          {(!this.state.isValidWeChat && !this.state.telValid) &&
            <div>
              <div className="sign-form-hd">
                <h3>用户登录</h3>
              </div>
              <div className="sign-form-bd">
                <Form horizontal>
                  <FormItem validateStatus={validateStatus} help={info !== '' ? info : ''} hasFeedback>
                    {getFieldDecorator('username', {
                      rules: [
                        { required: true, message: '请输入用户名' },
                        { validator: this.checkUserConfirm }
                      ],
                      initialValue: '',
                    })(
                      <Input placeholder="用户名" />
                      )}
                  </FormItem>
                  <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }],
                      initialValue: '',
                    })(
                      <Input type="password" placeholder="密码" />
                      )}
                  </FormItem>
                  {this.state.errnum >= 3 &&
                    <FormItem hasFeedback>
                      {getFieldDecorator('verifycode', {
                        rules: [{ required: true, message: '验证码' }],
                        initialValue: '',
                      })(
                        <Input type="text" placeholder="验证码"
                          addonAfter={<img src={this.state.verifycodeUrl} title="点击刷新验证码" onClick={this.verifycodeChange} />} />
                        )}
                    </FormItem>
                  }


                  <FormItem className="clearfix">
                    <div className="pull-left">
                      {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(
                        <Checkbox>我已阅读 <a href="javascript:;">《卡仓网用户协议》</a></Checkbox>
                        )}
                    </div>
                    <div className="pull-right">
                      <a href={registUrl} className="mr10">注册</a>
                      <a href={FL.PATH.FindPassword}>找回密码</a>
                    </div>
                  </FormItem>
                  <FormItem>
                    <Button className="ant-btn-block" type="primary" htmlType="submit" onClick={this.handleSubmit}>登录</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          }
          {this.state.isValidWeChat && !this.state.validWeChatError &&
            <div>
              <div className="login-detail">
                <div className="m10">
                  <div>
                    <span>验证码已发送到您的微信号!</span>
                    <button className="pl10 text-blue sendweixinbtn" onClick={this.sendWeiXinCodeClick}>{this.state.timeStr}</button></div>
                  <div className="mb10">请输入验证码:</div>
                  <div>
                    <input onChange={this.change} onKeyDown={this.oneKeyDown} onClick={this.wechatInputClick} ref={(input) => { this.one = input; }} type="text" className="weixinValidateSub" />
                    <input onChange={this.change} onKeyDown={this.oneKeyDown} onClick={this.wechatInputClick} ref={(input) => { this.two = input; }} type="text" className="weixinValidateSub" />
                    <input onChange={this.change} onKeyDown={this.oneKeyDown} onClick={this.wechatInputClick} ref={(input) => { this.three = input; }} type="text" className="weixinValidateSub" />
                    <input onChange={this.change} onKeyDown={this.oneKeyDown} onClick={this.wechatInputClick} ref={(input) => { this.four = input; }} type="text" className="weixinValidateSub" />
                  </div>
                </div>
                <div className="p10">
                  <a href="javascript:;" onClick={this.switchPhone} className="text-red" id="showPhoneCodeWrap">微信无法使用?</a>
                </div>
              </div>
            </div>
          }
          {this.state.validWeChatError &&
            <div>验证码错误，系统禁止进入（3s后重新输入）</div>
          }
          {this.state.telValid && !this.state.validWeChatError &&
            <div className="m10">
              <div>向此账号绑定的唯一手机号发送登录验证码</div>
              <div className="mb10">{this.state.tel}</div>
              <div>
                <input type="text" onChange={this.onPhoneChange} className='telCode' style={{ width: '150px' }} placeholder="验证码" />
                <a href="javascript:;" className="pl10" onClick={this.sendPhoneCodeClick}>{this.state.timeStr}</a>
              </div>
              <div style={{ borderTop: '1px #e7e7e7 solid', marginTop: '20px' }} className="p10">
                手机号已不能使用？
                             <a href="javascript:;" className="text-blue">账号申述?</a>
              </div>
            </div>
          }
        </Spin>
      </div>
    );
  }
}


export default Form.create()(LoginForm);
