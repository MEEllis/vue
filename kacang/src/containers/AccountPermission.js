import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import AccountPermission from '../components/AccountPermission/js/AccountPermission';
import { getSubAccountPermissionList, setSubAccountPermission } from '../redux/userPermission';

const getSubAccountPermissionListData = (state) => state.userPermission.getSubAccountPermissionListResult || [];
const getSubAccountPermissionListSelector = createSelector([getSubAccountPermissionListData], (stateItem) => {
  if (!stateItem.Data) {
    return false;
  }
  let itemState = {
    dataSource: [
    ]
  };
  stateItem.Data.map(item => {
    let temp = {
      id: item.PermissionId,
      name: item.PermissionName,
      parentId: item.Pid,
      unique: item.Category,
      isAuth: item.IsAirvable,
      desc: item.Extend,
    };
    itemState.dataSource.push(temp);
  })
  return itemState;
});

const mapStateToProps = (state) => ({
  getSubAccountPermissionListResult: getSubAccountPermissionListSelector(state),
  setSubAccountPermissionResult: state.userPermission.setSubAccountPermissionResult,
});

export default connect(
   mapStateToProps,
  {
    getSubAccountPermissionList,
    setSubAccountPermission
  }
)(AccountPermission);
