
import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Button,
  Spin
} from 'antd';
import { browserHistory } from 'react-router';
import { RangePicker } from 'react-component-date';

import { dateFormat } from '../../../utils';
import FL from '../../../utils/FL';

import Settings from './Settings';
import IconComponent from '../../IconComponent/js/IconComponent';
import Icon, * as icons from '../../Icon/js/Icon';

import '../less/secertPriceUser.less';

const confirm = Modal.confirm;
const createForm = Form.create;
const FormItem = Form.Item;

class SecretPriceProductSearch extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        Id: PropTypes.string
      })
    }),
    isfetching: PropTypes.bool,
    getSecretPriceFromProductidPriceProduct: PropTypes.func.isRequired,
    getAllSecretPriceGroupsProduct: PropTypes.func.isRequired,
    cleanSecretPrice: PropTypes.func.isRequired,
    setSecretpriceAndPrice: PropTypes.func.isRequired,
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
    setSecretpriceAndPriceResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    cleanSecretPriceResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getProductdetail: PropTypes.func.isRequired,
    getProductdetailResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  }
  static defaultProps = {
    isfetching: true,
    getProductListPriceProductsResult: [],
    getSecretPriceFromProductidPriceProductResult: [],
    getAllSecretPriceGroupsProductResult: undefined,
    getSecretPriceFromProductidPriceGroupsResult: undefined,
    setSecretpriceAndPriceResult: undefined,
    cleanSecretPriceResult: undefined,
  };
  state = {
    GroupId: '',
    CategoryIdSource: [],
    dataSourceGetProductSecretPriceListByGroup: [],
    dataGetSingleSecretPriceGroup: [],
    // 按组给密价列表
    getAllSecretPriceGroupsList: {
      pageNumber: 1,
      pageSize: FL.PAGESIZE,
      ProductId: ''
    },
    setGroupVisible: false,
    // 按商品给密价弹出层数据
    dataSourceGetSecretPriceGroupsByProduct: [],
    productInfo: {},
    // 用户点击商品的ProductId
    ProductId: '',
    locationData: {},
    // 设置密价按商品给密价columns
    columnsGetSecretPriceGroupsByProduct: [{
      title: '密价组',
      dataIndex: 'Name'
    }, {
      title: '商品总数',
      dataIndex: 'AllProductCount'
    }, {
      title: '已密价商品',
      dataIndex: 'ProductCount'
    }, {
      title: '当前商品面值',
      dataIndex: 'FaceValue'
    }, {
      title: '当前商品售价',
      dataIndex: 'Price'
    }, {
      title: '当前商品密价',
      dataIndex: 'SecretPriceTable',
      render: (text) => (
        <span>{text ? text : <span className="orange">未设置</span>}</span>
      )
    }, {
      title: '操作',
      width: '110px',
      render: (data) => {
        return (<div>
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
      }
    }],
    // 展示设置、修改密价弹框
    modalVisible: false,
  }
  componentWillMount() {
    const { props } = this;
    const item = props.location.state;
    if (!item) {
      return browserHistory.push('/');
    }
    const { getAllSecretPriceGroupsList } = this.state;
    getAllSecretPriceGroupsList.ProductId = item.Id;
    // 获取商品详情
    props.getProductdetail({
      Id: item.Id
    });

    this.setState({
      modalSetSecretPriveVisible: true,
      ProductId: item.Id
    });
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { dataSource, getAllSecretPriceGroupsList, productInfo } = this.state;
    const {
      getProductListPriceProductsResult,
      getSecretPriceFromProductidPriceProductResult,
      getAllSecretPriceGroupsProductResult,
      cleanSecretPriceResult,
      setSecretpriceAndPriceResult,
      getProductdetailResult
    } = nextProps;
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

    // 按组给密价
    if (getAllSecretPriceGroupsProductResult !== props.getAllSecretPriceGroupsProductResult) {
      const dataSourceGetSecretPriceGroupsByProduct = getAllSecretPriceGroupsProductResult.dataSource;
      dataSourceGetSecretPriceGroupsByProduct.map((key, index) => {
        dataSourceGetSecretPriceGroupsByProduct[index].FaceValue = productInfo.FaceValue;
        dataSourceGetSecretPriceGroupsByProduct[index].Price = productInfo.Price;
        dataSourceGetSecretPriceGroupsByProduct[index].GroupCount = productInfo.GroupCount;
        dataSourceGetSecretPriceGroupsByProduct[index].SecretPriceTable =
          dataSourceGetSecretPriceGroupsByProduct[index].SecretPrice;
        return dataSourceGetSecretPriceGroupsByProduct;
      });
      this.setState({
        dataSourceGetSecretPriceGroupsByProduct
      });
    }

    // 获取商品详情
    if (getProductdetailResult !== props.getProductdetailResult) {
      if (getProductdetailResult.Status === 200) {
        if (getProductdetailResult.Data.Relations && getProductdetailResult.Data.Relations.length) {
          let Relations = getProductdetailResult.Data.Relations[0].Sort;
          let DockProductCode = `${getProductdetailResult.Data.Relations[0].AssociateName} (${getProductdetailResult.Data.Relations[0].AssociateId})`;
          if (getProductdetailResult.Data.Relations.length > 1) {
            getProductdetailResult.Data.Relations.map((item) => {
              if (item.Sort > Relations) {
                Relations = item.Sort;
                DockProductCode = `${item.AssociateName} (${item.AssociateId})`;
              }
            });
          }
          getProductdetailResult.Data.DockProductCode = DockProductCode;
        }
        this.setState({
          productInfo: getProductdetailResult.Data
        });
        props.getAllSecretPriceGroupsProduct(getAllSecretPriceGroupsList);
      }
    }
    // 设置密价
    if (setSecretpriceAndPriceResult !== props.setSecretpriceAndPriceResult) {
      if (setSecretpriceAndPriceResult.Status === 200) {
        // 隐藏
        this.hideSettingModal();
        // 获取商品详情
        props.getProductdetail({
          Id: productInfo.Id
        });
      }
    }

    // 清除密价
    if (cleanSecretPriceResult !== props.cleanSecretPriceResult) {
      if (cleanSecretPriceResult.Status === 200) {
        // postDataGetSecretPriceGroupsByProduct.productId = id;
        this.props.getAllSecretPriceGroupsProduct(getAllSecretPriceGroupsList);
      }
    }
  }
  // 设置密价
  settings = (data) => {
    // 设置密价
    this.props.setSecretpriceAndPrice({
      GroupId: data.Id,
      ProductId: this.state.ProductId,
      Price: data.Price,
      SecretPrice: data.SecretPrice,
    });
  }
  // 清除密价
  clearSettings = (data) => {
    confirm({
      title: '清空密价后，之前设置的密价关系将失效，涉及到的相关商户无法继续享受密价优惠，确定要清除吗？',
      onOk: () => {
        this.props.cleanSecretPrice({
          GroupId: data.Id,
          ProductId: this.state.ProductId
        });
      }
    });
  }
  backToGroup = () => {
    const query = {
      type: false
    };
    browserHistory.push({ pathname: '/supply/price', query });
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
    const { isfetching, getAllSecretPriceGroupsProductResult } = props;

    const { getAllSecretPriceGroupsList, productInfo, ProductId, modalVisible, locationData } = this.state;

    const secretPriceSettingModalCount = getAllSecretPriceGroupsProductResult.total;
    // 设置密价弹框的分页
    const secretPriceSettingModalPagination = {
      total: secretPriceSettingModalCount,
      showSizeChanger: true,
      current: getAllSecretPriceGroupsList.pageNumber,
      pageSize: getAllSecretPriceGroupsList.pageSize,
      onShowSizeChange: (current, pageSize) => {
        getAllSecretPriceGroupsList.pageSize = pageSize;
        getAllSecretPriceGroupsList.pageNumber = current;
        this.setState({ getAllSecretPriceGroupsList }, () => {
          // 查询设置密价弹出框
          this.props.getAllSecretPriceGroupsProduct(getAllSecretPriceGroupsList);
        });
      },
      onChange: (current, pageSize) => {
        getAllSecretPriceGroupsList.pageSize = pageSize;
        getAllSecretPriceGroupsList.pageNumber = current;
        this.setState({ getAllSecretPriceGroupsList }, () => {
          // 查询设置密价弹出框
          this.props.getAllSecretPriceGroupsProduct(getAllSecretPriceGroupsList);
        });
      }
    };
    return (
      <div className="modal-demo-content">
        <Spin spinning={isfetching}>
          <div className="modal-demo-content">
            <div className="DetailTitle">
              <h4>商品信息</h4>
              <Row className={'mb10'}>
                <Col span={10}>商品名称(编号)：{productInfo.Name}({productInfo.Id})</Col>
                <Col span={4}>面值：{productInfo.FaceValue}</Col>
                <Col span={10}>对接商品名称(编号)：{productInfo.DockProductCode}</Col>
              </Row>
              <Row className={'mb10'}>
                <Col span={10}>商品类型：
                            {productInfo.ProductType}
                </Col>
                <Col span={4}>售价：{productInfo.Price}</Col>
                <Col span={10}>库存状态：
                {productInfo.StockStatus === 0 && '--'}
                  {productInfo.StockStatus === 1 && <span className="red">断货</span>}
                  {productInfo.StockStatus === 2 && <span className="orange">报警</span>}
                  {productInfo.StockStatus === 3 && <span className="green">充足</span>}
                </Col>
              </Row>
            </div>
            <Table
              rowKey="Id"
              columns={this.state.columnsGetSecretPriceGroupsByProduct}
              dataSource={this.state.dataSourceGetSecretPriceGroupsByProduct}
              pagination={secretPriceSettingModalPagination}
            />
          </div>
        </Spin>
        {
          modalVisible &&
          <Settings
            data={locationData}
            hideSettingModal={this.hideSettingModal}
            settings={this.settings}
            clearSettings={this.clearSettings}
            change={() => {
              this.setSecretPrice(ProductId)
            }}
          />
        }
      </div>
    );
  }
}
export default createForm()(SecretPriceProductSearch);
