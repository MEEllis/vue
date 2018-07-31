import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SecretPriceUser from '../components/ApiPrice/js/SecretPriceProductSearch';
import { getSubcategoryList, getProductdetail } from '../redux/commodityAdd';
import {
  getProductListPriceProducts,
  getSecretPriceFromProductidPriceProduct,
  getSingleSecretPriceGroupsProduct,
  getAllSecretPriceGroupsProduct,
  cleanSecretPrice,
  setSecretPrice,
  setSecretpriceAndPrice
} from '../redux/secretPriceSetting';

const getAllSecretPriceGroupsProductData =
  (state) => state.secretPriceSetting.getAllSecretPriceGroupsProductResult || [];
const getAllSecretPriceGroupsProductSelector =
  createSelector([getAllSecretPriceGroupsProductData], (stateItem) => {
    if (!stateItem.Data) {
      return {
        dataSource: []
      };
    }
    const item = {};
    item.dataSource = stateItem.Data;
    item.total = stateItem.Total;
    return item;
  });

const getSingleSecretPriceGroupsProductData = (state) =>
  state.secretPriceSetting.getSingleSecretPriceGroupsProductResult || [];
const getSingleSecretPriceGroupsProductSelector =
  createSelector([getSingleSecretPriceGroupsProductData], (stateItem) => {
    if (!stateItem.Data) {
      return false;
    }
    return stateItem.Data;
  })

const getSubcategoryListData = (state) => state.commodityAdd.getSubcategoryListResult || [];
const getSubcategoryListSelector = createSelector([getSubcategoryListData], (listStateItem) => {
  if (!listStateItem.Data) {
    return {
      dataSource: []
    };
  }
  const itemState = {
    dataSource: [
      {
        Name: '全部',
        Id: ''
      }
    ]
  };
  listStateItem.Data.map(item => {
    const temp = {
      Id: item.Id,
      Name: item.Name
    };
    itemState.dataSource.push(temp);
  });
  return itemState;
});

const getProductListPriceProductsData = (state) =>
  state.secretPriceSetting.getProductListPriceProductsResult || [];
const getProductListPriceProductsSelector =
  createSelector([getProductListPriceProductsData], (stateItem) => {
    if (!stateItem.Data) {
      return {
        dataSource: []
      };
    }
    const itemState = {
      PageNumber: stateItem.Current, // 当前页
      PageSize: stateItem.PageSize, // 每页多少条
      TotalPages: stateItem.Total, // 总页数
      dataSource: []
    };
    stateItem.Data.map(item => {

      let ProductType = '';
      let productStockStatus = '';
      let saleStatus = '';
      switch (item.ProductType) {
        case 1:
          ProductType = '卡密';
          break;
        case 2:
          ProductType = '卡密直储';
          break;
        case 4:
          ProductType = '在线直储';
          break;
        default:
          ProductType = '';
      }
      switch (item.StockStatus) {
        case 1:
          productStockStatus = '断货';
          break;
        case 2:
          productStockStatus = '警报';
          break;
        case 3:
          productStockStatus = '充足';
          break;
        default:
          productStockStatus = '';
      }
      switch (item.SaleStatus) {
        case 1:
          saleStatus = '未上架';
          break;
        case 2:
          saleStatus = '已上架';
          break;
        default:
          saleStatus = '';
      }
      const temp = {
        Id: item.Id, // 商品Id
        Name: item.Name, // 商品名称
        Nature: item.Nature, // 商品性质
        ProductType, // 商品类型
        FaceValue: item.FaceValue, // 面值
        Price: item.Price, // 商品售价
        AssociateId: item.AssociateId, // 对接库存或商品Id
        AssociateName: item.AssociateName, // 对接库存或者商品名称
        StockStatus: productStockStatus, // 库存状态
        SaleStatus: saleStatus, // 库存状态
        SiteId: item.SiteId, // 站点Id
        SiteName: item.SiteName, // 站点编号
        ProductStatus: item.ProductStatus, // 商品状态
      };
      itemState.dataSource.push(temp);
    });
    return itemState;
  });

const getSecretPriceFromProductidPriceProductData = (state) =>
  state.secretPriceSetting.getSecretPriceFromProductidPriceProductResult || [];
const getSecretPriceFromProductidPriceProductSelector =
  createSelector([getSecretPriceFromProductidPriceProductData], (stateItem) => {
    if (!stateItem.Data) {
      return undefined;
    }
    return stateItem.Data;
  });

const mapStateToProps = (state) => ({
  getProductdetailResult: state.commodityAdd.getProductdetailResult,
  getSubcategoryListResult: getSubcategoryListSelector(state),
  getProductListPriceProductsResult: getProductListPriceProductsSelector(state),
  getSecretPriceFromProductidPriceProductResult:
  getSecretPriceFromProductidPriceProductSelector(state),
  getSingleSecretPriceGroupsProductResult: getSingleSecretPriceGroupsProductSelector(state),
  getAllSecretPriceGroupsProductResult: getAllSecretPriceGroupsProductSelector(state),
  cleanSecretPriceResult: state.secretPriceSetting.cleanSecretPriceResult,
  setSecretPriceResult: state.secretPriceSetting.setSecretPriceResult,
  setSecretpriceAndPriceResult: state.secretPriceSetting.setSecretpriceAndPriceResult,
  isfetching: state.secretPriceSetting.isfetching
});

export default connect(mapStateToProps, {
  getProductdetail,
  getSubcategoryList,
  getProductListPriceProducts,
  getSecretPriceFromProductidPriceProduct,
  getSingleSecretPriceGroupsProduct,
  getAllSecretPriceGroupsProduct,
  cleanSecretPrice,
  setSecretPrice,
  setSecretpriceAndPrice
})(SecretPriceUser);
