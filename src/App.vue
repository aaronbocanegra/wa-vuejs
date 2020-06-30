<template>
  <div id="app" class="min-h-screen">
    <transition name="loader-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <progress-bar :show-loader="showLoader" :loader-style="loaderStyle" />
    </transition>

    <!-- Header Section -->
    <app-header />

    <!-- Main Content -->
    <main class="site-content mx-auto h-full py-5 px-5 md:px-0 w-full max-w-2xl lg:max-w-5xl"
          v-touch:swipe.left="swipeLeft"
          v-touch:swipe.right="swipeRight"
          v-touch-options="{swipeTolerance: 100}">
      <transition-page>
        <router-view></router-view>
      </transition-page>
    </main>

    <!-- Footer Section -->
    <app-footer />
  </div>
</template>

<script>
import Header from './components/partials/Header.vue';
import Footer from './components/partials/Footer.vue';
import ProgressBar from './components/partials/ProgressBar.vue';
import TransitionPage from './components/partials/TransitionPage.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress',
      allOptions: 'allOptions',
      allOptionsLoaded: 'allOptionsLoaded',
      allMenus: 'allMenus',
      allMenusLoaded: 'allMenusLoaded',
      allCustomLogo: 'allCustomLogo',
      allCustomLogoLoaded: 'allCustomLogoLoaded',
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`;
    },
  },

  data() {
    return {
      showLoader: true,
      headerHeight: 0,
      footerHeight: 0,
    };
  },

  components: {
    appHeader: Header,
    appFooter: Footer,
    ProgressBar,
    TransitionPage,
  },

  mounted() {
    /* Adjust minimum main element height */
    this.headerHeight = this.$el.childNodes[2].clientHeight;
    this.footerHeight = this.$el.childNodes[6].clientHeight;
    this.$el.childNodes[4].style.minHeight = window.innerHeight - (this.headerHeight + this.footerHeight) + 'px';
  },

  updated() {
    /* Adjust minimum main element height */
    if(this.$el.childNodes[2].clientHeight != this.headerHeight || this.$el.childNodes[6].clientHeight != this.footerHeight){
      this.headerHeight = this.$el.childNodes[2].clientHeight;
      this.footerHeight = this.$el.childNodes[6].clientHeight;
      console.log("header: " + this.headerHeight);
      console.log("footer: " + this.footerHeight);
      this.$el.childNodes[4].style.minHeight = window.innerHeight - (this.headerHeight + this.footerHeight) + 'px';
    }
  },
  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this;
        setTimeout(function() {
          self.showLoader = false;
        }, 1000);
      }
    },
  },

  methods: {
    swipeLeft: function(){
      var overlay = document.getElementById('overlay');
      if( overlay == null){
        this.$root.isSwipeMenu = true;
      }
    },

    swipeRight: function(){
      this.$root.isSwipeMenu = false;
    },
  },
};
</script>
