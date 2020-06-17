<template>
  <div id="app" class="flex flex-col md:min-h-screen overflow-x-hidden">
    <app-header />
    <transition name="loader-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <progress-bar :show-loader="showLoader" :loader-style="loaderStyle" />
    </transition>

    <div class="site-content mx-auto py-2 flex-1 px-10 md:px-0 max-w-2xl lg:max-w-5xl">
      <transition-page>
        <router-view></router-view>
      </transition-page>
    </div>

    <app-footer />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Header from './components/partials/Header.vue';
import Footer from './components/partials/Footer.vue';
import ProgressBar from './components/partials/ProgressBar.vue';
import TransitionPage from './components/partials/TransitionPage.vue';


export default {
  data() {
    return {
      showLoader: true,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress',
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`;
    },
  },

  components: {
    appHeader: Header,
    appFooter: Footer,
    ProgressBar,
    TransitionPage,
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

};
</script>

<style type="postcss" scoped>
</style>
