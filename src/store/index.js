import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import * as actions from './actions'
import * as getters from './getters'
import hub from './modules/hub'
import options from './modules/options'
import user from './modules/user'
import post from './modules/post'
import categoryPosts from './modules/category_posts'
import tagPosts from './modules/tag_posts'
import page from './modules/page'
import categories from './modules/categories'
import tags from './modules/tags'
import customLogo from './modules/custom_logo'
import menus from './modules/menus'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
    namespace: 'WA_VUEJS',
    initialState: {},
    expires: 1.21e+9 // Two Weeks
})

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    hub,
    options,
    user,
    post,
    categoryPosts,
    tagPosts,
    page,
    categories,
    tags,
    customLogo,
    menus
  },
  strict: debug,
  plugins: [localStorage]
})
