import { connect } from 'react-redux';
import CommodityList from '../components/CommodityList/js/CommodityList';
// import {commodityListAction, commodityListDeleteSingleAction, commodityListDeleteMultipleAction, commodityListShelvedMultipleAction, commodityListOffShelvedMultipleAction} from '../actions/commodity'
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import {
  getProductlist,
  shelvedProduct,
  unshelvedProduct,
  deleteProduct,
  batchDeleteProduct,
  updateProductPrice,
  updateProductName
} from '../redux/commodityList'

import { getSubcategoryList } from '../redux/commodityAdd'
const defaultValue = [];
// const stateItemSelector = (state) => state.commodityList.items || defaultValue
// // const fetchingItemSelector = (state) => state.commodityList.isfetching
//
// const stateItemDeleteSingleSelector = (state) => state.commodityListDeleteSingle.items || ''
// const stateItemDeleteMultipleSelector = (state) => state.commodityListDeleteMultiple.items || ''
// const stateItemShelvedMultipleSelector = (state) => state.commodityListShelvedMultiple.items || ''
// const stateItemOffShelvedMultipleSelector = (state) => state.commodityListOffShelvedMultiple.items || ''

const getSubcategoryListData = (state) => state.commodityAdd.getSubcategoryListResult || defaultValue;
const getProductlistData = (state) => state.commodityList.getProductlistResult || defaultValue
const getSubcategoryListSelector = createSelector([getSubcategoryListData], (listStateItem) => {
  if (!listStateItem.Data) {
    return {
      dataSource: [
      ]
    };
  }
  let itemState = {
    dataSource: [
      {
        'title': '全部',
        'indexStatus': ''
      }
    ]
  };
  listStateItem.Data.map(item => {
    const temp = {
      indexStatus: item.Id,
      title: item.Name
    };
    itemState.dataSource.push(temp);
  });
  return itemState;
});
const getProductlistSelector = createSelector([getProductlistData], (stateItem) => {

  if (!stateItem.Data) {
    return {
      dataSource: [
      ]
    };
  }
  let itemState = {
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
        saleStatus = ''
    }
    let temp = {
      Id: item.Id, // 商品Id
      Name: item.Name, // 商品名称
      Nature: item.Nature, // 商品性质
      ProductType: ProductType, // 商品类型
      FaceValue: item.FaceValue, // 面值
      Price: item.Price, // 商品售价
      AssociateId: item.AssociateId, // 对接库存或商品Id
      AssociateName: item.AssociateName, // 对接库存或者商品名称
      StockStatus: productStockStatus, // 库存状态
      SaleStatus: saleStatus, // 库存状态
      SiteId: item.SiteId, // 站点Id
      SiteName: item.SiteName, //站点编号
      ProductStatus: item.ProductStatus, // 商品状态
    }
    itemState.dataSource.push(temp);
  })
  return itemState
})
const fetchingSelector = (state) => {
  let fetchingItem = state.commodityList.isfetching;
  if (fetchingItem == undefined) {
    fetchingItem = true
  }
  return fetchingItem;
}

const mapStateToProps = (state) => ({
  getProductlistResult: getProductlistSelector(state),
  shelvedProductResult: state.commodityList.shelvedProductResult,
  unshelvedProductResult: state.commodityList.unshelvedProductResult,
  deleteProductResult: state.commodityList.deleteProductResult,
  batchDeleteProductResult: state.commodityList.batchDeleteProductResult,
  updateProductPriceResult: state.commodityList.updateProductPriceResult,
  updateProductNameResult: state.commodityList.updateProductNameResult,
  getSubcategoryListResult: getSubcategoryListSelector(state),
  isfetching: !!state.commodityList.isfetching
});

export default connect(mapStateToProps, {
  getProductlist,
  shelvedProduct,
  unshelvedProduct,
  deleteProduct,
  batchDeleteProduct,
  updateProductPrice,
  updateProductName,
  getSubcategoryList
})(CommodityList);
