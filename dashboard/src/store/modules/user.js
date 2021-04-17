import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  authInLogin({ state }) {
    this._vm.$socket.client.emit('authorization', state.token)
  },

  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const { token } = await login({ email: username.trim(), password })

      commit('SET_TOKEN', token)
      setToken(token)
    } catch (error) {
      Promise.reject(error)
    }
  },

  // get user info
  async getInfo({ commit, dispatch, state }) {
    try {
      const data = await getInfo(state.token)
      await dispatch('authInLogin')

      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }

      const { roles, name } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        return Promise.reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      // commit("SET_AVATAR", avatar);
      // commit("SET_INTRODUCTION", introduction);
      return data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
