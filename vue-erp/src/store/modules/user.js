import {
  getCompanyList,
  getMenuList,
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    companyList: [],
    token: getToken(),
    name: '',
    id: '',
    avatar: '',
    menuList: []
  },

  mutations: {
    SET_COMPANYLIST: (state, companyList) => {
      state.companyList = companyList
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENULIST: (state, menuList) => {
      state.menuList = menuList
    }
  },

  actions: {
    // 通过用户名密码获取公司列表
    GetCompanyList({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        const {
          username,
          password
        } = userInfo
        getCompanyList(username, password).then(response => {
          const data = response.data
          commit('SET_COMPANYLIST', data.companyList)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.companyId).then(response => {
          const token = response.token
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.detail.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 菜单
    GetMenuList({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getMenuList(state.token).then(response => {
          const data = response.data
          commit('SET_MENULIST', data.menuVoList)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
