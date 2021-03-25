const state = {}

const mutations = {}

const actions = {
  socket_reconnect({ dispatch }) {
    dispatch('user/authInLogin')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
