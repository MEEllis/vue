import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommodityAdd from '../components/CommodityAdd/js/CommodityAdd'

import { getProductdetail, getSubcategoryList, getSubcategoryListTwo, getSubcategoryListThree, getSubcategoryListFour, getParentCategories, createProduct, updateProduct, getTemplateList, getSingTemplate } from '../redux/commodityAdd'
import { getDockStockList } from '../redux/stockList'
// import {getselftSingleProduct} from '../sagas/getSelfSingleProduct'
import { createSelector } from 'reselect';
const defaultValue = [];

const getSubcategoryListData = (state) =>
state.commodityAdd.getSubcategoryListResult || defaultValue;
const getSubcategoryListTwoData = (state) =>
state.commodityAdd.getSubcategoryListTwoResult || defaultValue;
const getSubcategoryListThreeData = (state) =>
state.commodityAdd.getSubcategoryListThreeResult || defaultValue;
const getSubcategoryListFourData = (state) =>
state.commodityAdd.getSubcategoryListFourResult || defaultValue;
const getParentCategoriesData = (state) =>
state.commodityAdd.getParentCategoriesResult || defaultValue;
const getTemplateListData = (state) =>
state.commodityAdd.getTemplateListResult || defaultValue;

const getDockStockListData = (state) => state.stockList.getDockStockListResult || [];


const getSubcategoryListSelector = createSelector(
  [getSubcategoryListData],
  (listStateItem) => {
    if (!listStateItem.Data) {
      return false;
    }
    const itemState = {
      dataSource: [],
    };
    listStateItem.Data.map(item => {
      const temp = {
        Id: item.Id,
        Name: item.Name,
      };
      itemState.dataSource.push(temp);
    });
    return itemState;
  }
);

const getSubcategoryListTwoSelector = createSelector(
  [getSubcategoryListTwoData],
  (listStateItem) => {
    if (!listStateItem.Data) {
      return false;
    }
    const itemState = {
      dataSource: [],
    };
    listStateItem.Data.map(item => {
      const temp = {
        Id: item.Id,
        Name: item.Name,
      };
      itemState.dataSource.push(temp);
    });
    return itemState;
  }
);


const getSubcategoryListThreeSelector = createSelector(
  [getSubcategoryListThreeData],
  (listStateItem) => {
    if (!listStateItem.Data) {
      return false;
    }
    const itemState = {
      dataSource: [],
    };
    listStateItem.Data.map(item => {
      const temp = {
        Id: item.Id,
        Name: item.Name,
      };
      itemState.dataSource.push(temp);
    });
    return itemState;
  }
);

const getSubcategoryListFourSelector = createSelector(
  [getSubcategoryListFourData],
  (listStateItem) => {
    if (!listStateItem.Data) {
      return false;
    }
    const itemState = {
      dataSource: [],
    };
    listStateItem.Data.map(item => {
      const temp = {
        Id: item.Id,
        Name: item.Name,
        Code: item.Code,
        FaceValue: item.FaceValue,
      };
      itemState.dataSource.push(temp);
    });
    return itemState;
  }
);

const getParentCategoriesSelector = createSelector([getParentCategoriesData], (relationCtgItem) => {
  if (!relationCtgItem.Data) {
    return false;
  }
  const datasource = [];
  relationCtgItem.Data.map((item) => {
    datasource.push(item.Name);
  });
  return datasource;

});

const getDockStockListSelector = createSelector([getDockStockListData], (stateItem) => {
  if (!stateItem) {
    return false;
  }
  const itemState = {};
  itemState.Data = stateItem.Data;

  itemState.TotalRecords = stateItem.Total;
  try {
    if (itemState.Data.length) {
      let itemObj = '';
      for (const k in itemState.Data) {
        itemObj = itemState.Data[k];
        itemObj.stockName = `${itemObj.Name} ( ${itemObj.Id} )`;
        // itemObj.FaceValueD = itemObj.FaceValue;
        // TypeAndNature  类型/性质
        if (itemObj.StockType === 1) {
          itemObj.TypeAndNature = '卡密';
        } else if (itemObj.StockType === 2) {
          itemObj.TypeAndNature = '在线';
        }
        if (itemObj.Nature === 1) {
          itemObj.TypeAndNature += ' / 普通库存';
        } else if (itemObj.Nature === 2) {
          itemObj.TypeAndNature += ' / 库存包';
        } else if (itemObj.Nature === 3) {
          itemObj.TypeAndNature += ' / 区域库存';
        }

        // 库存状态
        switch (itemObj.StockStatus) {
          case 1:
            itemObj.Status = '充足';
            break;
          case 2:
            itemObj.Status = '警报';
            break;
          default:
            itemObj.Status = '断货';
            break;
        }
        // 报警量
        itemObj.WarningCount = itemObj.WarningCount;
        if (itemObj.Nature !== 1) {
          itemObj.WarningCount = '--';
        }
        itemObj.key = itemObj.Id;
      }
    }
  } catch (e) { }
  return itemState;
});

// 分页查询模板
const getTemplateListSelector = createSelector([getTemplateListData], (listStateItem) => {
  if (!listStateItem.Data) {
    return false;
  }
  const itemState = {
    dataSource: [],
    TotalRecords: listStateItem.Total
  };
  listStateItem.Data.map(item => {
    const temp = {
      Remark: item.Remark,
      Name: item.Name,
      BusinessName: item.BusinessName,
      Id: item.Id
    };
    itemState.dataSource.push(temp);
  });

  return itemState;
});


const mapStateToProps = (state) => {
  return {
    // listItemOne:listStateSelector(state),
    // listItemTwo:listTwoStateSelector(state),
    // listItemThree:listThreeStateSelector(state),
    // listItemFour:listFourStateSelector(state),
    // stockConnectItem:stockConnectStateSelector(state),
    // submitItem:submitBtnItemSelector(state),
    // //isfetching:fetchingSelector(state),
    // isfetching:!!state.commodityAdd.isfetching || !!state.commodityAddListTwo.isfetching || !!state.commodityAddListThree.isfetching || !!state.commodityAddListFour.isfetching || !!state.commodityAddStockConnect.isfetching || !!state.commodityAddSubmit.isfetching || !!state.getRelationCtg.isfetching,
    // singleProductItem:state.getsingleProduct.items,
    // // relationCtg:state.getRelationCtg.items,
    // relationCtg:relationCtgStateSelector(state),
    // updateproductItem:state.updateProduct.items,
    // productRelationsItem:state.getProductRelation.items,
    getProductdetailResult: state.commodityAdd.getProductdetailResult,
    getSubcategoryListResult: getSubcategoryListSelector(state),
    getSubcategoryListTwoResult: getSubcategoryListTwoSelector(state),
    getSubcategoryListThreeResult: getSubcategoryListThreeSelector(state),
    getSubcategoryListFourResult: getSubcategoryListFourSelector(state),
    getParentCategoriesResult: getParentCategoriesSelector(state),
    getDockStockListResult: getDockStockListSelector(state),
    createProductResult: state.commodityAdd.createProductResult,
    updateProductResult: state.commodityAdd.updateProductResult,
    getTemplateListResult: getTemplateListSelector(state),
    getSingTemplateResult: state.commodityAdd.getSingTemplateResult,
    isfetching: !!state.commodityAdd.isfetching
  };
};

export default connect(mapStateToProps, {
  // commodityAddAction,
  // commodityListTwoAction,
  // commodityListThreeAction,
  // commodityListFourAction,
  // commodityStockConnectAction,
  // commoditySubmitBtnAction,
  // getSingleproduct,
  // getRelationCtg,
  // updateProduct,
  // getProductRelation,
  getProductdetail,
  getSubcategoryList,
  getSubcategoryListTwo,
  getSubcategoryListThree,
  getSubcategoryListFour,
  getParentCategories,
  getDockStockList,
  createProduct,
  updateProduct,
  getTemplateList,
  getSingTemplate
})(CommodityAdd);
