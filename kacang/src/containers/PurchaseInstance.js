import { connect } from 'react-redux';
import Purchaseinstant from '../components/PurchaseInstance/js/PurchaseInstance';
// import { purchaseInfoAction, templateAction } from '../actions/commodity'
// import { getFastpurchase } from '../sagas/fastPurchaseCardsOrder'
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
// import { actionsStart as getData } from '../actions/getData'

const getDataSelector = (state) => state.getData.data || []

const purchaseInfoItemSelector = (state) => state.getProductInfo.items || []
const templateItemSelector = (state) => state.getSingleTemplate.items || []
const getfastpurchaseSelector = (state) => state.fastpurchaseState.items || []

const purchaseInfoSelector = createSelector([purchaseInfoItemSelector], (purchaseitem) => {
  if (!purchaseitem.Data) {
    return false;
  }
  let itemsData = [];
  let dockType = ''
  switch (purchaseitem.Data.ProductType) {
    case 1: dockType = '卡密';
      break;
    case 2: dockType = '手工代充';
      break;
    case 4: dockType = '卡密直储';
      break;
    case 8: dockType = '在线直储';
      break;
    default: dockType = '其他'
  }
  itemsData = {
    FaceValue: purchaseitem.Data.FaceValue,
    IsDock: purchaseitem.Data.IsDock,
    OrderId: purchaseitem.Data.OrderId,
    ProductCount: purchaseitem.Data.ProductCount,
    ProductKamenCode: purchaseitem.Data.ProductKamenCode,
    ProductName: purchaseitem.Data.ProductName,
    ProductPrice: purchaseitem.Data.ProductPrice,
    ProductSupCode: purchaseitem.Data.ProductSupCode,
    ProductType: dockType,
    SupplierId: purchaseitem.Data.SupplierId,
    SupplierName: purchaseitem.Data.SupplierName,
  }
  return itemsData
})
const templateSelector = createSelector([templateItemSelector], (templateitem) => {
  if (templateitem) {
    return true;
  }
})

const stateGetDataSelector = createSelector(
  [getDataSelector],
  (stateItem) => {
    switch (stateItem.source) {
      // case 'GetAccountSecretPriceList':
      //     stateItem.Data = stateItem.Data.Context;
      //     for(let k in stateItem.Data){
      //         stateItem.Data[k].key = stateItem.Data[k].OpenId;
      //         stateItem.Data[k].name = stateItem.Data[k].AccountName + '(' + stateItem.Data[k].AccountCode +')';
      //     };
      //     return stateItem;
      //     break;
      default:
        return stateItem;
    };
  }
)

const mapStateToProps = (state) => {
  return {
    purchaseitems: purchaseInfoSelector(state),
    // templateitems:templateSelector(state)
    //purchaseitems:state.getProductInfo.items,
    templateitems: state.getSingleTemplate.error,
    getFastpurchaseitems: state.fastpurchaseState.items,
    isfetching: !!state.fastpurchaseState.isfetching || !!state.getData.isfetching,
    isfetching2: state.getSingleTemplate.isfetching,
    //getFastpurchaseitems:getFastSelector(state),
    data: stateGetDataSelector(state),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    purchaseInfoAction: bindActionCreators(purchaseInfoAction, dispatch),
    templateAction: bindActionCreators(templateAction, dispatch),
    getFastpurchase: bindActionCreators(getFastpurchase, dispatch),
    getData: bindActionCreators(getData, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchaseinstant)
