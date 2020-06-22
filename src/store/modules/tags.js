import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false
}

// getters
const getters = {
  // Returns an array all tags
  allTags: state => state.all,
  allTagsLoaded: state => state.loaded,

  activeTag: state => id => {
    let field = typeof id === 'number' ? 'id' : 'slug';
    let tag = state.all.filter(tag => tag[field] === id);
    return (tag[0]) ? tag[0] : false;
  },

}

// actions
const actions = {
  getAllTags ({ commit }) {
    api.getTags(tags => {
      commit(types.STORE_FETCHED_TAGS, { tags })
      commit(types.TAGS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_TAGS] (state, { tags }) {
    state.all = tags
  },

  [types.TAGS_LOADED] (state, bool) {
    state.loaded = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
