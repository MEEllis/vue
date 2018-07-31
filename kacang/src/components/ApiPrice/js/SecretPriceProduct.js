import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Row, Col, Form, Input, Select, Modal, Spin, message, Table } from 'antd';
import { dateFormat } from '../../../utils';
import { Button, A } from '../../Auth/js/Auth';
import { RangePicker } from 'react-component-date';

import FL from '../../../utils/FL';
import IconComponent from '../../IconComponent/js/IconComponent';
import '../../CardType/less/cardType.less';
import Icon from '../../Icon/js/Icon';
import * as icons from '../../Icon/js/Icon';
import '../less/secertPriceUser.less';

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
    getSubcategoryList: PropTypes.func.isRequired,
    getSecretPriceFromProductidPriceProduct: PropTypes.func.isRequired,
    getAllSecretPriceGroupsProduct: PropTypes.func.isRequired,
    cleanSecretPrice: PropTypes.func.isRequired,
    setSecretPrice: PropTypes.func.isRequired,
    getProductListPriceProducts: PropTypes.func.isRequired,
    getProductListPriceProductsResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    getSecretPriceFromProductidPriceProductResult: PropTypes.arrayOf(PropTypes.shape({
      GroupCount: PropTypes.number.isRequired
    })).isRequired,
    getAllSecretPriceGroupsProductResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    getSubcategoryListResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    setSecretPriceResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    cleanSecretPriceResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  }
  static defaultProps = {
    isfetching: true,
    getSubcategoryListResult: [],
    getProductListPriceProductsResult: [],
    getSecretPriceFromProductidPriceProductResult: [],
    getAllSecretPriceGroupsProductResult: undefined,
    getSecretPriceFromProductidPriceGroupsResult: undefined,
    setSecretPriceResult: undefined,
    cleanSecretPriceResult: undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      commidityType: '',
      modalVisible: false,
      searchVisible: false,
      setGroupVisible: false,
      modalSetSecretPriveVisible: false,
      reload: true,
      CategoryIdSource: [],
      // 按组给密价列表
      getAllSecretPriceGroupsList: {
        pageNumber: 1,
        pageSize: FL.PAGESIZE,
        ProductId: ''
      },
      // 获取商品信息
      postDataGetSecretPriceGroupsByProduct: {
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
          pageNumber: 1, // 传递给后端
          pageSize: FL.PAGESIZE, // 传递给后端
        }
      },

      // 获取商品信息查询条件
      columns: [
        {
          title: '商品名称（编号）',
          dataIndex: 'Name',
          render: (data, record) => (
            <span>{record.Name}({record.Id})</span>
          )
        }, {
          title: '商品类型',
          dataIndex: 'ProductType'
        }, {
          title: '库存状态',
          dataIndex: 'StockStatus',
          render: (text) => {
            let color = '';
            switch (text) {
              case '警报':
                color = '#FF6100';
                break;
              case '充足':
                color = 'green';
                break;
              case '断货':
                color = 'red';
                break;
              default:
                break;
            }
            return <span style={{ color }}>{text}</span>;
          }
        }, {
          title: '面值',
          dataIndex: 'FaceValue'
        }, {
          title: '售价',
          dataIndex: 'Price'
        }, {
          title: '密价组',
          dataIndex: 'GroupCount'
        }, {
          title: '操作',
          dataIndex: '',
          width: '50px',
          render: (data) => (<div>
            <span>
              <A
                onClick={() => {
                  this.setSecretPrice(data);
                }}
                auth="priceSet"
                authOpts={{
                  noAuthType: 'disabled',
                  noAuthHint: '尚未开通该权限，请联系管理员',
                  hint: '设置密价'
                }}
              >
                <Icon glyph={icons.shezhimijia} />
              </A>
            </span>
          </div>)
        }
      ],
      // 商品列表数据源
      dataSource: [],
      // 按商品给密价弹出层数据
      dataSourceGetSecretPriceGroupsByProduct: [],
      productInfo: {},
      // 用户点击商品的ProductId
      ProductId: ''
    }
  }
  componentWillMount() {
    const { props } = this;
    const { postDataGetSecretPriceGroupsByProduct } = this.state;
    // 加载商品类型
    this.props.getSubcategoryList({ parentId: '' });
    // 1、初始化渲染之前触发监听的异步 Action
    //props.getStockAccount()
    // props.getData( this.state.postDataGetProductSecretPriceList );
    // props.getCategoryList({level:1})
    // 获取商品信息
    props.getProductListPriceProducts(postDataGetSecretPriceGroupsByProduct.condition);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { dataSource } = this.state;
    const {
      getSubcategoryListResult,
      getProductListPriceProductsResult,
      getSecretPriceFromProductidPriceProductResult,
    } = nextProps;
    // 获取商品分类
    if (getSubcategoryListResult !== props.getSubcategoryListResult) {
      this.setState({ CategoryIdSource: getSubcategoryListResult.dataSource });
    }

    // 获取商品列表
    if (getProductListPriceProductsResult !== props.getProductListPriceProductsResult) {
      const getProductListPriceProductsData = getProductListPriceProductsResult.dataSource;

      const ProductIds = [];
      for (let i = 0; i < getProductListPriceProductsData.length; i += 1) {
        ProductIds[i] = getProductListPriceProductsData[i].Id;
      }
      if (ProductIds.length !== 0) {
        // 根据商品得到密价
        props.getSecretPriceFromProductidPriceProduct({
          ProductIds
        });
      }
      this.setState({
        dataSource: getProductListPriceProductsData
      });
    }
    // 根据商品得到密价
    if (getSecretPriceFromProductidPriceProductResult !==
      props.getSecretPriceFromProductidPriceProductResult) {
      for (let i = 0; i < dataSource.length; i += 1) {
        // 默认值
        dataSource[i].GroupCount = 0;
        dataSource[i].SecretPrice = '';
        for (let j = 0; j < getSecretPriceFromProductidPriceProductResult.length; j += 1) {
          if (dataSource[i].Id === getSecretPriceFromProductidPriceProductResult[j].ProductId) {
            dataSource[i].GroupCount = getSecretPriceFromProductidPriceProductResult[j].GroupCount;
            dataSource[i].SecretPrice =
              getSecretPriceFromProductidPriceProductResult[j].SecretPrice;
          }
        }
      }
      // 重新给商品列表赋值
      this.setState({
        dataSource
      });
    }
  }
  onClose() {
    this.setState({
      modalVisible: false,
      setGroupVisible: false
    });
  }
  setSecretPrice = (data) => {
    console.log(data);
    browserHistory.push({ pathname: '/supply/price/productSearch', state: data });
  }

  // 搜索
  searchSecretPriceProduct = () => {
    this.props.form.validateFields((err, value) => {
      const { postDataGetSecretPriceGroupsByProduct } = this.state;
      postDataGetSecretPriceGroupsByProduct.condition.pageNumber = 1;
      const condition = postDataGetSecretPriceGroupsByProduct.condition;
      Object.assign(condition, value);
      condition.BeginTime = value.Time[0] ? dateFormat(value.Time[0]) : '';
      condition.EndTime = value.Time[0] ? dateFormat(value.Time[1]) : '';
      postDataGetSecretPriceGroupsByProduct.condition = condition;
      // 查询商品列表
      this.props.getProductListPriceProducts(condition);
      this.setState({
        postDataGetSecretPriceGroupsByProduct
      });
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  render() {
    const { props } = this;
    const { isfetching, getProductListPriceProductsResult } = props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const { postDataGetSecretPriceGroupsByProduct } = this.state;
    const Count = getProductListPriceProductsResult.TotalPages;
    // 商品列表分页
    const getSecretPriceGroupsPagination = {
      total: Count,
      showSizeChanger: true,
      current: postDataGetSecretPriceGroupsByProduct.condition.pageNumber,
      pageSize: postDataGetSecretPriceGroupsByProduct.condition.pageSize,
      onShowSizeChange: (current, pageSize) => {
        postDataGetSecretPriceGroupsByProduct.condition.pageSize = pageSize;
        postDataGetSecretPriceGroupsByProduct.condition.pageNumber = current;
        this.setState({ postDataGetSecretPriceGroupsByProduct }, () => {
          // 查询商品列表
          this.props.getProductListPriceProducts(postDataGetSecretPriceGroupsByProduct.condition);
        });
      },
      onChange: (current, pageSize) => {
        postDataGetSecretPriceGroupsByProduct.condition.pageSize = pageSize;
        postDataGetSecretPriceGroupsByProduct.condition.pageNumber = current;
        this.setState({ postDataGetSecretPriceGroupsByProduct }, () => {
          // 查询商品列表
          this.props.getProductListPriceProducts(postDataGetSecretPriceGroupsByProduct.condition);
        });
      }
    };

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
      <Col span={8} key={8}>
        <FormItem
          {...formItemLayout}
          label={'发布时间'}
        >
          {getFieldDecorator('Time', {
            initialValue: ''
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" size="default" />
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
              <Select.Option value="2">报警</Select.Option>
              <Select.Option value="3">充足</Select.Option>
            </Select>
            )}
        </FormItem>
      </Col>];
    return (
      <div>
        <Spin spinning={isfetching}>
          <Form className="ant-advanced-search-form searchdiv mb20" onSubmit={() => { }}>
            <Row gutter={40}>
              {searchLists}
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="button" className={'mr10'} onClick={this.searchSecretPriceProduct}>搜索</Button>
                <Button onClick={this.handleReset}>重置</Button>

              </Col>
            </Row>
          </Form>
          <Table
            rowKey="Id"
            columns={this.state.columns}
            pagination={getSecretPriceGroupsPagination}
            dataSource={this.state.dataSource}
          />

        </Spin>
      </div>
    );
  }
}
export default createForm()(ApiPrice);
