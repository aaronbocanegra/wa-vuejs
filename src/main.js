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
  created() {
    this.$store.commit(types.RESET_LOADING_PROGRESS);
    this.$store.dispatch('getAllCategories');
    this.$store.dispatch('getAllPages');
    this.$store.dispatch('getAllCustomLogo');
    this.$store.dispatch('getAllMenus');
  },
}).$mount('#app')

