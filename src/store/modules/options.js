import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false
}

// getters
const getters = {
  // Returns an array all options
  allOptions: state => state.all,
  allOptionsLoaded: state => state.loaded,
  activeOption: state => id => {
    let field = typeof id === 'number' ? 'id' : 'slug';
    let option = state.all.filter(option => option[field] === id);
    return (option[0]) ? option[0] : false;
  },

}

// actions
const actions = {
  getAllOptions ({ commit }) {
    api.getOptions(options => {
      commit(types.STORE_FETCHED_OPTIONS, { options })
      commit(types.OPTIONS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_OPTIONS] (state, { options }) {
    state.all = options
  },

  [types.OPTIONS_LOADED] (state, bool) {
    state.loaded = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
