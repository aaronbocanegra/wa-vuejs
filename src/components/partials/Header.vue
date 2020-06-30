<template>
  <header v-if="allMenusLoaded" class="site-header">
    <!-- Site Logo Pulled from Theme Custom_Logo *SVG Enabled--> 
    <div v-if="logo_loaded" id="custom_logo" 
         :class="[ $root.isSwipeMenu ? 'z-max' : '' ]"
         class="flex w-16 h-16 ml-5 pt-1 sm:pt-2 md:w-auto md:h-auto">
      <router-link to="/" class="" 
                   :title="site_url">
        <img class="h-16 md:h-25 lg:h-28 object-contain"
          :src="this.allCustomLogo.image.src"
          :alt="this.allCustomLogo.site_name" />
      </router-link>
    </div>
    <!-- Main Navigation -->
    <nav id="header-menu__nav">
      <!-- Mobile Nav -->
      <div id="header-menu__mobile" class="block flex lg:hidden">
        <button id="headerMobileButton"
          @click="toggleActiveMenu"
          class="bg-black z-20 flex items-center px-2 py-2 my-2 border rounded text-green-600 border-transparent active:border-transperent hover:text-white hover:border-transparent">
          <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <!-- Header Menu lg-->
      <ul v-if="headerMenu.length > 0" 
          id="wa-vuejs-header__menu" 
          v-touch:swipe="closeSwipe"
          v-bind:class="[ $root.isSwipeMenu ? ['wa-vuejs-header__menu-swipe', 'lg:flex'] : ['lg:flex', 'lg:items-start', 'lg:w-auto', 'lg:flex-row', 'flex-col'],
                          ($root.activeMobileMenu || $root.isSwipeMenu) ? 'flex' : ['absolute', 'lg:relative', 'opacity-0', 'lg:opacity-100', 'transform-translate-x-full', 
                                                                                    'lg:transform-translate-x-0'] ]">
        <li v-for="(hmi, index) in headerMenu" 
            :key="'headerMenu-' + index" 
            v-on:click="setShowDropdown($event)"
            class="header-menu__list-item lg:flex lg:flex-col">
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
              :class="[ $root.isSwipeMenu ? ['flex', 'flex-col'] : ['hidden', 'lg:hidden'] ]"
              class="w-full flex-grow lg:flex lg:items-end lg:flex-col">
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
      this.allCustomLogoLoaded;
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
    },

    setIsActive: function(){
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
        if( el.classList.contains("hidden") || el.classList.contains("lg:hidden") ){
          e.target.classList.add("active");
          el.classList.remove("hidden");
          el.classList.remove("lg:hidden");
        }else if(e.target.classList.contains("active")){
          e.target.classList.remove("active");
          el.classList.add("hidden");
          el.classList.add("lg:hidden");
        }
      }
    },

    closeSwipe: function() {
      this.$root.isSwipeMenu = false;
    },
  }
};
</script>
