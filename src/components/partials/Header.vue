<template>
  <header class="site-header flex w-full items-center justify-between flex-wrap bg-black p-2">
      <!-- Main Navigation -->
    <nav class="flex items-center justify-between w-full whitespace-no-wrap">

      <!-- Site Logo Pulled from Theme Custom_Logo *SVG Enabled--> 
      <div id="custom_logo" class="flex w-16 h-16 ml-1 sm:ml-5 md:w-auto md:h-auto">
        <router-link to="/" class="" 
                     @click.native="setPageTitle()"
                     :title="site_url">
          <img class="h-16 md:h-24 lg:h-28"
            :src="this.$root.allCustomLogo.image.src"
            :alt="this.$root.allCustomLogo.site_name" />
        </router-link>
      </div>

      <!-- Mobile Nav -->
      <div class="flex flex-col w-full items-end">
        <div class="block flex lg:hidden">
          <button id="headerMobileButton"
            @click="activeMobileMenu = !activeMobileMenu"
            class="flex items-center px-2 py-2 my-2 border rounded text-green-600 border-transparent active:border-transperent hover:text-white hover:border-transparent">
            <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <!-- Header Menu lg-->
        <ul v-if="headerMenu.length > 0" 
            id="headerMenu" 
            v-bind:class="[activeMobileMenu ? 'flex' : 'hidden']"
            class="lg:block lg:flex lg:items-start lg:w-auto lg:flex-row flex-col">
          <li v-for="(hmi, index) in headerMenu" 
              :key="'headerMenu-' + index" 
              v-on:click="setShowDropdown($event)"
              class="lg:block">
            <!-- Home Link -->
            <router-link v-if="hmi.url === site_url"
                         to="/"
                         @click.native="setPageTitle()"
                         :title="hmi.title"
                         class="block font-semibold lg:inline-block text-center text-green-600 hover:text-white px-2 lg:px-10
                                border-transparent border-b-2 hover:border-green-600 active:border-blue-600">
                          v-html="hmi.title">
            </router-link> 
            <!-- Page Link -->
            <router-link v-else-if="hmi.object == 'page'"
                         :to="{name: 'Page', params: { pageSlug: hmi.slug }}"
                         :title="hmi.title" 
                         class="block font-semibold lg:inline-block text-center text-green-600 hover:text-white px-2 lg:px-10
                                border-transparent border-b-2 hover:border-green-600 active:border-blue-600" 
                         v-html="hmi.title">
            </router-link>
            <!-- Category Link -->
            <router-link v-else-if="hmi.object == 'category'"
                         :to="{name: 'Category', params: { categorySlug: hmi.slug }}"
                         :title="hmi.title" 
                         class="block font-semibold lg:inline-block text-center text-green-600 hover:text-white px-2 lg:px-10
                                border-transparent border-b-2 hover:border-green-600 active:border-blue-600" 
                         v-html="hmi.title" replace>
            </router-link>
            <!-- Archive Link -->
            <router-link v-else-if="hmi.url.includes('archive/')"
                         :to="hmi.url"
                         :title="hmi.title" 
                         class="block font-semibold lg:inline-block text-center text-green-600 hover:text-white px-2 lg:px-10
                                border-transparent border-b-2 hover:border-green-600 active:border-blue-600" 
                         v-html="hmi.title" replace>
            </router-link>
            <!-- Custom Link -->
            <a v-else
               :href="[hmi.url === '#' ? 'javascript:void(0);' : hmi.url]"
               :title="hmi.title"
               target="hmi.target"
               class="block font-semibold lg:inline-block text-center text-green-600 hover:text-white px-2 lg:px-10
                      border-transparent border-b-2 hover:border-green-600 active:border-blue-600" 
               v-html="hmi.title">
            </a>
            <!-- sub-menu items -->
            <ul v-if="hmi.children.length > 0" 
                id="main-sub-menu" 
                class=" w-full flex-grow lg:flex lg:items-end lg:w-auto lg:flex-col hidden lg:hidden">
               <li v-for="cmi in hmi.children" 
                  :key="cmi.title" 
                  class="w-full">
                 <!-- Page Sub Link -->
                 <router-link v-if="cmi.object == 'page'"
                              :to="{name: 'Page', params: { pageSlug: cmi.slug }}"
                              :title="cmi.title" 
                              class="block font-semibold lg:mt-4 lg:inline-block lg:mt-0 text-green-600 hover:text-white
                                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right pr-1"
                              v-html="cmi.title">
                 </router-link>
                 <!-- Category Sub Link -->
                 <router-link v-else-if="cmi.object == 'category'"
                              :to="{name: 'Category', params: { categorySlug: cmi.slug }}"
                              :title="cmi.title" 
                              class="block font-semibold lg:mt-4 lg:inline-block lg:mt-0 text-green-600 hover:text-white
                                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right pr-1"
                              v-html="cmi.title" replace>
                </router-link>
                 <!-- Archive Sub Link -->
                 <router-link v-else-if="cmi.url.includes('archive/')"
                              :to="cmi.title"
                              :title="cmi.title" 
                              class="block font-semibold lg:mt-4 lg:inline-block lg:mt-0 text-green-600 hover:text-white
                                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right pr-1"
                              v-html="cmi.title" replace>
                </router-link>
                <!-- Custom Sub Link -->
                <a v-else 
                   :href="[cmi.url === '#' ? 'javascript:void(0);' : cmi.url]"
                   :title="cmi.title" 
                   target="cmi.target"
                   class="block font-semibold lg:mt-4 lg:inline-block lg:mt-0 text-green-600 hover:text-white
                          border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right"
                   v-html="cmi.title">
                 </a>
               </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      allCustomLogo: 'allCustomLogo',
      allCustomLogo: 'allCustomLogoLoaded',
      allMenus: 'allMenus',
      allMenusLoaded: 'allMenusLoaded',
    }),
  },


  data() {
    return {
      headerMenu: this.$root.allMenus.header,
      activeMobileMenu: false,
      site_url: location.origin,
    };
  },

  beforeCreate(){
    this.$store.getters.allMenus;
    this.$store.getters.allMenusLoaded;
    this.$store.getters.allCustomLogo;
    this.$store.getters.allCustomLogoLoaded;
  }, 

  mounted() {
     this.setIsActive()
  },

  methods: {
    setIsActive: function(){
      // Add active class to active dropdown and toggle active hidden 
      var url = window.location.href;

      if(document.getElementsByClassName('router-link-exact-active').length > 0){
        var mainActiveLink = document.getElementsByClassName('router-link-exact-active');
        if(mainActiveLink[0].parentNode.parentNode.classList.contains('hidden')){
          mainActiveLink[0].parentNode.parentNode.classList.remove('hidden');
          mainActiveLink[0].parentNode.parentNode.parentNode.firstChild.classList.add('active');
        }
      }else if(document.querySelectorAll('#headerMenu>li>a[href^="' + url  + '"]')[0] != undefined){
        var mainActiveLink = document.querySelectorAll('#headerMenu>li>a[href^="' + url  + '"]')[0];
        var subActiveLink  = document.querySelectorAll('#headerMenu>li>ul>li>a[href^="' + url  + '"]')[0];
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

    setPageTitle: function(){
      document.title = this.$root.allCustomLogo.site_name + " | " + this.$root.allCustomLogo.site_tagline;
    },

  }
};
</script>


<style type="postcss" scoped>
</style>
