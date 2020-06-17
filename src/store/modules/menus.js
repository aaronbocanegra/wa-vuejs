import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false
}

// getters
const getters = {
  // Returns an array all categories
  allMenus: state => state.all,
  allMenusLoaded: state => state.loaded
}

// actions
const actions = {
  getAllMenus ({ commit }) {
    api.getMenus(menus => {
      commit(types.STORE_FETCHED_MENUS, { menus })
      commit(types.MENUS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_MENUS] (state, { menus }) {
    state.all = menus
  },

  [types.MENUS_LOADED] (state, bool) {
    state.loaded = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
