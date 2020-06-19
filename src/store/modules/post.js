import api from '../../api';
import * as types from '../mutation-types';

const createPostSlug = post => {
  let slug = post.link.replace(window.location.protocol + '//' + window.location.host, '');
  post.slug = slug;
  return post;
};

// initial state
const state = {
  recent: [],
  loaded: false,
};

// getters
const getters = {
  recentPosts: state => ( limit, page ) => {
    if (
      !limit ||
      !Number.isInteger(limit) ||
      typeof limit == 'undefined'
    ) {
      return state.recent;
    }

    if (
      !page ||
      !Number.isInteger(page) ||
      typeof page == 'undefined'
    ) {
      return state.recent;
    }
    let recent = state.recent;
    return recent; //return recent.slice(0, limit);
  },

  recentPostsCount: state => state.post_count,

  recentPostsLoaded: state => state.loaded,
};

// actions
const actions = {
  getPosts({ commit }, { limit, page }) {
    api.getPosts(limit, page, posts => {
      posts.map((post, i) => {
        posts[i] = createPostSlug(post);
      });

      commit(types.STORE_FETCHED_POSTS, { posts });
      commit(types.POSTS_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },

  getPostsCount({ commit }) {
    api.getPostsCount(post_count => {
      commit(types.STORE_FETCHED_POST_COUNT, { post_count });
      commit(types.POST_COUNT_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },

};

// mutations
const mutations = {
  [types.STORE_FETCHED_POSTS](state, { posts, limit, page }) {
    state.recent = posts;
  },

  [types.STORE_FETCHED_POST_COUNT](state, { post_count }) {
    state.post_count = post_count;
  },

  [types.POSTS_LOADED](state, val) {
    state.loaded = val;
  },

  [types.POST_COUNT_LOADED](state, val) {
    state.loaded = val;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
