<template>
  <footer v-if="allMenusLoaded" class="site-footer"
          v-touch:swipe.left="swipeLeft"
          v-touch:swipe.right="swipeRight">

    <!-- Footer Menu -->
    <nav class="flex flex-wrap items-center justify-between w-full whitespace-no-wrap">
      <!-- Header Menu lg-->
      <ul v-if="footerMenu.length > 0" 
          id="footerMenu" 
          class="flex flex-wrap flex-col sm:flex-row items-start w-full justify-between">
        <li v-for="(fmi, index) in footerMenu" 
            :key="'footerMenu-' + index" 
            class="block w-full sm:w-auto flex flex-row sm:flex-col lg:flex-row">
          <!-- Home Link -->
          <router-link v-if="fmi.url === site_url"
                       to="/"
                       :title="fmi.title"
                       class="lg:px-10"
                       v-html="fmi.title">
          </router-link>
          <!-- Post Link -->
          <router-link v-else-if="fmi.object === 'post'"
                       :to="{name: 'Post', params: { year:     fmi.url.split('/')[3],
                                                     month:    fmi.url.split('/')[4],
                                                     day:      fmi.url.split('/')[5],
                                                     postname: fmi.url.split('/')[6] }}"
                       :title="fmi.title"
                       class="lg:px-10"
                       v-html="fmi.title">
          </router-link>
          <!-- Page Link -->
          <router-link v-else-if="fmi.object === 'page'"
                      :to="{name: 'Page', params: { pageSlug: fmi.slug }}"
                      :title="fmi.title"
                      class="lg:px-10"
                      v-html="fmi.title">
          </router-link>
          <!-- Category Link -->
          <router-link v-else-if="fmi.object === 'category'"
                       :to="{name: 'Category', params: { categorySlug: fmi.slug }}"
                       :title="fmi.title" 
                       class="lg:px-10"
                       v-html="fmi.title" replace>
          </router-link>
          <!-- Archive Link -->
          <router-link v-else-if="fmi.url.includes('archive/')"
                       :to="{name: 'Archive', params: { taxSlug: fmi.url.split('/')[2] }}"
                       :title="fmi.title" 
                       class="lg:px-10"
                       v-html="fmi.title" replace>
          </router-link>
          <!-- Custom Link -->
          <a v-else :href="[fmi.url === '#' ? 'javascript:void(0);' : fmi.url]" 
                    :title="fmi.title" 
                    :target="fmi.target"  
                    class="lg:px-10"
                    v-html="fmi.title">
          </a>
          <!-- sub-menu items -->
          <ul v-if="fmi.children.length > 0" 
              id="footer-sub-menu" 
              class="hover:border-blue-600 sm:border-b-0 sm:border-t-2 sm:pl-5 md:pl-0 lg:border-t-0 lg:border-l-2">
             <li v-for="cmi in fmi.children" :key="cmi.title" 
                class="w-full">
               <!-- Post Sub Link -->
               <router-link v-if="cmi.object === 'post'"
                           :title="cmi.title"
                           :to="{name: 'Post', params: { year:     cmi.url.split('/')[3],
                                                         month:    cmi.url.split('/')[4],
                                                         day:      cmi.url.split('/')[5],
                                                         postSlug: cmi.url.split('/')[6] }}"
                           class="lg:px-5" 
                           v-html="cmi.title">
               </router-link>
               <!-- Page Sub Link -->
               <router-link v-if="cmi.object === 'page'"
                           :to="{name: 'Page', params: { pageSlug: cmi.slug }}"
                           :title="cmi.title"
                           class="lg:px-5" 
                           v-html="cmi.title">
               </router-link>
               <!-- Category Sub Link -->
               <router-link v-else-if="cmi.object === 'category'"
                           :to="{name: 'Category', params: { categorySlug: cmi.slug }}"
                           :title="cmi.title" 
                           class="lg:px-5" 
                           v-html="cmi.title" replace>
               </router-link>
               <!-- Archive Sub Link -->
               <router-link v-else-if="cmi.url.includes('archive/')"
                           :to="{name: 'Archive', params: { taxSlug: cmi.url.split('/')[2] }}"
                           :title="cmi.title" 
                           class="lg:px-5" 
                           v-html="cmi.title" replace>
               </router-link>
               <!-- Custom Sub Link -->
               <a v-else :href="[cmi.url === '#' ? 'javascript:void(0);' : cmi.url]"
                         :target="cmi.target"  
                         :title="cmi.title" 
                         class="lg:px-5" 
                         v-html="cmi.title">
               </a>
             </li>
          </ul>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

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

    menus_loaded () {
      /* Fix for first load on no cache, specifically on mobile browsers */
      this.$store.getters.allMenus;
      this.$store.getters.allMenusLoaded;
      this.$store.dispatch('getAllMenus');
      this.allMenusLoaded;
      return this.$store.state.menus.loaded;
    }
  },

  data() {
    return {
      footerMenu: [],
      site_url: this.$store.state.options.all.siteurl,
    };
  },

  mounted() {
    this.menus_loaded;
    this.footerMenu = this.allMenus.footer;
    this.site_url = this.allOptions.siteurl;
  },

  methods: {
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
}
</script>
