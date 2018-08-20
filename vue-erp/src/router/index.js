import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
      import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/404'),
  hidden: true
},
{
  path: '/',
  component: Layout
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  menuCode: 'XTPZI',
  path: '/systemConfig',
  component: Layout,
  children: [{
    menuCode: 'XTPZ',
    path: 'index',
    component: () =>
        import('@/views/basicSetting/companyInfo'),
    name: 'icons',
    meta: {
      title: '系统配置',
      icon: 'lock'
    }
  }]
},
{
  menuCode: 'RBCX',
  path: '/report',
  meta: {
    title: '报表查询',
    icon: 'lock'
  },
  alwaysShow: true,
  component: Layout,
  children: [{
    menuCode: 'DDMX',
    path: 'orderDetails',
    component: () =>
        import('@/views/report/orderDetails'),
    name: 'orderDetails',
    meta: {
      title: '订单明细',
      icon: 'lock'
    }
  }, {
    menuCode: 'DDTJ',
    path: 'orderStatistics',
    component: () =>
        import('@/views/report/orderStatistics'),
    name: 'orderStatistics',
    meta: {
      title: '订单统计',
      icon: 'lock'
    }
  }]
},
{
  menuCode: '404',
  path: '*',
  redirect: '/404',
  hidden: true
}
]
