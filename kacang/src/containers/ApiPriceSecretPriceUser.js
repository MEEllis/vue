import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SecretPriceUser from '../components/ApiPrice/js/SecretPriceUser';
import {
  getSecretPriceGroups, cleanGroups, setGroups, getGroups, createSecretPriceGroup,
  getDetailsFromGroupId, getSecretPriceGroupsDealers, stasticSecretPriceGroup, deleteSecretGroup, setSecretGroup
} from '../redux/secretPriceSetting';


const stasticSecretPriceGroupData = (state) =>
  state.secretPriceSetting.stasticSecretPriceGroupResult || [];
const stasticSecretPriceGroupSelector = createSelector([stasticSecretPriceGroupData],
  (stateItem) => {
    if (!stateItem.Data) {
      return {
        dataSource: {
          AllDealerCount: 0,
          NoSecretPriceGroupDealerCount: 0,
          SecretPriceGroupDealerCountList: []
        }
      };
    }
    const item = {};
    item.dataSource = stateItem.Data;
    return item;
  });

const getDetailsFromGroupIdData = (state) =>
  state.secretPriceSetting.getDetailsFromGroupIdResult || [];
const getDetailsFromGroupIdSelector = createSelector([getDetailsFromGroupIdData], (stateItem) => {
  if (!stateItem.Data) {
    return {
      dataSource: []
    };
  }
  return stateItem;
});

const getSecretPriceGroupsDealersData = (state) =>
  state.secretPriceSetting.getSecretPriceGroupsDealersResult || [];
const getSecretPriceGroupsDealersSelector = createSelector([getSecretPriceGroupsDealersData],
  (stateItem) => {
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

const getSecretPriceGroupsData = (state) =>
  state.secretPriceSetting.getSecretPriceGroupsResult || [];
const getSecretPriceGroupsSelector = createSelector([getSecretPriceGroupsData], (stateItem) => {
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

const getGroupsData = (state) => state.secretPriceSetting.getGroupsResult || [];
const getGroupsSelector = createSelector([getGroupsData], (listStateItem) => {
  if (!listStateItem.Data) {
    return {
      dataSource: []
    };
  }
  const itemState = {
    dataSource: [
      {
        Name: '新增分组',
        Id: 'newGroup'
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
// import { actionsStart as getData} from '../actions/getData'
// import {removeSecretGroup} from '../actions/removeSecretGroup'
// const getDataSelector = (state) => state.getData.data || []
// const stateGetDataSelector = createSelector(
//     [getDataSelector],
//     (stateItem) => {
//         switch( stateItem.source ){
//             case 'GetAccountSecretPriceList':
//                 stateItem.Data = stateItem.Data.Context;
//                 for(let k in stateItem.Data){
//                     stateItem.Data[k].key = stateItem.Data[k].OpenId;
//                     stateItem.Data[k].name = stateItem.Data[k].AccountName + '(' + stateItem.Data[k].AccountCode +')';
//                 };
//                 return stateItem;
//
//                 break;
//             default:
//                 return stateItem;
//                 break;
//         };
//
//     }
// )

const mapStateToProps = (state) => ({
  getSecretPriceGroupsDealersResult: getSecretPriceGroupsDealersSelector(state),
  getSecretPriceGroupsResult: getSecretPriceGroupsSelector(state),
  setGroupsResult: state.secretPriceSetting.setGroupsResult,
  cleanGroupsResult: state.secretPriceSetting.cleanGroupsResult,
  getGroupsResult: getGroupsSelector(state),
  createSecretPriceGroupResult: state.secretPriceSetting.createSecretPriceGroupResult,
  getDetailsFromGroupIdResult: getDetailsFromGroupIdSelector(state),
  isfetching: state.secretPriceSetting.isfetching,
  stasticSecretPriceGroupResult: stasticSecretPriceGroupSelector(state),
  deleteSecretGroupResult: state.secretPriceSetting.deleteSecretGroupResult,
  setSecretGroupResult: state.secretPriceSetting.setSecretGroupResult,
});
export default connect(mapStateToProps, {
  getSecretPriceGroups,
  setGroups,
  cleanGroups,
  getGroups,
  createSecretPriceGroup,
  getDetailsFromGroupId,
  getSecretPriceGroupsDealers,
  stasticSecretPriceGroup,
  deleteSecretGroup,
  setSecretGroup
})(SecretPriceUser);
