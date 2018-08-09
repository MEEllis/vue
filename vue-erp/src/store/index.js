import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)
const {
  Store
} = Vuex

const store = new Store({
  modules: {
    app,
    user
  },
  getters
})

export default store
