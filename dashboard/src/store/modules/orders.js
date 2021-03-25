import { getOrders, getUnfinishOrders } from '@/api/orders'
import REQUEST_STATUS from '@/constants/REQUEST_STATUS'
import _ from 'lodash'

const MUTATIONS_KEYS = {
  ADD_ORDERS: 'ADD_ORDERS',
  ADD_ORDER: 'ADD_ORDER',
  LOAD_UNFINISHED_ORDERS: 'LOAD_UNFINISHED_ORDERS',
  SET_FETCH_STATUS_TO_LOADING: 'SET_FETCH_STATUS_TO_LOADING',
  SET_FETCH_STATUS_TO_FAILED: 'SET_FETCH_STATUS_TO_FAILED',
  SET_FETCH_STATUS_TO_LOADED: 'SET_FETCH_STATUS_TO_LOADED',
  SET_FETCH_STATUS_TO_NOT_LOADED: 'SET_FETCH_STATUS_TO_LOADED'
}

const state = {
  items: {},
  fetchStatus: REQUEST_STATUS.NOT_LOADED
}
const mutations = {
  [MUTATIONS_KEYS.SET_FETCH_STATUS_TO_NOT_LOADED](state) {
    state.fetchStatus = REQUEST_STATUS.NOT_LOADED
  },
  [MUTATIONS_KEYS.SET_FETCH_STATUS_TO_LOADING](state) {
    state.fetchStatus = REQUEST_STATUS.LOADING
  },
  [MUTATIONS_KEYS.SET_FETCH_STATUS_TO_LOADED](state) {
    state.fetchStatus = REQUEST_STATUS.LOADED
  },
  [MUTATIONS_KEYS.SET_FETCH_STATUS_TO_FAILED](state) {
    state.fetchStatus = REQUEST_STATUS.FAILED
  },
  [MUTATIONS_KEYS.LOAD_UNFINISHED_ORDERS](state, orders) {
    state.items = {
      ...state.items,
      ...orders
    }
  },
  [MUTATIONS_KEYS.ADD_ORDERS](state, orders) {
    state.items = {
      ...state.items,
      ...orders
    }
  },
  [MUTATIONS_KEYS.ADD_ORDER](state, order) {
    state.items = {
      ...state.items,
      [order._id]: order
    }
  }
}
const actions = {
  async getUnfinishOrders({ commit, state }) {
    try {
      const { docs } = await getUnfinishOrders()
      commit(MUTATIONS_KEYS.LOAD_UNFINISHED_ORDERS, _.mapKeys(docs, '_id'))
    } catch (error) {
      Promise.reject(error)
    }
  },

  async getOrders({ commit }, query = {}) {
    commit(MUTATIONS_KEYS.SET_FETCH_STATUS_TO_LOADING)
    const { docs } = await getOrders(query)
    commit(MUTATIONS_KEYS.ADD_ORDERS, _.mapKeys(docs, '_id'))
    commit(MUTATIONS_KEYS.SET_FETCH_STATUS_TO_LOADED)
  },

  socket_orderUpdated({ commit }, data) {
    commit(MUTATIONS_KEYS.ADD_ORDER, data)
  },
  socket_orderCreated({ commit }, data) {
    commit(MUTATIONS_KEYS.ADD_ORDER, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
