import api from '../../api';
import * as types from '../mutation-types';

// initial state
const state = {
  all: [],
//  some: [],
  loaded: false,
  page: null,
};

// getters
const getters = {
  allPages: state => state.all,
  allPagesLoaded: state => state.loaded,
  allPagesCount: state => state.pages_count,
  page: state => id => {
    let field = typeof id === 'number' ? 'id' : 'slug';
    let page = state.all.filter(page => page[field] === id);
    return (page[0]) ? page[0] : false;
  },

  pageContent: state => id => {
    let field = typeof id === 'number' ? 'id' : 'slug';
    let page = state.all.filter(page => page[field] === id);

    return (page[0]) ? page[0].content.rendered : false;
  },

  somePages: state => (limit, pager) => {
    if ( !pager || !Number.isInteger(pager) || typeof pager == 'undefined' ) {
      return state.all;
    }
    if ( !limit || !Number.isInteger(limit) || typeof limit == 'undefined' ) {
        return state.all;
    }
    let all = state.all;
    let start = ( pager - 1 ) * limit;
    let end = start + limit;
    //return all;
    return all.slice( start, end );
  },
};

// actions
const actions = {
  getAllPages({ commit }) {
    api.getPages(pages => {
      commit(types.STORE_FETCHED_PAGES, { pages });
      commit(types.PAGES_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },

  /*
  getPages({ commit }, { limit, pager }) {
    api.getSomePages(limit, pager, some_pages=> {
      commit(types.STORE_FETCHED_SOME_PAGES, { some_pages });
      commit(types.SOME_PAGES_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },
  */

  getPagesCount({ commit }) {
    api.getPagesCount(pages_count => {
      commit(types.STORE_FETCHED_PAGE_COUNT, { pages_count });
      commit(types.PAGE_COUNT_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },

};

// mutations
const mutations = {
  [types.STORE_FETCHED_PAGES](state, { pages }) {
    state.all = pages;
  },

  /*
  [types.STORE_FETCHED_SOME_PAGES](state, { some_pages }) {
    state.some_pages = some_pages;
  },
  */

  [types.STORE_FETCHED_PAGE_COUNT](state, { pages_count }) {
    state.pages_count = pages_count;
  },

  [types.PAGES_LOADED](state, val) {
    state.loaded = val;
  },

  /*
  [types.SOME_PAGES_LOADED](state, val) {
    state.loaded = val;
  },
  */

  [types.PAGE_COUNT_LOADED](state, val) {
    state.loaded = val;
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
