import React from 'react';
import { Form, Row, Col, } from 'antd';
import { browserHistory } from 'react-router';
import Icon, * as icons from '../../Icon/js/Icon';
import PropTypes from 'prop-types';
import configs from 'configs';// eslint-disable-line
import '../less/Confirmation.less';

const createForm = Form.create;

class ConfirmWait extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        openId: PropTypes.string.isRequired
      })
    }).isRequired,
    getCurrentResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    })
  }
  static defaultProps = {
    getCurrentResult: undefined,
    // location: undefined
  }
  constructor(props) {
    super(props);
    this.state = {
      currentInfo: [],
      type: props.location.query.type
    };
  }
  componentWillMount() {
    const { props } = this;
    const status = props.location.query.status;
    // 如果用户未通过审核
    if (status === 'true') {
      props.getCurrent();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { getCurrentResult } = nextProps;
    if (getCurrentResult !== this.props.getCurrentResult) {
      if (getCurrentResult.Status === 200) {
        this.setState({ currentInfo: getCurrentResult.Data });
      }
    }
  }
  toAuth = (type) => {
    const openId = this.props.location.query.openId;
    const userName = this.props.location.query.userName;
    if (type === '1') {
      window.location.href = `${window.location.origin}/confirmation?openId=${openId}&userName=${userName}&status=true&type=1`;
    }
    else {
      window.location.href = `${window.location.origin}/confirmation?openId=${openId}&userName=${userName}&status=true`;
    }
  }
  exit = () => {
    browserHistory.push('/Login');
  }
  render() {
    const { currentInfo, type } = this.state;
    if (!currentInfo.SiteIdentification) {
      return false;
    }
    return (
      <div className="confirm">
        <div className="confirm-header">
          <div className="wrapper">
            <div className="header-left">{currentInfo.UserName}</div>
            <div className="header-right">
              <span>{currentInfo.UserName}</span>
              <span className="space">|</span>
              <a href="#this" onClick={this.exit}>退出</a>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="logo-box wait-logo-box">
            <div className="wrapper">
              <div className="confirm-logo"><input style={{ display: 'none' }} /></div>
            </div>
          </div>
          <div className="wrapper">
            <div className="wait-wrapper">
              <div className="confirm-status">
                <span className="status-pic status-wait"><input style={{ display: 'none' }} /></span>
                <div className="font16 confirm-status-txt">
                  <div>尊敬的客户：</div>
                  {type ?
                    <div>
                      您的认证资料未通过平台审核，请
                    <a className="font-blue" onClick={() => { this.toAuth('1'); }}>重新认证</a>
                    </div> :
                    <div>
                      您的认证资料已经提交，请耐心等到我们的审核结果，我们正在飞速审核中！
                    <a className="font-blue" onClick={this.toAuth}>修改认证资料</a>
                    </div>
                  }
                </div>
              </div>
              <div className="confirm-contact">
                <div className="contact-txt">您可以联系我们在线客服或拨打客服电话</div>
                <div className="contact-tip">
                  <div className="tip-box">
                    <div className="contact-icon  contact-tel"><input style={{ display: 'none' }} /></div>
                    <div className="tel-tip-txt">
                      <div className="font16 font-bold">400-112-5566</div>
                      <div className="color444">全国统一客服热线</div>
                    </div>
                  </div>
                  <div className="tip-box qq-tip">
                    <div className="contact-icon contact-qq"><input style={{ display: 'none' }} /></div>
                    <div className="tel-tip-txt">
                      <div className="font16 font-bold">88888888</div>
                      <div className="color444">24小时QQ客服</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-info">
                <div className="wait-wrapper">
                  <p className="user-info-item">
                    <span className="font-blue"><Icon glyph={icons.gou} /></span>
                    <span className="font-blue font-bold">您已提交的认证信息</span>
                  </p>
                  {
                    currentInfo.SiteIdentification.IsCompany ?
                      <div>
                        <div className="user-info-item">
                          <span className="star">*</span>
                          <span className="font-bold">法人姓名</span>
                          <span>：</span>
                          <span className="info-content">{currentInfo.SiteIdentification.CorporateName}</span>
                        </div>
                        <div className="user-info-item">
                          <span className="star">*</span>
                          <span className="font-bold">法人身份证</span>
                          <span>：</span>
                          <span className="info-content">{currentInfo.SiteIdentification.CorporateCode}</span>
                        </div>
                        <div className="user-info-item">
                          <span className="star">*</span>
                          <span className="font-bold">联系人手机号</span>
                          <span>：</span>
                          <span className="info-content">{currentInfo.SiteIdentification.CorporateTel}</span>
                        </div>
                      </div> :
                      <div>
                        <div className="user-info-item">
                          <span className="star">*</span>
                          <span className="font-bold">您的真实姓名</span>
                          <span>：</span>
                          <span className="info-content">{currentInfo.SiteIdentification.RealName}</span>
                        </div>
                        <div className="user-info-item">
                          <span className="star">*</span>
                          <span className="font-bold">您的身份证号</span>
                          <span>：</span>
                          <span className="info-content">{currentInfo.SiteIdentification.IdentityCode}</span>
                        </div>
                        <div className="user-info-item">
                          <span className="star">*</span>
                          <span className="font-bold">您的手机号</span>
                          <span>：</span>
                          <span className="info-content">{currentInfo.SiteIdentification.Tel}</span>
                        </div>
                      </div>
                  }
                </div>
              </div>
            </div>
            <div className="card-pics">
              <div className="wait-wrapper">
                {
                  currentInfo.SiteIdentification.IsCompany ?
                    <Row>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p1"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.BusinessImgObject.Hold}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic">
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>法人身份证照片（正面）</div>
                      </Col>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p2"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.BusinessImgObject.Back}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic">
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>法人身份证照片（反面）</div>
                      </Col>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p3"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.BusinessImgObject.License}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic" >
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>企业工商执照</div>
                      </Col>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p3"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.BusinessImgObject.CodeCertificate}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic" >
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>组织机构代码证</div>
                      </Col>
                    </Row> :
                    <Row>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p1"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.IdentityCodeImgObject.Front}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic">
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>您的身份证照片（正面）</div>
                      </Col>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p2"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.IdentityCodeImgObject.Back}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic">
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>您的身份证照片（反面）</div>
                      </Col>
                      <Col span={8} className="space">
                        <div className="card-pics-item">
                          <div
                            className="pic-item p3"
                            style={{
                              background: `url(${currentInfo.SiteIdentification.IdentityCodeImgObject.Hold}) center no-repeat`,
                              backgroundSize: 'contain'
                            }}
                          >
                            <div className="view-pic" >
                              <Icon glyph={icons.viewPic} />
                            </div>
                          </div>
                        </div>
                        <div>您的身份证照片（手持照）</div>
                      </Col>
                    </Row>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="wrapper">
            <div>
              <a href="#this">© 2010-2016 fulu.co   m 版权所有 著作权与商标声明</a><span className="space">|</span>
              <a href="#this">法律声明</a><span className="space">|</span>
              <a href="#this">服务条款</a><span className="space">|</span>
              <a href="#this">隐私声明</a><span className="space">|</span>
              <a href="#this">关于福禄</a><span className="space">|</span>
              <a href="#this">联系我们</a><span className="space">|</span>
              <a href="#this">网站导航</a>
            </div>
            <div>
              <a href="#this">福禄网游数卡专营店</a><span className="space">|</span>
              <a href="#this">卡门网</a><span className="space">|</span>
              <a href="#this">卡仓网</a><span className="space">|</span>
              <a href="#this">福禄充值</a><span className="space">|</span>
              <a href="#this">API合作</a><span className="space">|</span>
              <a href="#this">爱奇艺</a><span className="space">|</span>
              <a href="#this">合作伙伴一</a><span className="space">|</span>
              <a href="#this">合作伙伴二</a><span className="space">|</span>
              <a href="#this">合作伙伴三</a>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default createForm()(ConfirmWait);
