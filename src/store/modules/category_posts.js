import api from '../../api';
import * as types from '../mutation-types';

const createPostSlug = post => {
  let slug = post.link.replace(window.location.protocol + '//' + window.location.host, '');
  post.slug = slug;
  return post;
};

// initial state
const state = {
  category: [],
  loaded: false,
};

// getters
const getters = {
  categoryPosts: state => catid => {
    if (
      !catid ||
      !Number.isInteger(catid) ||
      typeof catid == 'undefined'
    ) {
      return state.category;
    }
    let category = state.category;
    return category.slice(0, catid);
  },
  categoryPostsLoaded: state => state.loaded,
};

// actions
const actions = {
  getCategoryPosts({ commit }, { catid }) {
    api.getCategoryPosts(catid, posts => {
      posts.map((post, i) => {
        posts[i] = createPostSlug(post);
      });

      commit(types.STORE_FETCHED_CATEGORY_POSTS, { posts });
      commit(types.CATEGORY_POSTS_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },
};

// mutations
const mutations = {
  [types.STORE_FETCHED_CATEGORY_POSTS](state, { posts }) {
    state.category = posts;
  },

  [types.CATEGORY_POSTS_LOADED](state, val) {
    state.loaded = val;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
