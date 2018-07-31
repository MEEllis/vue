import permission from './permission';

export default permission({
  authSelector: (state) => {
    const { getCurrentResult, getSubAccountPermissionListExtendResult } = state.account;
    if (getCurrentResult && !getCurrentResult.Data.IsSubUser) {
      return { admin: true };
    }
    if (getSubAccountPermissionListExtendResult) {
      return getSubAccountPermissionListExtendResult.Data;
    }
    return undefined;
  }
});
