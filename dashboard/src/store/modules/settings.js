import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { SOCKET_EVENTS } from '@edenjiga/delivery-common'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  isStoreOpen: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },

  [`SOCKET_${SOCKET_EVENTS.SETTING_MOBILE_APP_STAY_OPEN_UPDATED}`]: (
    state,
    data
  ) => {
    state.isStoreOpen = data
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
