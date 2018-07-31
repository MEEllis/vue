import React from 'react';
import { Form } from 'antd';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import '../less/Confirmation.less';
import ConfirmBegin from '../../Confirmation/js/ConfirmBegin';

const createForm = Form.create;

class Confirmation extends React.Component {
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
  state = {
    currentInfo: {},
    headName: ''
  };
  componentWillMount() {
    const { props } = this;
    const status = props.location.query.status;
    // 如果用户未通过审核
    if (status === 'true') {
      props.getCurrent();
    } else {
      this.setState({
        headName: '用户名'
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { getCurrentResult } = nextProps;
    if (getCurrentResult !== this.props.getCurrentResult) {
      if (getCurrentResult.Status === 200) {
        this.setState({ currentInfo: getCurrentResult.Data.SiteIdentification, headName: getCurrentResult.Data.UserName });
      }
    }
  }
  exit = () => {
    browserHistory.push('/Login');
  }
  render() {
    const { openId, userName, status, type } = this.props.location.query;
    return (
      <div className="confirm">
        <div className="confirm-header">
          <div className="wrapper">
            <div className="header-left">{this.state.headName}</div>
            <div className="header-right">
              <span>{this.state.headName}</span>
              <span className="space">|</span>
              <a href="#this" onClick={this.exit}>退出</a>
            </div>
          </div>
        </div>
        <div className="main">
          <ConfirmBegin
            currentInfo={this.state.currentInfo}
            openId={openId}
            userName={userName}
            status={status === 'true'}
            type={type === '1' ? true : false}
          />
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

export default createForm()(Confirmation);
