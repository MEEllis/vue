import React, { PropTypes } from 'react';
import { Form } from 'antd';
import { Link } from 'react-router';
import '../less/Confirmation.less';

const createForm = Form.create;

class ConfirmPassed extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
    }).isRequired
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="confirm">
        <div className="confirm-header">
          <div className="wrapper">
            <div className="header-left">请叫我小五福</div>
            <div className="header-right">
              <span>请叫我小五福</span>
              <span className="space">|</span>
              <a href="#this">退出</a>
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
                <span className="status-pic status-pass"><input style={{ display: 'none' }} /></span>
                <div className="font16 confirm-status-txt">
                  <div>尊敬的客户：</div>
                  <div>您的认证资料已通过审核，已为您开通了卡门网的使用权限。<Link to="/login">登录卡仓网</Link></div>
                  <div>为保证平台的供货质量，卡仓网的使用权限，需要您联系我们的客服，作进一步的认证审核。</div>
                </div>
              </div>
              <div className="confirm-contact">
                <div className="contact-txt">您可以联系我们在线客服或拨打客服电话</div>
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
      </div>
    );
  }
}

export default createForm()(ConfirmPassed);
