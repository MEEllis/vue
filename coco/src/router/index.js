import Vue from 'vue'
import Router from 'vue-router'
import Search from '../views/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index'
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
