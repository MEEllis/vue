import injectAuth from '../containers/Auth';

export default injectAuth({
  authSelector: (state) => {
    const { getCurrentResult, getSubAccountPermissionListExtendResult } = state.account;
    if (getCurrentResult && !getCurrentResult.Data.IsSubUser) {
      return { admin: true };
    }
    if (getSubAccountPermissionListExtendResult) {
      return getSubAccountPermissionListExtendResult.Data;
    }
    return [];
  },
  authOpts: {
    noAuthType: 'disabled',
    noAuthHint: '尚未开通该权限，请联系管理员',
    isShowAllHint: true
  }
});
