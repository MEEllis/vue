import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import UserAccount from '../components/UserAccount/js/UserAccount';
import { subAccountList, subAccountDetail, updateSubAccount, lockSubAccount, unLockSubAccount, addSubAccount } from '../redux/userAccount';
// import { userAccountAction } from '../actions/user';
// import {
//   EnableAccountAction, AddAccountAction,
//   GetAccountPermissionAction, AssignAccountPermissionAction
// } from '../actions/changesubpwd';
// import { loginNameCheck } from '../sagas/loginNameCheck';

// const defaultValue = [];
const subAccountListData = (state) => state.userAccount.subAccountListResult || [];
const subAccountListSelector = createSelector(
  [subAccountListData],
  (stateItem) => {
    if (!stateItem.Data) {
      return false
    }
    let itemState = {
      dataSource: [],
      total: stateItem.Total
    };
    stateItem.Data.map((item, i) => {

      let temp = {
        key: item.OpenId,
        ParentOpenId: item.ParentOpenId,
        OpenId: item.OpenId,
        RoleId: item.RoleId,
        UserName: item.UserName,
        RealName: item.RealName,
        Sort: item.Sort,
        IpList: item.IpList,
        Status: item.IsDisable,
        Enable: item.IsDisable ? '禁用' : '启用',
        titleEnable: item.IsDisable ? '启用' : '禁用',
        ReMark: item.ReMark,
        Options: i
      };
      itemState.dataSource.push(temp);
    });
    return itemState
  }
);
// const enabelAccountSelector = (state) => state.changesubpwd.enabelitems || defaultValue;
// const addAccountSelector = (state) => state.addAccount.items || defaultValue;


// const actionSelector = createSelector(
//   [enabelAccountSelector],
//   (actionItem) => {
//     if (actionItem.length != 0) {
//       //这里接口返回数据有问题，修改成功，返回的Status有的200，有的500
//       if (actionItem.Status == '200') {
//         return {
//           itemState: {
//             text: '1',
//             flag: true,
//           }
//         } // 修改成功
//       }
//       else {
//         return {
//           itemState: {
//             text: '0',
//             flag: false,
//           }
//         }  // 修改失败
//       }
//     }
//     else {
//       return {
//         itemState: {
//           text: '-1',
//           flag: false,
//         }
//       }
//     }
//   }
// );
// const addAccountactionSelector = createSelector([addAccountSelector], (accountItems) => {
//   let result = accountItems.Result == undefined ? true : false;
//   if (!result) {
//     if (accountItems.Result) {
//       return {
//         itemState: {
//           text: '1',
//           flag: true,
//         }
//       }
//     } else {
//       //失败
//       if (accountItems.Message == '用户名已存在') {
//         return {
//           itemState: {
//             text: '2',
//             flag: false,
//           }
//         }
//       } else {
//         return {
//           itemState: {
//             text: '0',
//             flag: false,
//           }
//         }
//       }
//     }
//   }
//   else {
//     //还未请求
//     return {
//       itemState: {
//         text: '-1',
//         flag: false,
//       }
//     }
//   }
// });

const mapStateToProps = (state) => ({
  subAccountListResult: subAccountListSelector(state),
  unLockSubAccountResult: state.userAccount.unLockSubAccountResult,
  lockSubAccountResult: state.userAccount.lockSubAccountResult,
  addSubAccountResult: state.userAccount.addSubAccountResult,
  // userAccountItems: state.userAccount.items,
  isfetching: state.userAccount.isfetching
  // isfetchingUserAccount: !!state.userAccount.isfetching,
  // permission: state.account.data.permission, // 这个请求在account里面 那为什么下面还要加一个saga？
  // userNameCheck: state.userNameCheck.data
});

export default connect(
  mapStateToProps,
  {
    subAccountList,
    unLockSubAccount,
    lockSubAccount,
    addSubAccount
  }
)(UserAccount);
