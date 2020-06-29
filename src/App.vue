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
    this.$el.childNodes[4].style.minHeight = window.innerHeight - (this.$el.childNodes[2].clientHeight + this.$el.childNodes[6].clientHeight) + 'px';
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
