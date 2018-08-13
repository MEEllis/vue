import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)
const {
  Store
} = Vuex

const store = new Store({
  modules: {
    app,
    permission,
    user
  },
  getters
})

export default store