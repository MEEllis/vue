import React from 'react';
import { Tabs, Form } from 'antd';
import Icon, * as icon from '../../../components/Icon/js/Icon';
import '../less/Confirmation.less';
import PropTypes from 'prop-types';
import ConfirmCompany from '../../../containers/ConfirmCompany';
import ConfirmPerson from '../../../containers/ConfirmPerson';

const createForm = Form.create;
const TabPane = Tabs.TabPane;

class ConfirmBegin extends React.Component {
  static propTypes = {
    openId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    currentInfo: PropTypes.shape({
      IsCompany: PropTypes.object
    })
  }
  static defaultProps = {
    info: undefined,
    currentInfo: undefined
  }
  state = {
    activeKey: '1'
  }
  render() {
    const { status, openId, userName, currentInfo, type } = this.props;
    const getKey = currentInfo.IsCompany ? '2' : '1';
    return (
      <div className="wrapper">
        <div className="logo-box">
          <div className="confirm-logo"><input style={{ display: 'none' }} /></div>
          {type && <span className="checkNoPass"><Icon glyph={icon.jinggao}></Icon>您的资质未通过审核，请修改认证信息，再次提交</span>}
          <div className="tip">
            <input style={{ display: 'none' }} />
          </div>
        </div>
        <Tabs type="card" activeKey={status ? getKey : this.state.activeKey} onChange={(key) => { !status && this.setState({ activeKey: key }); }} >
          <TabPane tab="个人认证" key="1" className="tab-box">
            <ConfirmPerson
              currentInfo={currentInfo}
              openId={openId}
              userName={userName}
              status={status}
            />
          </TabPane>
          <TabPane tab="企业认证" key="2">
            <ConfirmCompany
              currentInfo={currentInfo}
              openId={openId}
              userName={userName}
              status={status}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default createForm()(ConfirmBegin);
