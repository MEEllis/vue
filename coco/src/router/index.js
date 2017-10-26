import Vue from 'vue'
import Router from 'vue-router'
import Search from '../views/search'
import newSong from '../views/newSong.vue'
import rank from '../views/rank.vue'
import plist from '../views/plist.vue'
import singer from '../views/singer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newSong',
      component: newSong
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/plist',
      name: 'plist',
      component: plist
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    }
  ]
})
