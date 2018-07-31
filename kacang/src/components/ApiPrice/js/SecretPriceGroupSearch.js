
import React from 'react'
import PropTypes from 'prop-types';
import {
  Input,
  Form,
  Row,
  Col,
  Select,
  Table,
  Button,
  Spin,
  Modal
} from 'antd';
import { browserHistory } from 'react-router';
import { dateFormat } from '../../../utils';
import { RangePicker } from 'react-component-date';

import FL from '../../../utils/FL';
import Settings from './Settings';
import IconComponent from '../../IconComponent/js/IconComponent';
import Icon, * as icons from '../../Icon/js/Icon';
const confirm = Modal.confirm;
import '../less/secertPriceUser.less';

const createForm = Form.create;
const FormItem = Form.Item;

class SecretPriceGroupSearch extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    getProductListPriceGroups: PropTypes.func.isRequired,
    getProductListPriceGroupsResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    location: PropTypes.shape({
      query: PropTypes.shape({
        GroupId: PropTypes.string
      })
    }),
    getSecretPriceFromProductidPriceGroups: PropTypes.func.isRequired,
    getSecretPriceFromProductidPriceGroupsResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getSubcategoryList: PropTypes.func.isRequired,
    setSecretPriceAndPriceGroup: PropTypes.func.isRequired,
    getSubcategoryListResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getSingleSecretPriceGroups: PropTypes.func.isRequired,
    getSingleSecretPriceGroupsResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    cleanSecretPriceGroup: PropTypes.func.isRequired,
    cleanSecretPriceGroupResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    setSecretPriceAndPriceGroupResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  }
  static defaultProps = {
    setSecretPriceAndPriceGroupResult: undefined,
    isfetching: true,
    getProductListPriceGroupsResult: [],
  }
  state = {
    GroupId: '',
    CategoryIdSource: [],
    dataSourceGetProductSecretPriceListByGroup: [],
    dataGetSingleSecretPriceGroup: [],
    // 获取商品列表查询条件
    postDataGetProductSecretPriceListByGroup: {
      condition: {
        Id: '', // 商品编号
        Name: '', // 商品名称
        ProductType: '', // 商品性质
        CategoryId: '', // 商品类型
        FaceValue: '', //  商品面值
        RelationType: '', // 库存对接
        SaleStatus: '', // 上下架
        StockStatus: '', // 库存状态
        BeginTime: '',
        EndTime: '',
        PageNumber: 1, // 传递给后端
        PageSize: FL.PAGESIZE, // 传递给后端
      }
    },
    locationData: {},
    modalVisible: false
  }
  componentWillMount() {
    const { props } = this;
    const { postDataGetProductSecretPriceListByGroup } = this.state;
    const GroupId = this.props.location.query.GroupId;
    // 加载商品类型
    this.props.getSubcategoryList({ parentId: '' });
    // 查询按组给密价 弹出框
    props.getSingleSecretPriceGroups({
      GroupId
    });
    this.setState({ GroupId });
    this.props.getProductListPriceGroups(postDataGetProductSecretPriceListByGroup.condition);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const {
      postDataGetProductSecretPriceListByGroup,
      GroupId,
      dataSourceGetProductSecretPriceListByGroup,
    } = this.state;
    const {
      getProductListPriceGroupsResult,
      getSecretPriceFromProductidPriceGroupsResult,
      getSubcategoryListResult,
      getSingleSecretPriceGroupsResult,
      cleanSecretPriceGroupResult,
      setSecretPriceAndPriceGroupResult
    } = nextProps;
    // 获取商品分类
    if (getSubcategoryListResult !== props.getSubcategoryListResult) {
      this.setState({ CategoryIdSource: getSubcategoryListResult.dataSource });
    }
    // 按组给密价弹出框列表数据
    if (getProductListPriceGroupsResult !== props.getProductListPriceGroupsResult) {
      const dataSourceGetProductSecretPriceListByGroup = getProductListPriceGroupsResult.dataSource;
      const ProductIds = [];
      for (let i = 0; i < dataSourceGetProductSecretPriceListByGroup.length; i += 1) {
        ProductIds[i] = dataSourceGetProductSecretPriceListByGroup[i].Id;
      }
      if (ProductIds.length !== 0) {
        // 根据商品得到密价
        props.getSecretPriceFromProductidPriceGroups({
          GroupId, ProductIds
        });
      }
      this.setState({
        dataSourceGetProductSecretPriceListByGroup
      });
    }

    // 根据商品得到密价
    if (getSecretPriceFromProductidPriceGroupsResult !==
      props.getSecretPriceFromProductidPriceGroupsResult) {
      for (let i = 0; i < dataSourceGetProductSecretPriceListByGroup.length; i += 1) {
        // 默认值
        dataSourceGetProductSecretPriceListByGroup[i].GroupCount = 0;
        dataSourceGetProductSecretPriceListByGroup[i].SecretPrice = '';
        for (let j = 0; j < getSecretPriceFromProductidPriceGroupsResult.length; j += 1) {
          if (dataSourceGetProductSecretPriceListByGroup[i].Id ===
            getSecretPriceFromProductidPriceGroupsResult[j].ProductId) {
            dataSourceGetProductSecretPriceListByGroup[i].GroupCount =
              getSecretPriceFromProductidPriceGroupsResult[j].GroupCount;
            dataSourceGetProductSecretPriceListByGroup[i].SecretPrice =
              getSecretPriceFromProductidPriceGroupsResult[j].SecretPrice;
          }
        }
      }
      this.setState({
        dataSourceGetProductSecretPriceListByGroup
      });
    }
    // 获取商品分类
    if (getSingleSecretPriceGroupsResult !== props.getSingleSecretPriceGroupsResult) {
      this.setState({
        dataGetSingleSecretPriceGroup: getSingleSecretPriceGroupsResult
      });
    }

    // 设置密价
    if (setSecretPriceAndPriceGroupResult !== props.setSecretPriceAndPriceGroupResult) {
      if (setSecretPriceAndPriceGroupResult.Status === 200) {
        // 隐藏
        this.hideSettingModal();
        // 按组给密价弹框
        props.getProductListPriceGroups(postDataGetProductSecretPriceListByGroup.condition);
        // 查询按组给密价 弹出框
        props.getSingleSecretPriceGroups({
          GroupId
        });
      }
    }

    // 清除密价
    if (cleanSecretPriceGroupResult !== props.cleanSecretPriceGroupResult) {
      if (cleanSecretPriceGroupResult.Status === 200) {
        // 按组给密价弹框
        props.getProductListPriceGroups(postDataGetProductSecretPriceListByGroup.condition);
        // 查询按组给密价 弹出框
        props.getSingleSecretPriceGroups({
          GroupId
        });
      }
    }
  }
  // 设置密价
  settings = (data) => {
    // 设置密价
    this.props.setSecretPriceAndPriceGroup({
      GroupId: this.state.GroupId,
      ProductId: data.Id,
      Price: data.Price,
      SecretPrice: data.SecretPrice,
    });
  }
  // 清除密价
  clearSettings = (data) => {
    confirm({
      title: '清空密价后，之前设置的密价关系将失效，涉及到的相关商户无法继续享受密价优惠，确定要清除吗？',
      onOk: () => {
        this.props.cleanSecretPriceGroup({
          GroupId: this.state.GroupId,
          ProductId: data.Id
        });
      }
    });
  }
  searchSecretPriceGroup = () => {
    this.props.form.validateFields((err, value) => {
      const { postDataGetProductSecretPriceListByGroup } = this.state;
      postDataGetProductSecretPriceListByGroup.condition.pageNumber = 1;
      const condition = postDataGetProductSecretPriceListByGroup.condition;
      Object.assign(condition, value);
      condition.BeginTime = value.Time[0] ? dateFormat(value.Time[0]) : '';
      condition.EndTime = value.Time[0] ? dateFormat(value.Time[1]) : '';
      postDataGetProductSecretPriceListByGroup.condition = condition;
      // 查询商品列表
      this.props.getProductListPriceGroups(postDataGetProductSecretPriceListByGroup.condition);
      this.setState({
        postDataGetProductSecretPriceListByGroup,
      });
    });
  }
  backToGroup = () => {
    const query = {
      type: true
    };
    browserHistory.push({ pathname: '/supply/price', query });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      BeginTime: '',
      EndTime: '',
      Id: '',
      Name: '',
      FaceValue: '',
      CategoryId: '',
      SaleStatus: '',
      StockStatus: ''
    });
  }
  showSettingModal = (data) => {
    this.setState({
      modalVisible: true,
      locationData: data,
    });
  }
  hideSettingModal = () => {
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { props } = this;
    const { postDataGetProductSecretPriceListByGroup, dataGetSingleSecretPriceGroup, modalVisible,
      locationData } = this.state;
    const { getFieldDecorator } = props.form;
    const { isfetching, getProductListPriceGroupsResult } = props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const columnsGetProductSecretPriceListByGroup = [{
      title: '商品名称(编号)',
      dataIndex: 'Name',
      render: (data, record) => (
        <span>{record.Name}({record.Id})</span >
      )
    }, {
      title: '商品类型',
      dataIndex: 'ProductType'
    }, {
      title: '库存名称(编号)',
      dataIndex: 'AssociateName',
      render: (data, record) => <span>{record.AssociateName}({record.AssociateId})</span>
    }, {
      title: '库存状态',
      dataIndex: 'StockStatus'
    }, {
      title: '面值',
      dataIndex: 'FaceValue'
    }, {
      title: '售价',
      dataIndex: 'Price'
    },
    {
      title: '密价',
      render: (data) => (
        <span>
          {data.SecretPrice ? data.SecretPrice : <span className="orange">未设置</span>}
        </span>
      )
    }, {
      title: '操作',
      dataIndex: '',
      width: '130px',
      render: (data) =>
        (<div>
          <span className={'mr10'} onClick={() => this.showSettingModal(data)}>
            {
              data.SecretPrice > 0 ?
                <IconComponent title={'修改'} glyphIcon={icons.iEdit} /> :
                <IconComponent title={'设置'} glyphIcon={icons.iSetting} />
            }
          </span>
          {data.SecretPrice > 0 &&
            <span onClick={() => this.clearSettings(data)}>
              <IconComponent title={'清除密价'} glyphIcon={icons.qingchumijia} />
            </span>
          }
          {/* <Settings data={data} change={(id) => { this.setSecretPrice(id) }} />*/}
        </div>)
    }];
    const searchLists = [
      <Col span={8} key={1}>
        <FormItem
          {...formItemLayout}
          label={'商品编号'}
        >
          {getFieldDecorator('Id', {
            initialValue: ''
          })(
            <Input type="text" />
            )}
        </FormItem>
      </Col>,
      <Col span={8} key={2}>
        <FormItem
          {...formItemLayout}
          label={'商品名称'}
        >
          {getFieldDecorator('Name', {
            initialValue: ''
          })(
            <Input type="text" />
            )}
        </FormItem>
      </Col>,

      <Col span={8} key={4}>
        <FormItem
          {...formItemLayout}
          label={'库存状态'}
        >
          {getFieldDecorator('StockStatus', {
            initialValue: ''
          })(
            <Select placeholder="请选择状态">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="1">断货</Select.Option>
              <Select.Option value="2">警报</Select.Option>
              <Select.Option value="3">充足</Select.Option>
            </Select>
            )}
        </FormItem>
      </Col>,
      <Col span={8} key={8}>
        <FormItem
          {...formItemLayout}
          label={'发布时间'}
        >
          {getFieldDecorator('Time', {
            initialValue: ''
          })(
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
            />
            )}
        </FormItem>
      </Col>];
    // 商品列表总数
    const Count = getProductListPriceGroupsResult.TotalPages;
    // 商品列表分页
    const getSecretPriceGroupsPagination = {
      total: Count,
      showSizeChanger: true,
      current: postDataGetProductSecretPriceListByGroup.condition.pageNumber,
      pageSize: postDataGetProductSecretPriceListByGroup.condition.pageSize,
      onShowSizeChange: (current, pageSize) => {
        postDataGetProductSecretPriceListByGroup.condition.pageSize = pageSize;
        postDataGetProductSecretPriceListByGroup.condition.pageNumber = current;
        this.setState({ postDataGetProductSecretPriceListByGroup }, () => {
          // 查询商品列表
          this.props.getProductListPriceGroups(postDataGetProductSecretPriceListByGroup.condition);
        });
      },
      onChange: (current, pageSize) => {
        postDataGetProductSecretPriceListByGroup.condition.pageSize = pageSize;
        postDataGetProductSecretPriceListByGroup.condition.pageNumber = current;
        this.setState({ postDataGetProductSecretPriceListByGroup }, () => {
          // 查询商品列表
          this.props.getProductListPriceGroups(postDataGetProductSecretPriceListByGroup.condition);
        });
      }
    };
    return (
      <div className="modal-demo-content">
        <Form className="ant-advanced-search-form searchdiv mb20" onSubmit={() => { }}>
          <Row gutter={40}>
            {searchLists}
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="button" onClick={this.searchSecretPriceGroup}>搜索</Button>
              <Button
                style={{
                  marginLeft: 8
                }}
                onClick={this.handleReset}
              >重置</Button>
            </Col>
          </Row>
        </Form>
        <Spin spinning={isfetching}>
          <div className="DetailTitle">
            <h4>密价组信息</h4>
            <Row className={'mb10'} gutter={10}>
              <Col span={6}>密价组：{dataGetSingleSecretPriceGroup.Name}
              </Col>
              <Col span={6}>已密价商品：{dataGetSingleSecretPriceGroup.ProductCount}
              </Col>
              <Col span={6}>商品总数：{dataGetSingleSecretPriceGroup.AllProductCount}
              </Col>
            </Row>
          </div>
          <Table
            style={{ marginTop: 10 }}
            rowKey="Id"
            columns={columnsGetProductSecretPriceListByGroup}
            dataSource={this.state.dataSourceGetProductSecretPriceListByGroup}
            pagination={getSecretPriceGroupsPagination}
          />
        </Spin>
        {
          modalVisible &&
          <Settings
            data={locationData}
            hideSettingModal={this.hideSettingModal}
            settings={this.settings}
            clearSettings={this.clearSettings}
          />
        }
      </div>
    );
  }
}
export default createForm()(SecretPriceGroupSearch);
