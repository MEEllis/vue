import React from 'react';
import { Form, Input, Row, Col, Upload, Modal, Button, Spin, message } from 'antd';
import { browserHistory } from 'react-router';

import omit from 'object.omit';
import PropTypes from 'prop-types';
import Icon, * as icons from '../../Icon/js/Icon';
import '../less/Confirmation.less';
import checkData from '../../../utils/helper/check';
import configs from 'configs';// eslint-disable-line

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class ConfirmPerson extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    isfetching: PropTypes.bool,
    openId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    currentInfo: PropTypes.shape({
      RealName: PropTypes.string,
      Tel: PropTypes.string,
    }),
    sendCodeResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    createPersonalIdentificationResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    updateIdentificationResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    createPersonalIdentification: PropTypes.func.isRequired,
    updateIdentification: PropTypes.func.isRequired,
  }
  static defaultProps = {
    sendCodeResult: undefined,
    createPersonalIdentificationResult: undefined,
    currentInfo: undefined,
    isfetching: undefined
  }
  state = {
    getVerifyCode: '获取验证码',
    isSendCode: true,
    telNum: '',
    idCardFontFlag: true,  // 判断是否显示正面照片的上传按钮
    idCardBackFlag: true,  // 判断是否显示背面照片的上传按钮
    idCardHandleFlag: true,  // 判断是否显示身份证手持照片的上传按钮
    validateStatus: '',
    info: ''
  };
  componentWillMount() {
    if (this.props.status) {
      this.setState({
        idCardFontFlag: false,
        idCardBackFlag: false,
        idCardHandleFlag: false,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (props.status) {
      this.setState({
        telNum: nextProps.currentInfo.Tel
      });
    }
    const {
      createPersonalIdentificationResult,
      sendCodeResult,
      updateIdentificationResult
    } = nextProps;
    if (createPersonalIdentificationResult !== props.createPersonalIdentificationResult) {
      if (createPersonalIdentificationResult.Status === 200) {
        message.success(createPersonalIdentificationResult.Message);
        setTimeout(() => {
          browserHistory.push('/Login');
        }, 2000);
      } else if (createPersonalIdentificationResult.Status === 500 && createPersonalIdentificationResult.Message === '商户名称不能重复') {
        this.setState({
          validateStatus: 'error',
          info: '商户名称不能重复'
        });
      }
    }
    if (updateIdentificationResult !== props.updateIdentificationResult) {
      if (updateIdentificationResult.Status === 200) {
        message.success(updateIdentificationResult.Message);
        setTimeout(() => {
          browserHistory.push('/Login');
        }, 2000);
      } else if (updateIdentificationResult.Status === 500 && updateIdentificationResult.Message === '商户名称不能重复') {
        this.setState({
          validateStatus: 'error',
          info: '商户名称不能重复'
        });
      }
    }

    if (sendCodeResult !== props.sendCodeResult) {
      if (sendCodeResult.Status === 200) {
        message.success(sendCodeResult.Message);
      }
    }
  }
  getPhoneCode = () => {
    // 如果定时器不存在则执行发送验证码操作
    if (this.state.isSendCode) {
      // 表示已经发送了验证码
      this.setState({
        isSendCode: false
      });
      const that = this;
      let time = 60;
      // 定时器
      let timer = setInterval(() => {
        time -= 1;
        that.setState({
          getVerifyCode: `重新获取${time}s`
        });
        // 如果为0
        if (!time) {
          clearInterval(timer);
          timer = null;
          that.setState({
            getVerifyCode: '获取验证码'
          });
          // 设置定时器不存在
          that.setState({
            isSendCode: true
          });
        }
      }, 1000);
      // 调用发送验证码
      const { props } = this;
      props.sendCode({
        Tel: this.state.telNum,
        openId: this.props.openId
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = {
          // 如果是重新认证或者修改信息并且用户没有修改信息则让它获取之前用户保存的，
          // 否则获取修改过的信息 flag用于标记是否有修改
          IdentityCodeImg: {
            Front: values.idCardFont.flag ?
              values.idCardFont.fileList[0].url :
              values.idCardFont.file.response.Data.Src,
            Back: values.idCardBack.flag ?
              values.idCardBack.fileList[0].url :
              values.idCardBack.file.response.Data.Src,
            Hold: values.idCardHandle.flag ?
              values.idCardHandle.fileList[0].url :
              values.idCardHandle.file.response.Data.Src,
          },
          RealName: values.name,
          IdentityCode: values.idCard,
          Tel: values.tel,
          SiteName: values.SiteName,
          code: values.code,
          IsCompany: false,
          OpenId: this.props.openId,
          UserName: this.props.userName,
        };
        // 如果是更新
        if (this.props.status) {
          // this.props.createCompanyIdentification(postData);
          this.props.updateIdentification({
            ...omit(postData, 'SiteName'),
            NewSiteName: values.SiteName
          });
        } else {
          this.props.createPersonalIdentification(postData);
        }
      }
    });
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleCancel = () => this.setState({ previewVisible: false })
  beforeUpload = (file) => {
    const isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
    if (!isJPG) {
      message.error('格式要求jpg、jpeg、png!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片不能超过5m!');
    }
    return isJPG && isLt5M;
  }
  checkIdentityCode = (rule, value, callback) => {
    if (!checkData.idCardCheck(value)) {
      callback('身份证格式有误，请输入正确的身份证号码');
    } else {
      callback();
    }
  }
  checkPhoto = (rule, value, callback, msg) => {
    if (value.fileList.length === 0) {
      callback(msg);
    } else {
      callback();
    }
  }
  checkSiteNameConfirm = (rule, value, callback) => {
    if (value === '') {
      this.setState({
        validateStatus: 'error',
        info: '请输入商户名称'
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
    const { currentInfo, status } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, idCardHandleFlag, idCardBackFlag, idCardFontFlag,
      validateStatus, info } = this.state;
    const uploadButton = (
      <div>
        <Icon glyph={icons.iAdd} />
        <div className="ant-upload-text">选择文件</div>
      </div>
    );
    const that = this;
    const uploadConfig = {
      action: configs.UploadFile,
      listType: 'picture-card',
      onChange(info) {
        if (info.file.uid === 1) {
          that.setState({ idCardFontFlag: true });
        } else if (info.file.uid === 2) {
          that.setState({ idCardBackFlag: true });
        } else if (info.file.uid === 3) {
          that.setState({ idCardHandleFlag: true });
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传完成`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      }
    };
    let defaultFileListFront = [];
    let defaultFileListBack = [];
    let defaultFileListHold = [];
    // 初始化图片的值
    const initFileListFront = { fileList: [], flag: true };
    const initFileListBack = { fileList: [], flag: true };
    const initFileListHold = { fileList: [], flag: true };
    // 如果是未审核用户
    if (currentInfo.IdentityCodeImg) {
      const info = JSON.parse(currentInfo.IdentityCodeImg);
      defaultFileListFront = [{
        uid: 1,
        name: 'xxx.jpg',
        status: 'done',
        url: info.Front,
      }];
      defaultFileListBack = [{
        uid: 2,
        name: 'xxx.jpg',
        status: 'done',
        url: info.Back,
      }];
      defaultFileListHold = [{
        uid: 3,
        name: 'xxx.jpg',
        status: 'done',
        url: info.Hold,
      }];
      initFileListFront.fileList = defaultFileListFront;
      initFileListBack.fileList = defaultFileListBack;
      initFileListHold.fileList = defaultFileListHold;
    }
    // 如果用户是首次认证，不是通过注册页面跳转
    else if (!currentInfo.IdentityCodeImg && status) {
      // 这里为什么会加载的两次
      return false;
    }
    return (
      <Row>
        <Col sm={24} md={14}>
          <div className="form-box">
            <Spin spinning={this.props.isfetching !== undefined ? this.props.isfetching : false}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="您的真实姓名"
                  hasFeedback
                >
                  {getFieldDecorator("name", {
                    initialValue: currentInfo.RealName,
                    rules: [{ required: true, message: "请输入你的真实姓名" }],
                  })(
                    <Input />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="您的身份证号"
                  hasFeedback
                >
                  {getFieldDecorator("idCard", {
                    initialValue: currentInfo.IdentityCode,
                    rules: [
                      { required: true, validator: this.checkIdentityCode }
                    ],
                  })(
                    <Input />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="您的身份证(正面)"
                  hasFeedback
                >
                  {getFieldDecorator('idCardFont', {
                    initialValue: initFileListFront.fileList.length === 0 ? '' : initFileListFront,
                    rules: [
                      { required: true, message: '请上传您的身份证(正面)照片' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传您的身份证(正面)照片'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
                      name="idCardFont"
                      defaultFileList={defaultFileListFront}
                      onPreview={this.handlePreview}
                      beforeUpload={this.beforeUpload}
                    >
                      {this.props.form.getFieldValue('idCardFont') && this.props.form.getFieldValue('idCardFont').fileList.length > 0 ? null : (idCardFontFlag ? uploadButton : null)}
                    </Upload>
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="您的身份证(反面)"
                  hasFeedback
                >
                  {getFieldDecorator('idCardBack', {
                    initialValue: initFileListBack.fileList.length === 0 ? '' : initFileListBack,
                    rules: [
                      { required: true, message: '请上传您的身份证(反面)照片' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传您的身份证(反面)照片'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
                      name="idCardBack"
                      onPreview={this.handlePreview}
                      defaultFileList={defaultFileListBack}
                      beforeUpload={this.beforeUpload}
                    >
                      {this.props.form.getFieldValue('idCardBack') && this.props.form.getFieldValue('idCardBack').fileList.length > 0 ? null : (idCardBackFlag ? uploadButton : null)}
                    </Upload>
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="您的身份证(手持照)"
                  hasFeedback
                  style={{ marginBottom: '0' }}
                >
                  {getFieldDecorator('idCardHandle', {
                    initialValue: initFileListHold.fileList.length === 0 ? '' : initFileListHold,
                    rules: [
                      { required: true, message: '请上传您的身份证(手持照)照片' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传您的身份证(手持照)照片'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
                      name="idCardHandle"
                      onPreview={this.handlePreview}
                      defaultFileList={defaultFileListHold}
                      beforeUpload={this.beforeUpload}
                    >
                      {this.props.form.getFieldValue('idCardHandle') && this.props.form.getFieldValue('idCardHandle').fileList.length > 0 ? null : (idCardHandleFlag ? uploadButton : null)}
                    </Upload>
                    )}
                </FormItem>

                <FormItem
                  wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 19, offset: 5 },
                  }}
                >
                  <div>
                    <div>持有者需正面、免冠、未化妆、完全露出手臂；</div>
                    <div>身份证为本人持有，并不得遮挡持有者面部，身份证全部信息</div>
                    <div>（包括身份证号、头像）需清晰可辨认；</div>
                    <div>格式要求jpg、jpeg、png，不超过5MB</div>
                    <div className="example">.</div>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="商户名称"
                  validateStatus={validateStatus}
                  help={info !== '' ? info : ''}
                  hasFeedback
                >
                  {getFieldDecorator('SiteName', {
                    initialValue: currentInfo.SiteName,
                    rules: [{ required: true, message: '请输入商户名称' },
                    { validator: this.checkSiteNameConfirm }],
                  })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="您的手机号"
                  hasFeedback
                >
                  {getFieldDecorator('tel', {
                    initialValue: currentInfo.Tel,
                    rules: [
                      { required: true, message: '请输入您的手机号' },
                      { pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '请输入正确的手机号' },
                    ],
                  })(
                    <Input
                      onChange={(e) => { this.setState({ telNum: e.target.value }); }}
                    />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="填写您的短信验证码"
                  className="getCode"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入验证码' }],
                  })(
                    <Input
                      addonAfter={
                        <Button
                          type="primary"
                          className="getPhoneCode"
                          size="large"
                          onClick={this.getPhoneCode}
                        >{this.state.getVerifyCode}</Button>}
                      size="large"
                    />
                    )}
                </FormItem>

                <FormItem
                  wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 19, offset: 5 },
                  }}
                >
                  <Button type="primary" htmlType="submit" size="large">完成验证</Button>
                </FormItem>

              </Form>
            </Spin>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="身份证(正面)" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </Col>
        <Col sm={24} md={10}>
          <div className="attention">
            <div className="attention-bg">
              <div className="attention-content">
                <div>尊敬的客户:</div>
                <ul className="attention-list">
                  <li>
                    <p>为了保障交易的有效性，不为虚假交易提供任何空间，请您完成实名认证，您可以根据您的身份，提交个人认证或者企业认证，两者选其一即可。</p>
                  </li>
                  <li>
                    <p>在您提交认证资料后，我们在一个工作日内为您开通系统的使用权限。</p></li>
                  <li>
                    <p>认证过程中，您如果遇到问题，您可以联系我们的在线客服/或者拨打客服电话</p>
                  </li>
                </ul>
                <div className="top-space color-sup">
                  <span>
                    <Icon glyph={icons.qq} className="attention-icon" />
                    QQ:12345678
                  </span>
                  <span>
                    <Icon glyph={icons.tel} className="attention-icon" />
                    400-111-333
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default createForm()(ConfirmPerson);
