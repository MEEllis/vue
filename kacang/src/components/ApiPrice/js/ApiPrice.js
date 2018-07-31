import React from 'react';
import { Spin, Tabs } from 'antd';
import { browserHistory } from 'react-router';
import SecretPriceProduct from '../../../containers/ApiPriceSecretPriceProduct';
import SecretPriceGroup from '../../../containers/ApiPriceSecretPriceGroup';
import { Button } from '../../Auth/js/Auth';
import '../../CardType/less/cardType.less';

const TabPane = Tabs.TabPane;

class ApiPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commidityType: '',
      modalVisible: false,
      searchVisible: false,
      setGroupVisible: false,
      // 头部的Alink数据放此listForm
      listForm: {
        commidityType: ['设置秘价组', '按商品给秘价', '按组给秘价']
      },
      columns: [],
      reload: false,
      activeKey: '1'
    };
  }
  componentWillMount() {
    const { props } = this;
    const type = props.location.query.type;
    if (type && type !== 'false') {
      this.setState({
        activeKey: '2'
      });
    } else {
      this.setState({
        activeKey: '1'
      });
    }
  }
  onClose() {
    this.setState({ modalVisible: false, setGroupVisible: false });
  }
  goGroup = () => {
    browserHistory.push('/supply/price/group');
  }
  render() {
    const { props } = this;
    const { activeKey } = this.state;
    if (props.children) return props.children;
    return (
      <div>
        <Spin spinning={false}>
          <div className="text-right">
            <Button auth="priceGroup" authOpts={{ hint: '管理密价组' }} type="primary" onClick={this.goGroup}>管理密价组</Button>
          </div>

          <Tabs defaultActiveKey={activeKey} animated={false}>
            <TabPane tab="按商品给密价" key="1">
              <SecretPriceProduct />
            </TabPane>
            <TabPane tab="按组给密价" key="2">
              <SecretPriceGroup />
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

export default ApiPrice;
