import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { NProgress } from 'redux-nprogress';
import { Scrollbars } from 'react-custom-scrollbars';
import QueueAnim from 'rc-queue-anim';
import 'rework';// eslint-disable-line
import { Spin, Breadcrumb } from 'antd';
import Header from '../../../containers/Header';
import AccordionMenu from '../../../containers/AccordionMenu';
import '../less/index.less';
import '../less/ant-append.less';
import '../../Scrollbar/less/scrollbar.less';
import Placeholder from '../../Placeholder/js/Placeholder';

class Index extends Component {
  static childContextTypes = {
    pageSize: PropTypes.number.isRequired,
  };
  static propTypes = {
    getCurrent: PropTypes.func.isRequired,
    getSubAccountPermissionListExtend: PropTypes.func.isRequired,
    getCurrentResult: PropTypes.shape(),
    getSubAccountPermissionListExtendResult: PropTypes.shape(),
    routes: PropTypes.arrayOf(PropTypes.shape()),
    params: PropTypes.shape(),
  }

  constructor(props) {
    super(props);
    this.state = {
      isMini: true
    };
  }

  getChildContext() {
    return {
      pageSize: 10
    };
  }
  componentDidMount() {
    this.props.getCurrent({ openId: localStorage.getItem('openId') });
  }

  componentWillReceiveProps(nextProps) {
    const { getCurrentResult } = nextProps;
    if (this.props.getCurrentResult !== getCurrentResult) {
      if (getCurrentResult.Data.IsSubUser) {
        this.props.getSubAccountPermissionListExtend({ openId: localStorage.getItem('openId') });
      }
    }
  }

  toggleSidebar = (isMini) => {
    this.setState({ isMini });
  }

  breadcrumbItemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
  }
  render() {
    const { props } = this;
    const { getCurrentResult, getSubAccountPermissionListExtendResult,
      routes, params } = this.props;
    if (!getCurrentResult ||
      (!getSubAccountPermissionListExtendResult &&
        (getCurrentResult && getCurrentResult.Data.IsSubUser))) {
      return (
        <Spin size="large" tip="正在获取权限">
          <div style={{ width: '100%', height: '100vh' }} />
        </Spin>
      );
    }
    return (
      <div className={this.state.isMini ? 'app collapsed' : 'app'}>
        <NProgress color="rgba(240, 173, 79, 1)" />
        <Header {...props} />
        <div className="app-wrapper">
          <AccordionMenu
            toggleSidebar={this.toggleSidebar}
            pathname={props.location.pathname}
          />
          <div className="app-container">
            <Scrollbars
              autoHide
              autoHideTimeout={500}
              autoHideDuration={100}
              autoHeightMin={200}
            >
              <QueueAnim
                className="help-container help-container-queue-anim-wrap"
                type={['bottom', 'top']}
                ease={'easeInOutQuart'}
              >
                <div key={props.location.pathname.split('/')} className="app-container-inner" >
                  <div className="app-breadcrumb">
                    <Breadcrumb
                      routes={routes}
                      params={params}
                      itemRender={this.breadcrumbItemRender}
                    />
                  </div>
                  {props.children || (<Placeholder
                    className="placeholder-index"
                    title="欢迎访问卡仓网。"
                  />)}
                </div>
              </QueueAnim>
            </Scrollbars>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
