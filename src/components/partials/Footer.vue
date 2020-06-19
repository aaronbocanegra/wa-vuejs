<template>
  <footer class="site-footer static bottom-0 w-full bg-black text-white flex flex-wrap items-center justify-between px-2 py-3 mt-5">

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
              @click.native="setPageTitle()"
              :title="fmi.title"
              class="block font-semibold inline-block text-center text-green-600 hover:text-white px-10
                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600"
              v-html="fmi.title">
            </router-link>
            <!-- Page Link -->
            <router-link v-else-if="fmi.object === 'page'"
              :to="{name: 'Page', params: { pageSlug: fmi.slug }}"
              :title="fmi.title"
              class="block font-semibold inline-block text-center text-green-600 hover:text-white px-10
                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600"
              v-html="fmi.title">
            </router-link>
            <!-- Category Link -->
            <router-link v-else-if="fmi.object === 'category'"
               :to="{name: 'Category', params: { categorySlug: fmi.slug }}"
               :title="fmi.title" 
              class="block font-semibold inline-block text-center text-green-600 hover:text-white px-10
                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600"
               v-html="fmi.title" replace>
                </router-link>
            <!-- Archive Link -->
            <router-link v-else-if="fmi.url.includes('archive/')"
               :to="fmi.url"
               :title="fmi.title" 
              class="block font-semibold inline-block text-center text-green-600 hover:text-white px-10
                     border-transparent border-b-2 hover:border-green-600 active:border-blue-600"
               v-html="fmi.title" replace>
                </router-link>
            <!-- Custom Link -->
            <a v-else
               :href="[fmi.url === '#' ? 'javascript:void(0);' : fmi.url]" 
               :title="fmi.title" 
               :target="fmi.target"  
               class="block font-semibold inline-block text-center text-green-600 hover:text-white px-10
                      border-transparent border-b-2 hover:border-green-600 active:border-blue-600" 
               v-html="fmi.title">
            </a>
            <!-- sub-menu items -->
            <ul v-if="fmi.children.length > 0" 
                id="footer-sub-menu" 
                class="flex flex-col items-end w-full border-l-2 border-green-600 hover:border-blue-600 
                       sm:border-l-0 sm:border-t-2 sm:pl-5 md:pl-0 md:border-l-0 lg:border-t-0 lg:border-l-2">
               <li v-for="cmi in fmi.children" 
                  :key="cmi.title" 
                  class="w-full">
                 <!-- Page Sub Link -->
                 <router-link v-if="cmi.object === 'page'"
                    :to="{name: 'Page', params: { pageSlug: cmi.slug }}"
                    :title="cmi.title"
                   class="block font-semibold inline-block text-green-600 hover:text-white
                          border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right px-5" 
                    v-html="cmi.title">
                 </router-link>
                 <!-- Category Sub Link -->
                 <router-link v-else-if="cmi.object === 'category'"
                   :to="{name: 'Category', params: { categorySlug: cmi.slug }}"
                   :title="cmi.title" 
                   class="block font-semibold inline-block text-green-600 hover:text-white
                          border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right px-5" 
                   v-html="cmi.title" replace>
                 </router-link>
                 <!-- Archive Sub Link -->
                 <router-link v-else-if="cmi.url.includes('archive/')"
                   :to="cmi.url"
                   :title="cmi.title" 
                   class="block font-semibold inline-block text-green-600 hover:text-white
                          border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right px-5" 
                   v-html="cmi.title" replace>
                 </router-link>
                 <!-- Custom Sub Link -->
                 <a v-else 
                   :href="[cmi.url === '#' ? 'javascript:void(0);' : cmi.url]"
                   :target="cmi.target"  
                   :title="cmi.title" 
                   class="block font-semibold inline-block text-green-600 hover:text-white
                          border-transparent border-b-2 hover:border-green-600 active:border-blue-600 w-full text-right px-5" 
                    v-html="cmi.title">
                 </a>
               </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerMenu: this.$root.allMenus.footer,
      site_url: location.origin,
    };
  },

  methods: {
    setPageTitle: function(){
      document.title = this.$root.allCustomLogo.site_name + " | " + this.$root.allCustomLogo.site_tagline;
    },
  },
}
</script>
