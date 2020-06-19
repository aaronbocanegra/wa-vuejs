<template>
  <div id="app">
    <app-header />
    <transition name="loader-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <progress-bar :show-loader="showLoader" :loader-style="loaderStyle" />
    </transition>

    <main :style="'min-height: ' + pageHeight + 'px;'"
          class="site-content mx-auto h-full py-2 px-5 md:px-0 w-full max-w-2xl lg:max-w-5xl">
      <transition-page>
        <router-view></router-view>
      </transition-page>
    </main>

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
      pageHeight: 0,
      mBottom: 0,
      mTop: 0,
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

  mounted() {
    this.setPageHeight();
    window.addEventListener('resize', this.setPageHeight);
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
    setPageHeight(){
      document.getElementsByTagName('body')[0].classList.add('overflow-auto');
      if(document.getElementsByTagName('header').length > 0 && document.getElementsByTagName('footer').length > 0){
        this.mTop = document.getElementsByTagName('header')[0].clientHeight;
        this.mBottom = document.getElementsByTagName('footer')[0].clientHeight;
        var sHeight = window.innerHeight;
        if( sHeight < 800 ){
          this.pageHeight = ( sHeight - ( this.mTop + this.mBottom ) -40 );
        }else{
          this.pageHeight = ( sHeight - ( this.mTop + this.mBottom ) );
        }
      }
    },
  },

};
</script>

<style type="postcss" scoped>
</style>
