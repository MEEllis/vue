import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  Spin,
  message,
  Table,
  Tooltip
} from 'antd';
import PropTypes from 'prop-types';
import FL from '../../../utils/FL';
import Icon, * as icons from '../../Icon/js/Icon';
import EditGroup from './EditGroup';
import { A } from '../../Auth/js/Auth';
import HasPriceSecretModal from './HasPriceSecretModal';
import '../../CardType/less/cardType.less';
import '../less/secertPriceUser.less';

const confirm = Modal.confirm;
const createForm = Form.create;
const FormItem = Form.Item;

class ApiPrice extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    isfetching: PropTypes.bool,
    setGroupsResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    cleanGroupsResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    stasticSecretPriceGroup: PropTypes.func.isRequired,
    getDetailsFromGroupId: PropTypes.func.isRequired,
    stasticSecretPriceGroupResult: PropTypes.shape({
      dataSource: PropTypes.object.isRequired
    }),
    createSecretPriceGroupResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    setGroups: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    cleanGroups: PropTypes.func.isRequired,
    setSecretGroup: PropTypes.func.isRequired,
    setSecretGroupResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    deleteSecretGroup: PropTypes.func.isRequired,
    deleteSecretGroupResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getSecretPriceGroupsDealers: PropTypes.func.isRequired,
    getSecretPriceGroupsDealersResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    // getGroupsResult: PropTypes.arrayOf(PropTypes.shape({
    //   GroupCount: PropTypes.number.isRequired
    // })).isRequired,
    getGroupsResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),

  }
  static defaultProps = {
    isfetching: true,
    getSecretPriceGroupsDealersResult: undefined,
    getGroupsResult: undefined,
    setGroupsResult: undefined,
    cleanGroupsResult: undefined,
    createSecretPriceGroupResult: undefined,
    stasticSecretPriceGroupResult: undefined,
    deleteSecretGroupResult: undefined,
    setSecretGroupResult: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: '',
      selectedRows: '',
      commidityType: '',
      selectedData: {},
      modalVisible: false,
      searchVisible: false,
      setGroupVisible: false,
      reload: true,
      reload2: true,
      // 获取密价组列表请求数据
      getAllSecretPriceGroups: {
        pageNumber: 1,
        pageSize: FL.PAGESIZE
      },
      // 已密价商品弹框
      hasPriceSecretModal: false,
      columns: [
        {
          title: '商户编号',
          dataIndex: 'DealerId'
        },
        {
          title: '商户名称',
          dataIndex: 'DealerName'
        },
        {
          title: '所属密价组',
          dataIndex: 'GroupName',
          render: (text) =>
            <span>{text ? text : '未分组'}</span>
        },
        {
          title: '已对接卡仓商品数',
          dataIndex: 'DockProductCount'
        }, {
          title: '已密价商品数',
          dataIndex: 'SecretPriceProductCount',
          render: (text, record) =>
            <a onClick={() => { this.showHasPriceSecretModal(record); }}>{text}</a>
        },
        {
          title: '操作',
          dataIndex: '',
          render: (data) => (<span>
            <A
              authOpts={{ hint: '移动分组' }}
              onClick={() => {
                this.moveOneGroup(data);
              }}
            >
              <span style={{ paddingRight: '15px' }} >
                <Icon glyph={icons.yidong}></Icon>
              </span>
            </A>
            {data.GroupName && <A
              authOpts={{ hint: '清除分组' }}
              onClick={() => {
                this.clearOneGroup(data);
              }}
            >
              <span style={{ paddingRight: '15px' }} >
                <Icon glyph={icons.qingchu} />
              </span>
            </A>}
          </span>)
        }
      ],
      // 获取密价组列表请求数据
      dataSource: [],
      dataSourceGetGroups: [],
      isNewGroup: false,
      apiGroup: '', // 选择的分组名称
      groupName: '', // 添加的分组名称
      showGroupSettingFlag: false, // 是否展示分组设置功能
      addGroupFlag: false, // 是否展示新增分组功能
      groupId: '', // 根据groupId查询商户分组(2主要是为了区分和其余的groupId不同)
      stasticSecretPriceGroupDataSource: {
        AllDealerCount: 0,
        NoSecretPriceGroupDealerCount: 0,
        SecretPriceGroupDealerCountList: []
      }, // 统计密价组内客户数量
      addGroupName: '', // 添加的分组名称
      dealerIds: [], // 保存客户站点（清除单个分组）
      hasPriceSecretGroupId: ''
    };
  }
  componentWillMount() {
    const { props } = this;
    // 加载商户数据
    this.getData('');
    // 加载密价组客户数量
    props.stasticSecretPriceGroup();
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { selectedRows, addGroupFlag, dealerIds, selectedRowKeys, groupId } = this.state;
    const {
      getGroupsResult, setGroupsResult,
      createSecretPriceGroupResult,
      cleanGroupsResult,
      getSecretPriceGroupsDealersResult,
      stasticSecretPriceGroupResult,
      deleteSecretGroupResult,
      setSecretGroupResult } = nextProps;
    // 统计密价组内客户数量
    if (stasticSecretPriceGroupResult !== props.stasticSecretPriceGroupResult) {
      stasticSecretPriceGroupResult.dataSource.SecretPriceGroupDealerCountList.map((item) => {
        const value = item;
        value.clickStyle = false;
        if (item.GroupId === groupId) {
          value.clickStyle = true;
        }
        return value;
      });
      this.setState({
        stasticSecretPriceGroupDataSource:
        stasticSecretPriceGroupResult.dataSource
      });
    }
    // 获取商品分类
    if (getSecretPriceGroupsDealersResult !== props.getSecretPriceGroupsDealersResult) {
      this.setState({ dataSource: getSecretPriceGroupsDealersResult.dataSource });
    }
    // 获取设置分组数据
    if (getGroupsResult !== props.getGroupsResult) {
      this.setState({ dataSourceGetGroups: getGroupsResult.dataSource });
    }

    // 设置分组
    if (setGroupsResult !== props.setGroupsResult) {
      if (setGroupsResult.Status === 200) {
        // 加载商户数据
        this.getData(groupId);
        // 加载密价组客户数量
        props.stasticSecretPriceGroup();
        this.setState({ setGroupVisible: false, selectedRowKeys: [] });
      }
    }

    // 创建分组 然后设置分组
    if (createSecretPriceGroupResult !== props.createSecretPriceGroupResult) {
      if (createSecretPriceGroupResult.Status === 200) {
        // 如果不是新增分组
        if (!addGroupFlag) {
          // 如果是点击行内的移动分组
          if (selectedRowKeys.length === 0) {
            props.setGroups({ GroupId: createSecretPriceGroupResult.Data.Id, Dealer: dealerIds });
          } else {
            const Dealer = [];
            for (let i = 0; i < selectedRows.length; i += 1) {
              Dealer[i] = {};
              Dealer[i].DealerId = selectedRows[i].DealerId;
              Dealer[i].DealerName = selectedRows[i].DealerName;
            }
            props.setGroups({ GroupId: createSecretPriceGroupResult.Data.Id, Dealer });
          }
        } else {
          message.success('创建成功');
          this.setState({
            addGroupFlag: false,
            addGroupName: ''
          });
          // 加载密价组客户数量
          props.stasticSecretPriceGroup();
        }
      }
    }
    // 清除分组
    if (cleanGroupsResult !== props.cleanGroupsResult) {
      if (cleanGroupsResult.Status === 200) {
        // 加载商户数据
        this.getData(groupId);
        props.stasticSecretPriceGroup();
        this.setState({ selectedRowKeys: [] });
      }
    }
    // 删除密价组
    if (deleteSecretGroupResult !== props.deleteSecretGroupResult) {
      if (deleteSecretGroupResult.Status === 200) {
        // 加载商户数据
        this.getData(groupId);
        // 加载密价组客户数量
        props.stasticSecretPriceGroup();
        this.setState({ selectedRowKeys: [] });
      }
    }
    // 修改密价组
    if (setSecretGroupResult !== props.setSecretGroupResult) {
      if (setSecretGroupResult.Status === 200) {
        // 加载商户数据
        this.getData(groupId);
        // 加载密价组客户数量
        props.stasticSecretPriceGroup();
        this.setState({ selectedRowKeys: [] });
      } else if (setSecretGroupResult.Status === 500 && setSecretGroupResult.Message === '密价组已经存在') {
        // 加载密价组客户数量
        props.stasticSecretPriceGroup();
      }
    }
  }
  // 关闭已密价商品
  onClose = () => {
    this.setState({ modalVisible: false, setGroupVisible: false, hasPriceSecretModal: false });
  }
  // 分页查询密价组进货商
  getData = (groupId) => {
    this.props.getSecretPriceGroupsDealers({ groupId });
  }
  setGroup = () => {
    const { props } = this;
    const { selectedRows, selectedRowKeys, dealerIds } = this.state;

    if (!this.state.apiGroup) {
      message.error('请选择分组');
      return false;
    }
    if (this.state.apiGroup === 'newGroup' && !this.state.groupName) {
      message.error('请输入新分组名称');
      return false;
    }

    if (this.state.apiGroup === 'newGroup') {
      this.setState({
        addGroupFlag: false
      });
      props.createSecretPriceGroup({ name: this.state.groupName });
    } else {
      // 如果不是批量移动分组
      if (selectedRowKeys.length === 0) {
        props.setGroups({ GroupId: this.state.apiGroup, Dealer: dealerIds });
      } else {
        const Dealer = [];
        for (let i = 0; i < selectedRows.length; i += 1) {
          Dealer[i] = {};
          Dealer[i].DealerId = selectedRows[i].DealerId;
          Dealer[i].DealerName = selectedRows[i].DealerName;
        }
        props.setGroups({ GroupId: this.state.apiGroup, Dealer });
      }
    }
  }
  getAllSecretPriceGroups() {
    if (!this.state.selectedRowKeys.length) {
      message.error('请选择客户');
      return false;
    }
    this.setState({ setGroupVisible: true, dealerIds: [] });
    this.props.getGroups();
  }

  // 修改分组
  setSecretGroup = (item) => {
    this.props.setSecretGroup({
      GroupName: item.GroupName,
      GroupId: item.GroupId
    });
  }

  AddGroup(e) {
    const apiGroup = e;
    let isNewGroup = false;
    if (e === 'newGroup') {
      isNewGroup = true;
    }
    this.setState({ isNewGroup, apiGroup });
  }
  // 展示已密价商品
  showHasPriceSecretModal = (record) => {
    if (record.SecretPriceProductCount) {
      this.setState({
        hasPriceSecretModal: true,
        hasPriceSecretGroupId: record.GroupId
      });
    }
  }
  // 点击分组设置
  showGroupSetting = () => {
    this.setState({
      showGroupSettingFlag: !this.state.showGroupSettingFlag
    });
  }
  // 新增分组
  addGroup = () => {
    this.setState({
      addGroupFlag: true,
    });
  }
  // 取消新增分组
  cancelEditGroup = () => {
    this.setState({
      addGroupFlag: false,
      addGroupName: ''
    });
  }
  // 确定新增分组
  okAddGroup = () => {
    const { props } = this;
    if (this.state.addGroupName === '') {
      message.error('请填写分组');
      return false;
    }
    props.createSecretPriceGroup({ name: this.state.addGroupName });
  }
  showGroupInfo = (item, index) => {
    const { stasticSecretPriceGroupDataSource } = this.state;
    const groupId = item.GroupId;
    stasticSecretPriceGroupDataSource.SecretPriceGroupDealerCountList.map((data) => {
      const value = data;
      value.clickStyle = false;
      return value;
    });
    stasticSecretPriceGroupDataSource.SecretPriceGroupDealerCountList[index].clickStyle = true;
    this.setState({
      groupId
    });
    this.getData(groupId);
  }
  // 新增分组用户输入组名
  groupNameOnChange = (e) => {
    // addGroupName
    this.setState({
      addGroupName: e.target.value
    });
  }
  // 删除分组
  deleteSecretGroup = (groupId) => {
    this.props.deleteSecretGroup({ groupId });
  }
  clearGroup() {
    if (!this.state.selectedRowKeys.length) {
      message.error('请选择客户');
      return false;
    }
    confirm({
      title: '清空分组后，之前设置的密价关系将失效，涉及到的相关商户无法继续享受密价优惠，确定要清除分组吗？',
      onOk: () => {
        const { selectedRows } = this.state;
        const DealerIds = [];
        for (let i = 0; i < selectedRows.length; i += 1) {
          DealerIds[i] = selectedRows[i].DealerId;
        }
        this.props.cleanGroups({ DealerIds });
      }
    });
  }
  // 移动分组
  moveOneGroup = (item) => {
    const { dealerIds } = this.state;
    dealerIds[0] = item;
    this.setState({ selectedRowKeys: [], setGroupVisible: true, dealerIds });
    this.props.getGroups();
  }
  // 清除分组
  clearOneGroup = (item) => {
    confirm({
      title: '清空分组后，之前设置的密价关系将失效，涉及到的相关商户无法继续享受密价优惠，确定要清除分组吗？',
      onOk: () => {
        const DealerIds = [];
        DealerIds[0] = item.DealerId;
        this.props.cleanGroups({ DealerIds });
      }
    });
  }
  render() {
    const { props } = this;
    const {
      selectedRowKeys,
      showGroupSettingFlag,
      addGroupFlag,
      stasticSecretPriceGroupDataSource,
      hasPriceSecretGroupId
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const selectedData = [];
        for (const k in selectedRows) {
          selectedData.push({
            AccountId: selectedRows[k].OpenId,
            GroupId: selectedRows[k].GroupId
          });
        }
        this.setState({ selectedRowKeys, selectedRows, selectedData });
      }
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 12
      }
    };
    const { isfetching, getDetailsFromGroupIdResult } = props;


    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="setSecretPriceGroup">
        <div className="left">
          <Spin spinning={isfetching}>
            <div className="seceretPriceGroup">
              密价组
              {showGroupSettingFlag ? <span style={{ color: '#1bcdc4' }}>
                <Tooltip title="取消">
                  <span onClick={this.showGroupSetting}>
                    取消
                  </span>
                </Tooltip>
              </span> : <span>
                  <Tooltip title="设置">
                    <span onClick={this.showGroupSetting}>
                      <Icon glyph={icons.iSetting}></Icon>
                    </span>
                  </Tooltip>
                </span>}

            </div>
            <div className="group">
              <ul>
                {stasticSecretPriceGroupDataSource.SecretPriceGroupDealerCountList.map((item, index) => (
                  <EditGroup
                    index={index}
                    setSecretGroup={this.setSecretGroup}
                    deleteSecretGroup={this.deleteSecretGroup}
                    showGroupInfo={this.showGroupInfo}
                    item={item}
                    showGroupSettingFlag={showGroupSettingFlag}
                  />
                ))}
              </ul>
            </div>
            {
              addGroupFlag && <div className="addGroupControl">
                <Input className="groupName" maxLength="20" onChange={this.groupNameOnChange} placeholder="组名" />
                <Tooltip title="取消">
                  <a
                    onClick={this.cancelEditGroup}
                  >
                    <Icon glyph={icons.sanchu} /></a>
                </Tooltip>
                <Tooltip title="确定">
                  <a
                    onClick={this.okAddGroup}
                  >
                    <Icon glyph={icons.gou} /></a>
                </Tooltip>
              </div>
            }
            <div className="addGroup">
              <a onClick={this.addGroup}><Icon glyph={icons.iAdd} /></a>
              <a onClick={this.addGroup}>新增分组</a>
            </div>
          </Spin>
        </div>
        <div className="right">
          <Spin spinning={isfetching}>
            <button
              disabled={!hasSelected}
              className="ant-btn ant-btn-primary"
              onClick={() => {
                this.getAllSecretPriceGroups();
              }}
              style={{
                margin: '0 10px 10px 0'
              }}
            >移动分组</button>

            <button
              disabled={!hasSelected}
              className="ant-btn ant-btn-primary"
              onClick={() => {
                this.clearGroup();
              }}
            >清除分组</button>
            <Table rowKey="DealerId" columns={this.state.columns} dataSource={this.state.dataSource} rowSelection={rowSelection} pagination={false} />
          </Spin>
        </div>
        {this.state.hasPriceSecretModal && <HasPriceSecretModal
          onClose={this.onClose}
          isfetching={this.props.isfetching}
          getDetailsFromGroupId={this.props.getDetailsFromGroupId}
          getDetailsFromGroupIdResult={getDetailsFromGroupIdResult}
          hasPriceSecretGroupId={hasPriceSecretGroupId}
        />}
        <Modal
          onCancel={this.onClose}
          title="移动分组"
          visible={this.state.setGroupVisible}
          footer={[
            <Button
              key="submit"
              type="primary"
              size="large"
              loading={
                this.state.loading
              }
              onClick={
                () => this.setGroup()
              }
            > 确定 </Button>]}
        >
          <div className="modal-demo-content">
            <Spin spinning={false}>
              <Form style={{
                marginBottom: 10
              }}
              >
                <FormItem {...formItemLayout} label='移动到'>
                  {getFieldDecorator('apiGroup', { initialValue: '' })(
                    <Select
                      id="select"
                      size="large"
                      onChange={(e) => {
                        this.AddGroup(e);
                      }}
                    >
                      {this.state.dataSourceGetGroups.map((list, index) => {
                        //   return <Option key={index} value={list.Id}>{list.Name}</Option>
                        if (index === 0) {
                          return (<Select.Option
                            key={list.Id}
                            value={list.Id}
                          >
                            <strong>+ {list.Name}</strong>
                          </Select.Option>);
                        } else {
                          return <Select.Option
                            key={list.Id}
                            value={list.Id}
                          >{list.Name}</Select.Option>;
                        }
                      })}
                    </Select>
                  )}
                </FormItem>
              </Form>
              {this.state.apiGroup === 'newGroup'
                ? <FormItem {...formItemLayout} label="新分组名称">
                  {getFieldDecorator('groupName', { initialValue: this.state.groupName })(<Input
                    maxLength="20"
                    onChange={(e) => {
                      this.setState({ groupName: e.target.value });
                    }}
                  />)}
                </FormItem>
                : ''
              }
            </Spin>
          </div>
        </Modal>
      </div>
    );
  }
}

export default createForm()(ApiPrice);
