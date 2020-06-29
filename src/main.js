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
      // Store Pagination Values and Set Defaults
      storedPostsPerPage: this.$store.state.options.all.posts_per_page,
      storedPostsPageNum: 1,
      storedPagesPerPage: this.$store.state.options.all.posts_per_page,
      storedPagesPageNum: 1,
      show_author_avatar: this.$store.state.options.all.show_avatars,
      show_on_front:      this.$store.state.options.all.show_on_front,
      page_on_front:      this.$store.state.options.all.page_on_front,
      page_for_posts:     this.$store.state.options.all.page_for_posts,
    };
  },

  beforeCreate() {
    this.$store.commit(types.RESET_LOADING_PROGRESS);
    this.$store.dispatch('getAllOptions');
    this.$store.dispatch('getAllCategories');
    this.$store.dispatch('getAllTags');
    this.$store.dispatch('getAllPages');
    this.$store.dispatch('getPagesCount');
    this.$store.dispatch('getPostsCount');
    this.$store.dispatch('getAllCustomLogo');
    this.$store.dispatch('getAllMenus');
  },
  created(){
    this.$store.dispatch('getAllOptions');
    this.storedPostsPerPage = this.$store.state.options.all.posts_per_page;
    this.storedPagesPerPage = this.$store.state.options.all.posts_per_page;
    this.show_author_avatar = this.$store.state.options.all.show_avatars;
    this.show_on_front      = this.$store.state.options.all.show_on_front;
    this.page_on_front      = this.$store.state.options.all.page_on_front;
    this.page_for_posts     = this.$store.state.options.all.page_for_posts;
/*
   console.log("LIMIT: " + this.storedPostsPerPage);
   console.log(this.$store.state);
   console.log( this.$store.getters.allOptions );
*/
  },
}).$mount('#app')

