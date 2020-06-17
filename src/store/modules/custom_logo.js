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
  allCustomLogo: state => state.all,
  allCustomLogoLoaded: state => state.loaded
}

// actions
const actions = {
  getAllCustomLogo ({ commit }) {
    api.getCustomLogo(customLogo => {
      commit(types.STORE_FETCHED_CUSTOM_LOGO, { customLogo })
      commit(types.CUSTOM_LOGO_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_CUSTOM_LOGO] (state, { customLogo }) {
    state.all = customLogo
  },

  [types.CUSTOM_LOGO_LOADED] (state, bool) {
    state.loaded = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
