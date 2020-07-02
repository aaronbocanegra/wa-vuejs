<template>
  <header v-if="allMenusLoaded" class="site-header"
          v-touch:swipe.left="swipeLeft"
          v-touch:swipe.right="swipeRight">
    <!-- Site Logo Pulled from Theme Custom_Logo *SVG Enabled--> 
    <div v-if="logo_loaded" id="custom_logo" 
         class="ml-5 mt-2 lg:mt-3 md:w-auto md:h-auto -transform-translate-x-screen transition-all duration-300">
      <router-link to="/" class="flex flex-row items-end md:items-center justify-center text-blue-400 hover:text-white" 
                   :title="site_url">
        <img class="h-16 md:h-20 lg:h-24 object-contain"
          :src="this.allCustomLogo.image.src"
          :alt="this.allCustomLogo.site_name" />
        <h1 class="hidden sm:flex px-2 md:px-5 text-xs sm:text-base lg:text-lg mb-0 tracking-widest">{{ $store.state.options.all.blogdescription }}</h1>
      </router-link>
    </div>
    <!-- Main Navigation -->
    <nav id="header-menu__nav" class="transform-translate-x-screen transition-all duration-300">
      <!-- Mobile Nav -->
      <div id="header-menu__mobile" class="block flex lg:hidden z-50">
        <button id="headerMobileButton"
          @click="toggleActiveMenu"
          v-bind:class="[ ($root.activeMobileMenu || $root.isSwipeMenu ) ? ['fixed', 'top-0', 'right-0'] : 'relative' ]"
          class="z-20 shadow-white bg-black bg-opacity-25  flex items-center px-3 py-3 mr-2 mt-2 border-transpparent rounded text-white">
          <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <!-- Header Menu lg-->
      <ul v-if="headerMenu.length > 0" 
          id="wa-vuejs-header__menu" 
          v-touch:swipe.right="closeSwipe"
          v-bind:class="[ ($root.activeMobileMenu || $root.isSwipeMenu ) ? ['transform-translate-x-0', 'opacity-100'] : ['transform-translate-x-full', 'lg:transform-translate-x-0'] ]"
          class="flex flex-col min-w-1/2 sm:min-w-1/3 lg:min-w-1/4 mt-0 lg:mt-2 lg:min-w-auto fixed top-0 bottom-0 right-0 z-40 items-center justify-center bg-black bg-opacity-90 lg:flex-row lg:absolute lg:items-start lg:bg-transparent
                 lg:transform-translate-x-0 opacity-0 lg:opacity-100 transition-all duration-500 ease-in-out">
        <li v-for="(hmi, index) in headerMenu" 
            :key="'headerMenu-' + index" 
            v-on:click="setShowDropdown($event)"
            class="header-menu__list-item w-full lg:w-auto flex flex-col">
          <!-- Home Link -->
          <router-link v-if="hmi.url === site_url"
                       to="/"
                       :title="hmi.title"
                       class="lg:inline-block lg:px-10"
                       v-html="hmi.title">
          </router-link> 
          <!-- Post Link -->
          <router-link v-else-if="hmi.object == 'post'"
                       :to="{name: 'Post', params: { year:     hmi.url.split('/')[3], 
                                                     month:    hmi.url.split('/')[4], 
                                                     day:      hmi.url.split('/')[5],  
                                                     postSlug: hmi.url.split('/')[6] }}"
                       :title="hmi.title" 
                       class="lg:inline-block lg:px-10"
                       v-html="hmi.title">
          </router-link>
          <!-- Page Link -->
          <router-link v-else-if="hmi.object == 'page'"
                       :to="{name: 'Page', params: { pageSlug: hmi.slug }}"
                       :title="hmi.title" 
                       class="lg:inline-block lg:px-10"
                       v-html="hmi.title">
          </router-link>
          <!-- Category Link -->
          <router-link v-else-if="hmi.object == 'category'"
                       :to="{name: 'Category', params: { categorySlug: hmi.slug }}"
                       :title="hmi.title" 
                       class="lg:inline-block lg:px-10"
                       v-html="hmi.title" replace>
          </router-link>
          <!-- Archive Link archive/:taxSlug -->
          <router-link v-else-if="hmi.url.includes('archive/')"
                       :to="{name: 'Archive', params: { taxSlug: hmi.url.split('/')[2] }}"
                       :title="hmi.title" 
                       class="lg:inline-block lg:px-10"
                       v-html="hmi.title" replace>
          </router-link>
          <!-- Custom Link -->
          <a v-else
             :href="[hmi.url === '#' ? 'javascript:void(0);' : hmi.url]"
             :title="hmi.title"
             target="hmi.target"
             class="lg:inline-block lg:px-10"
             v-html="hmi.title">
          </a>
          <!-- sub-menu items -->
          <ul v-if="hmi.children.length > 0" 
              id="main-sub-menu"
              class="w-full opacity-0 transform-translate-x-screen flex-grow lg:flex lg:items-end flex-col relative sm:absolute bg-black bg-opacity-90 
                     lg:relative lg:bg-transparent right-0 sm:right-full lg:right-0 border-r-0 sm:border-r-2 lg:border-r-0">
             <li v-for="cmi in hmi.children" 
                 :key="cmi.title" 
                 class="w-full">
               <!-- Post Sub Link -->
               <router-link v-if="cmi.object == 'post'"
                            :to="{name: 'Post', params: { year:     cmi.url.split('/')[3],
                                                          month:    cmi.url.split('/')[4],
                                                          day:      cmi.url.split('/')[5],
                                                          postSlug: cmi.url.split('/')[6] }}"
                            :title="cmi.title" 
                            class="lg:py-1 lg:inline-block "
                            v-html="cmi.title">
               </router-link>
               <!-- Page Sub Link -->
               <router-link v-if="cmi.object == 'page'"
                            :to="{name: 'Page', params: { pageSlug: cmi.slug }}"
                            :title="cmi.title" 
                            class="lg:py-1 lg:inline-block "
                            v-html="cmi.title">
               </router-link>
               <!-- Category Sub Link -->
               <router-link v-else-if="cmi.object == 'category'"
                            :to="{name: 'Category', params: { categorySlug: cmi.slug }}"
                            :title="cmi.title" 
                            class="lg:py-1 lg:inline-block "
                            v-html="cmi.title" replace>
              </router-link>
               <!-- Archive Sub Link -->
               <router-link v-else-if="cmi.url.includes('archive/')"
                            :to="{name: 'Archive', params: { taxSlug: cmi.url.split('/')[2] }}"
                            :title="cmi.title" 
                            class="lg:py-1 lg:inline-block "
                            v-html="cmi.title" replace>
              </router-link>
              <!-- Custom Sub Link -->
              <a v-else 
                 :href="[cmi.url === '#' ? 'javascript:void(0);' : cmi.url]"
                 :title="cmi.title" 
                 target="cmi.target"
                 class="lg:py-1 lg:inline-block "
                 v-html="cmi.title">
               </a>
             </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  <Loader v-else></Loader>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from "./Loader.vue";

export default {
  computed: {
    ...mapGetters({
      allOptions: 'allOptions',
      allOptionsLoaded: 'allOptionsLoaded',
      allMenus: 'allMenus',
      allMenusLoaded: 'allMenusLoaded',
      allCustomLogo: 'allCustomLogo',
      allCustomLogoLoaded: 'allCustomLogoLoaded',
    }),

    logo_loaded () {
      /* Fix for first load on no cache, specifically on mobile browsers */
      this.$store.getters.allCustomLogo;
      this.$store.getters.allCustomLogoLoaded;
      this.$store.dispatch('getAllCustomLogo');
      return this.$store.state.customLogo.loaded;
    },

    menus_loaded () {
      /* Fix for first load on no cache, specifically on mobile browsers */
      this.$store.getters.allMenus;
      this.$store.getters.allMenusLoaded;
      this.$store.dispatch('getAllMenus');
      this.allMenusLoaded;
      return this.$store.state.menus.loaded;
    }
  },

  components: {
    Loader,
  },  // End components

  data() {
    return {
      headerMenu: [],
      site_url: this.$store.state.options.all.siteurl,
    };
  },
 
  mounted() {
    this.menus_loaded;
    this.logo_loaded;
    this.headerMenu = this.allMenus.header;
    this.site_url = this.allOptions.siteurl;
    this.setIsActive();
  },

  methods: {
    toggleActiveMenu: function() {
      this.$root.activeMobileMenu = !this.$root.activeMobileMenu;
      this.$root.isSwipeMenu = this.$root.activeMobileMenu;
    },

    setIsActive: function(){
      if(this.allCustomLogoLoaded){
        setTimeout(() => {
           var logo = document.getElementById('custom_logo');
           logo.classList.remove('-transform-translate-x-screen');
        },10);
      }
      if(this.allMenusLoaded){
        setTimeout(() => {
           var menu = document.getElementById('header-menu__nav');
           menu.classList.remove('transform-translate-x-screen');
        },10);
      }
      // Add active class to active dropdown and toggle active hidden 
      var url = window.location.href;
      var mainActiveLink;
      if(document.getElementsByClassName('router-link-exact-active').length > 0){
        mainActiveLink = document.getElementsByClassName('router-link-exact-active');
        if(mainActiveLink[0].parentNode.parentNode.classList.contains('hidden')){
          mainActiveLink[0].parentNode.parentNode.classList.remove('hidden');
          mainActiveLink[0].parentNode.parentNode.parentNode.firstChild.classList.add('active');
        }
      }else if(document.querySelectorAll('#wa-vuejs-header__menu>li>a[href^="' + url  + '"]')[0] != undefined){
        mainActiveLink = document.querySelectorAll('#wa-vuejs-header__menu>li>a[href^="' + url  + '"]')[0];
        var subActiveLink  = document.querySelectorAll('#wa-vuejs-header__menu>li>ul>li>a[href^="' + url  + '"]')[0];
        if(subActiveLink != undefined){
          subActiveLink.parentNode.classList.add('active');
          subActiveLink.parentNode.parentNode.parentNode.firstChild.classList.add('active'); 
          if(subActiveLink.parentNode.parentNode != undefined){
            subActiveLink.parentNode.parentNode.classList.remove('hidden'); 
          }
        }
      }
    },

    // Toggle Dropdown Menus in main nav on click 
    setShowDropdown: function(e){
      //clear existing active class
      if(e.target.nextElementSibling != undefined){
        e.preventDefault();
        var el = e.target.nextElementSibling;
        if( el.classList.contains("opacity-0") || el.classList.contains("lg:opacity-0") ){
          e.target.classList.add("active");
          el.classList.remove("opacity-0");
          el.classList.remove("transform-translate-x-screen");
          el.classList.remove("lg:opacity-0");
        }else if(e.target.classList.contains("active")){
          e.target.classList.remove("active");
          el.classList.add("opacity-0");
          el.classList.add("lg:opacity-0");
          el.classList.add("transform-translate-x-screen");
        }
      }
    },

    closeSwipe: function() {
      this.$root.isSwipeMenu = false;
      this.$root.activeMobileMenu = this.$root.isSwipeMenu;
    },

    swipeLeft: function(){
      var overlay = document.getElementById('overlay');
      if( overlay == null){
        this.$root.isSwipeMenu = true;
        this.$root.activeMobileMenu = this.$root.isSwipeMenu;
      }
    },

    swipeRight: function(){
      this.$root.isSwipeMenu = false;
      this.$root.activeMobileMenu = this.$root.isSwipeMenu;
    },

  }
};
</script>
