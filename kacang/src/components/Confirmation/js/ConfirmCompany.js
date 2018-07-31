import React from 'react';
import { Form, Input, Row, Col, Upload, Modal, Button, Spin, message } from 'antd';
import { browserHistory } from 'react-router';
import omit from 'object.omit';
import PropTypes from 'prop-types';
import Icon, * as icons from '../../Icon/js/Icon';
import checkData from '../../../utils/helper/check';
import '../less/Confirmation.less';
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

class ConfirmCompany extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    isfetching: PropTypes.bool.isRequired,
    openId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    currentInfo: PropTypes.shape({
      RealName: PropTypes.string,
      Tel: PropTypes.string,
    }),
    createCompanyIdentification: PropTypes.func.isRequired,
    createCompanyIdentificationResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    sendCodeCompanyResult: PropTypes.shape({
      Status: PropTypes.number.isRequired,
    }),
    updateIdentificationCompanyResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    updateIdentificationCompany: PropTypes.func.isRequired,
  }
  static defaultProps = {
    createCompanyIdentificationResult: undefined,
    sendCodeCompanyResult: undefined,
    isfetching: false
  }
  state = {
    getVerifyCode: '获取验证码',
    isSendCode: true,
    telNum: '',
    idCardBackFlag: true,
    idCardFontFlag: true,
    codeCertificateFlag: true,
    idCardHandleFlag: true,
    validateStatus: '',
    info: ''
  };
  componentWillMount() {
    const { status } = this.props;
    if (status) {
      this.setState({
        idCardFontFlag: false,
        idCardBackFlag: false,
        idCardHandleFlag: false,
        codeCertificateFlag: false,
        telNum: this.props.currentInfo.CorporateTel
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;

    const {
      sendCodeCompanyResult,
      createCompanyIdentificationResult,
      updateIdentificationCompanyResult
    } = nextProps;
    if (createCompanyIdentificationResult !== props.createCompanyIdentificationResult) {
      if (createCompanyIdentificationResult.Status === 200) {
        message.success(createCompanyIdentificationResult.Message);
        setTimeout(() => {
          browserHistory.push('/Login');
        }, 2000);
      } else if (createCompanyIdentificationResult.Status === 500 && createCompanyIdentificationResult.Message === '商户名称不能重复') {
        this.setState({
          validateStatus: 'error',
          info: '商户名称不能重复'
        });
      }
    }
    if (updateIdentificationCompanyResult !== props.updateIdentificationCompanyResult) {
      if (updateIdentificationCompanyResult.Status === 200) {
        message.success(updateIdentificationCompanyResult.Message);
        setTimeout(() => {
          browserHistory.push('/Login');
        }, 2000);
      } else if (updateIdentificationCompanyResult.Status === 500 && updateIdentificationCompanyResult.Message === '商户名称不能重复') {
        this.setState({
          validateStatus: 'error',
          info: '商户名称不能重复'
        });
      }
    }

    if (sendCodeCompanyResult !== props.sendCodeCompanyResult) {
      if (sendCodeCompanyResult.Status === 200) {
        message.success(sendCodeCompanyResult.Message);
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = {
          BusinessImg: {
            // 如果是重新认证或者修改信息并且用户没有修改信息则让它获取之前用户保存的，
            // 否则获取修改过的信息 flag用于标记是否有修改
            License: values.idCardHandle.flag ?
              values.idCardHandle.fileList[0].url :
              values.idCardHandle.file.response.Data.Src,
            CodeCertificate: values.codeCertificate.flag ?
              values.codeCertificate.fileList[0].url :
              values.codeCertificate.file.response.Data.Src,
            Back: values.idCardFont.flag ?
              values.idCardFont.fileList[0].url :
              values.idCardFont.file.response.Data.Src,
            Hold: values.idCardBack.flag ?
              values.idCardBack.fileList[0].url :
              values.idCardBack.file.response.Data.Src,
          },
          BusinessName: values.BusinessName,
          CorporateCode: values.CorporateCode,
          CorporateName: values.CorporateName,
          CorporateTel: values.CorporateTel,
          SiteName: values.SiteName,
          code: values.code,
          IsCompany: true,
          OpenId: this.props.openId,
          UserName: this.props.userName,
        };
        // 如果是更新
        if (this.props.status) {
          // this.props.createCompanyIdentification(postData);
          this.props.updateIdentificationCompany({
            ...omit(postData, 'SiteName'),
            NewSiteName: values.SiteName
          });
        } else {
          this.props.createCompanyIdentification(postData);
        }
      }
    });
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
      props.sendCodeCompany({
        Tel: this.state.telNum,
        openId: this.props.openId
      });
    }
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleCancel = () => {
    this.setState({ previewVisible: false });
  }
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
      callback('请输入正确的身份证号');
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
    const { getFieldDecorator } = this.props.form;
    const { status, currentInfo } = this.props;
    const { previewVisible, previewImage, idCardBackFlag, idCardFontFlag, codeCertificateFlag, idCardHandleFlag,
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
          that.setState({ idCardHandleFlag: true });
        } else if (info.file.uid === 2) {
          that.setState({ codeCertificateFlag: true });
        } else if (info.file.uid === 3) {
          that.setState({ idCardBackFlag: true });
        } else if (info.file.uid === 4) {
          that.setState({ idCardFontFlag: true });
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传完成`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      }
    };
    let defaultFileListLicense = [];
    let defaultFileListCodeCertificate = [];
    let defaultFileListBack = [];
    let defaultFileListHold = [];

    // 初始化图片的值
    const initFileListLicense = { fileList: [], flag: true };
    const initFileListCodeCertificate = { fileList: [], flag: true };
    const initFileListBack = { fileList: [], flag: true };
    const initFileListHold = { fileList: [], flag: true };
    if (currentInfo.BusinessImg) {
      const nowInfo = JSON.parse(currentInfo.BusinessImg);
      defaultFileListLicense = [{
        uid: 1,
        name: 'xxx.png',
        status: 'done',
        url: nowInfo.License,
        //thumbUrl: FL.SERVERPATH + info.IdentityCodeImgObject.Front,
      }];
      defaultFileListCodeCertificate = [{
        uid: 2,
        name: 'xxx.png',
        status: 'done',
        url: nowInfo.CodeCertificate,
        //thumbUrl: FL.SERVERPATH + info.IdentityCodeImgObject.Back,
      }];
      defaultFileListBack = [{
        uid: 3,
        name: 'xxx.png',
        status: 'done',
        url: nowInfo.Back,
      }];
      defaultFileListHold = [{
        uid: 4,
        name: 'xxx.png',
        status: 'done',
        url: nowInfo.Hold,
        //thumbUrl: FL.SERVERPATH + info.IdentityCodeImgObject.Hold,
      }];
      initFileListLicense.fileList = defaultFileListLicense;
      initFileListCodeCertificate.fileList = defaultFileListCodeCertificate;
      initFileListBack.fileList = defaultFileListBack;
      initFileListHold.fileList = defaultFileListHold;
    }
    return (
      <Row>
        <Col sm={24} md={14}>
          <div className="form-box">
            <Spin spinning={this.props.isfetching !== undefined ? this.props.isfetching : false}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="请上传企业工商执照"
                  hasFeedback
                  style={{ marginBottom: '0' }}
                >
                  {getFieldDecorator('idCardHandle', {
                    initialValue: initFileListLicense.fileList.length === 0 ? '' : initFileListLicense,
                    rules: [
                      { required: true, message: '请上传企业工商执照照片' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传企业工商执照'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
                      onPreview={this.handlePreview}
                      name="idCardHandle"
                      defaultFileList={defaultFileListLicense}
                      beforeUpload={this.beforeUpload}
                    >
                      {this.props.form.getFieldValue('idCardHandle') && this.props.form.getFieldValue('idCardHandle').fileList.length > 0 ? null : (idCardHandleFlag ? uploadButton : null)}
                    </Upload>
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="请上传组织机构代码证"
                  hasFeedback
                  style={{ marginBottom: '0' }}
                >
                  {getFieldDecorator('codeCertificate', {
                    initialValue: initFileListCodeCertificate.fileList.length === 0 ? '' : initFileListCodeCertificate,
                    rules: [
                      { required: true, message: '请上传组织机构代码证' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传组织机构代码证'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
                      onPreview={this.handlePreview}
                      name="codeCertificate"
                      defaultFileList={defaultFileListCodeCertificate}
                      beforeUpload={this.beforeUpload}
                    >
                      {this.props.form.getFieldValue('codeCertificate') && this.props.form.getFieldValue('codeCertificate').fileList.length > 0 ? null : (codeCertificateFlag ? uploadButton : null)}
                    </Upload>
                    )}
                </FormItem>
                <FormItem
                  wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 19, offset: 5 },
                  }}
                >
                  <div className="example"><input style={{ display: 'none' }} /></div>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="公司或机构名称"
                  hasFeedback
                >
                  {getFieldDecorator('BusinessName', {
                    initialValue: currentInfo.BusinessName,
                    rules: [{ required: true, message: '请输入公司或机构名称' }],
                  })(
                    <Input />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="法人姓名"
                  hasFeedback
                >
                  {getFieldDecorator('CorporateName', {
                    initialValue: currentInfo.CorporateName,
                    rules: [{ required: true, message: '请输入法人姓名' }],
                  })(
                    <Input />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="法人身份证"
                  hasFeedback
                >
                  {getFieldDecorator('CorporateCode', {
                    initialValue: currentInfo.CorporateCode,
                    rules: [
                      { required: true, message: '请输入法人身份证号' },
                      { validator: this.checkIdentityCode }
                    ],
                  })(
                    <Input />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="法人身份证照片(正面)"
                  hasFeedback
                >
                  {getFieldDecorator('idCardFont', {
                    initialValue: initFileListHold.fileList.length === 0 ? '' : initFileListHold,
                    rules: [
                      { required: true, message: '请上传法人身份证的正面照片' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传法人身份证的正面照片'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
                      onPreview={this.handlePreview}
                      defaultFileList={defaultFileListHold}
                      beforeUpload={this.beforeUpload}
                    >
                      {this.props.form.getFieldValue('idCardFont') && this.props.form.getFieldValue('idCardFont').fileList.length > 0 ? null : (idCardFontFlag ? uploadButton : null)}
                    </Upload>
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="法人身份证照片(反面)"
                  hasFeedback
                >
                  {getFieldDecorator('idCardBack', {
                    initialValue: initFileListBack.fileList.length === 0 ? '' : initFileListBack,
                    rules: [
                      { required: true, message: '请上传法人身份证的反面照片' },
                      { validator: (rule, value, callback) => { this.checkPhoto(rule, value, callback, '请上传法人身份证的反面照片'); } }
                    ],
                  })(
                    <Upload
                      {...uploadConfig}
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
                  label="商户名称"
                  validateStatus={validateStatus}
                  help={info !== '' ? info : ''}
                  hasFeedback
                >
                  {getFieldDecorator('SiteName', {
                    initialValue: currentInfo.SiteName,
                    rules: [{
                      required: true,
                      message: '请输入商户名称',
                      validator: this.checkSiteNameConfirm
                    }],
                  })(
                    <Input />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="联系人手机号"
                  hasFeedback
                >
                  {getFieldDecorator('CorporateTel', {
                    initialValue: currentInfo.CorporateTel,
                    rules: [
                      { required: true, message: '请输入您的手机号' },
                      { pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '请输入正确的手机号' },
                    ],
                  })(
                    <Input onChange={(e) => { this.setState({ telNum: e.target.value }); }} />
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
              <img alt="企业工商执照" style={{ width: '100%' }} src={previewImage} />
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

export default createForm()(ConfirmCompany);
