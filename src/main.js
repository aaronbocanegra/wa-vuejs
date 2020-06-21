import Vue from 'vue';
//Reference: https://www.npmjs.com/package/vue2-touch-events
import Vue2TouchEvents from 'vue2-touch-events'

require('./bootstrap');
import './assets/css/styles.css';

import router from './router';
import App from './App.vue';
import store from './store';
import * as types from './store/mutation-types';

Vue.use(Vue2TouchEvents, {
//    disableClick: false,
//    touchClass: '',
//    tapTolerance: 10,
//    touchHoldTolerance: 400,
    swipeTolerance: 30,
//    longTapTimeInterval: 400
})

new Vue({
  store,
  router,
  render: h => h(App),

  data() {
    return {
      allMenus: this.$store.getters.allMenus,
      allMenusLoaded: this.$store.getters.allMenusLoaded,
      allCustomLogo: this.$store.getters.allCustomLogo,
      allCustomLogoLoaded: this.$store.getters.allCustomLogoLoaded,
      allPages: this.$store.getters.allPages,
      allPagesLoaded: this.$store.getters.allPagesLoaded,
      allPagesCount: this.$store.getters.allPagesCount,
      recentPostsCount: this.$store.getters.recentPostsCount,
      allCategories: this.$store.getters.allCategories,
      allCategoriesLoaded: this.$store.getters.allCategoriesLoaded,
      // Store Pagination Values and Set Defaults
      storedPostsPerPage: 5,
      storedPostsPageNum: 1,
      storedPagesPerPage: 5,
      storedPagesPageNum: 1,
    };
  },

  beforeCreate() {
    this.$store.commit(types.RESET_LOADING_PROGRESS);
    this.$store.dispatch('getAllCategories');
    this.$store.dispatch('getAllPages');
    this.$store.dispatch('getPagesCount');
    this.$store.dispatch('getPostsCount');
    this.$store.dispatch('getAllCustomLogo');
    this.$store.dispatch('getAllMenus');
    this.allCategories = this.$store.getters.allCategories;
    this.allCategoriesLoaded = this.$store.getters.allCategoriesLoaded;
    this.allPagesCount = this.$store.getters.allPagesCount;
    this.allPages = this.$store.getters.allPages;
    this.allPagesLoaded = this.$store.getters.allPagesLoaded;
    this.recentPostsCount = this.$store.getters.recentPostsCount;
    this.allCustomLogo = this.$store.getters.allCustomLogo;
    this.allCustomLogoLoaded = this.$store.getters.allCustomLogoLoaded;
    this.allMenus = this.$store.getters.allMenus;
    this.allMenusLoaded = this.$store.getters.allMenusLoaded;
  },
}).$mount('#app')

