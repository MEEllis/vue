const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menuList: state => state.user.menuList,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  roles: state => state.user.roles
}
export default getters
