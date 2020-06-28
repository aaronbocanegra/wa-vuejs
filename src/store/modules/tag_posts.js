import api from '../../api';
import * as types from '../mutation-types';

const createPostSlug = post => {
  let slug = post.link.replace(window.location.protocol + '//' + window.location.host, '');
  post.slug = slug;
  return post;
};

// initial state
const state = {
  tag: [],
  loaded: false,
};

// getters
const getters = {
  tagPosts: state => tagid => {
    if (
      !tagid ||
      !Number.isInteger(tagid) ||
      typeof tagid == 'undefined'
    ) {
      return state.tag;
    }
    let tag = state.tag;
    // return tag.slice(0, tagid);
    return tag;
  },
  tagPostsLoaded: state => state.loaded,
};

// actions
const actions = {
  getTagPosts({ commit }, { tagid }) {
    api.getTagPosts(tagid, posts => {
      posts.map((post, i) => {
        posts[i] = createPostSlug(post);
      });

      commit(types.STORE_FETCHED_TAG_POSTS, { posts });
      commit(types.TAG_POSTS_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },

  clearTagPosts({ commit }) {
      let posts = [];
      commit(types.STORE_FETCHED_TAG_POSTS, { posts });
      commit(types.TAG_POSTS_LOADED, false);
      commit(types.INCREMENT_LOADING_PROGRESS);
  },
};

// mutations
const mutations = {
  [types.STORE_FETCHED_TAG_POSTS](state, { posts }) {
    state.tag = posts;
  },

  [types.TAG_POSTS_LOADED](state, val) {
    state.loaded = val;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
