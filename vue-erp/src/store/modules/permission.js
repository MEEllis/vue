import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menuList) {
  const accessedRouters = asyncRouterMap.filter(route => {
    for (let i = 0; i < menuList.length; i++) {
      const menuItem = menuList[i]
      if (menuItem.menuCode === route.menuCode) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, menuList)
        }
        return true
      }
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        const { menuList } = this.getters
        const accessedRouters = filterAsyncRouter(asyncRouterMap, menuList)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
