import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SecretPriceUser from '../components/ApiPrice/js/SecretPriceGroup';
import { getSubcategoryList } from '../redux/commodityAdd';
import { getAllSecretPriceGroups, getSingleSecretPriceGroups, getProductListPriceGroups, getSecretPriceFromProductidPriceGroups, cleanSecretPriceGroup, setSecretPriceGroup, getDetailsFromGroupId } from '../redux/secretPriceSetting';

const getSubcategoryListData = (state) => state.commodityAdd.getSubcategoryListResult || [];
const getSubcategoryListSelector = createSelector([getSubcategoryListData], (listStateItem) => {
  if (!listStateItem.Data) {
    return {
      dataSource: [
      ]
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

const getDetailsFromGroupIdData =
(state) => state.secretPriceSetting.getDetailsFromGroupIdResult || [];
const getDetailsFromGroupIdSelector = createSelector([getDetailsFromGroupIdData], (stateItem) => {
  if (!stateItem.Data) {
    return {};
  }
  return stateItem;
});

const getAllSecretPriceGroupsData =
(state) => state.secretPriceSetting.getAllSecretPriceGroupsResult || [];
const getAllSecretPriceGroupsSelector =
createSelector([getAllSecretPriceGroupsData], (stateItem) => {
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

const getSingleSecretPriceGroupsData =
(state) => state.secretPriceSetting.getSingleSecretPriceGroupsResult || [];
const getSingleSecretPriceGroupsSelector =
createSelector([getSingleSecretPriceGroupsData], (stateItem) => {
  if (!stateItem.Data) {
    return undefined;
  }
  return stateItem.Data;
});

const getProductListPriceGroupsData =
(state) => state.secretPriceSetting.getProductListPriceGroupsResult || [];
const getProductListPriceGroupsSelector =
createSelector([getProductListPriceGroupsData], (stateItem) => {
  if (!stateItem.Data) {
    return {
      dataSource: [
      ]
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

const getSecretPriceFromProductidPriceGroupsData = (state) =>
state.secretPriceSetting.getSecretPriceFromProductidPriceGroupsResult || [];
const getSecretPriceFromProductidPriceGroupsSelector =
createSelector([getSecretPriceFromProductidPriceGroupsData], (stateItem) => {
  if (!stateItem.Data) {
    return undefined;
  }
  return stateItem.Data;
});
// import { actionsStart as getData} from '../actions/getData'
// const getDataSelector = (state) => state.getData.data || []
// const stateGetDataSelector = createSelector(
//     [getDataSelector],
//     (stateItem) => {
//         switch( stateItem.source ){
//             case 'GetSecretPriceGroupsByProduct':
//                 if(!stateItem.Data.Context) return stateItem; // 如果没有这玩意证明在别的地方处理了
//                 stateItem.Data = stateItem.Data.Context;
//                 let itemList = {};
//                 for(let k in stateItem.Data){
//                     itemList = stateItem.Data[k];
//                     itemList.key = itemList.GroupId;
//                 };
//                 return stateItem;
//                 break;
//             default:
//                 return stateItem;
//                 break;
//         };
//
//     }
// )
const mapStateToProps = (state) => ({
  getSubcategoryListResult: getSubcategoryListSelector(state),
  getAllSecretPriceGroupsResult: getAllSecretPriceGroupsSelector(state),
  getSingleSecretPriceGroupsResult: getSingleSecretPriceGroupsSelector(state),
  getProductListPriceGroupsResult: getProductListPriceGroupsSelector(state),
  getSecretPriceFromProductidPriceGroupsResult:
  getSecretPriceFromProductidPriceGroupsSelector(state),
  cleanSecretPriceGroupResult: state.secretPriceSetting.cleanSecretPriceGroupResult,
  setSecretPriceGroupResult: state.secretPriceSetting.setSecretPriceGroupResult,
  getDetailsFromGroupIdResult: getDetailsFromGroupIdSelector(state),
  isfetching: !!state.secretPriceSetting.isfetching
});

export default connect(mapStateToProps, {
  getSubcategoryList,
  getAllSecretPriceGroups,
  getSingleSecretPriceGroups,
  getProductListPriceGroups,
  getSecretPriceFromProductidPriceGroups,
  cleanSecretPriceGroup,
  setSecretPriceGroup,
  getDetailsFromGroupId
})(SecretPriceUser);
