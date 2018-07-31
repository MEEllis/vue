import React, { Component } from 'react';
import { IndexLink } from 'react-router';
// import LoginForm from './LoginForm'
import LoginForm from '../../../containers/LoginForm';
import '../less/login';

class Login extends Component {
  render() {
    return (
      <div className="sign">
        <div className="header">
          <div className="inner">
            <h1 className="logo-wrap">
              <IndexLink className="logo" to="/login"><span>卡仓网</span></IndexLink>
            </h1>
            {/* <Button type="primary" onClick={ () => { location.reload(true) }}>刷新页面</Button> */}
          </div>
        </div>
        <div className="container">
          <div className="inner">
            <LoginForm />
          </div>
        </div>
        <div className="footer">
          <div className="inner">
            <p className="copyright">Copyright &copy; 2009-2016 <a href="http://www.fulu.com/" target="_black">武汉福禄网络科技有限公司</a> All Rights Reserved.</p>
            <p className="id">
              <span>
                互联网文化经营许可证号：
                                <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/dc591ebe583844c9970adbc286318d23">鄂网文〔2016〕1125-021号</a>
              </span>
              <span className="divider">|</span>
              <span>
                IP 备案：
                                鄂 B2-20130116
                            </span>
              <span className="divider">|</span>
              <span>
                ICP 电信增值：
                                鄂 ICP10020006
                            </span>
            </p>
            <p className="search">
              <a href="#">
                <img src="http://www.fulu.com/img/law2.png" />
                互联网违法信息查询-12377
                            </a>
              <span className="divider">|</span>
              <a href="#">
                <img src="http://www.fulu.com/img/law3.png" />
                可信网站查询
                            </a>
              <span className="divider">|</span>
              <a href="#">
                <img src="http://www.fulu.com/img/law1.png" />
                工商证件查询
                            </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
