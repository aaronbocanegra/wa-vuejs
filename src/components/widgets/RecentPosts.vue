<template>
  <div class="widget recent-posts">
    <h1>
      <slot></slot>
    </h1>
    <div v-if="recentPostsLoaded">
      <!-- Posts -->
      <ul class="mb-5 min-h-64 sm:min-h-56 grid grid-cols-1 lg:grid-cols-2 gap-1">
        <li v-for="post in filteredPosts()" :key="post.id" class="relative">
          <router-link :to="post.slug" 
                       :title="post.title.rendered"
                       class="w-full flex flex-row cursor-pointer h-full">
            <picture v-if="post._embedded['wp:featuredmedia'] != undefined">
                     <source v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_medium_large'] != undefined" 
                              media="(min-width:1280px)" :srcset="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_medium_large'].source_url">
                     <source v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_large'] != undefined" 
                              media="(min-width:1920px)" :srcset="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_large'].source_url">
                     <source v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_extra_large'] != undefined" 
                              media="(min-width:3840px)" :srcset="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_extra_large'].source_url">
                     <img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail'].source_url" 
                          :alt="post._embedded['wp:featuredmedia'][0].alt_text" 
                          draggable="false"
                          class="wa-vuejs_post-card-featured min-h-64 sm:min-h-56 w-full object-cover flex rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            </picture>

            <div class="wa-vuejs_post-description absolute text-white bg-black bg-opacity-45 hover:bg-opacity-75 p-4 flex flex-col justify-between leading-normal inset-0 object-contain">
              <div class="wa-vuejs__post-card">
                <div class="wa-vuejs_post-catd-title bg-black bg-opacity-75 hover:bg-opacity-90 absolute top-0 left-0 px-4 py-2 w-full text-green-600 
                            hover:text-blue-600 font-bold text-xl">{{ post.title.rendered }}</div>
                <p class="wa-vuejs_post-excerpt text-white text-base pt-10" v-html="post.excerpt.rendered"></p>
              </div>
              <div v-if="$root.show_author_avatar" class="wa-vuejs__autho flex items-center">
                <img
                  class="w-10 h-10 rounded-full mr-4"
                  :src="post._embedded['author'][0].avatar_urls[96]"
                  :alt="post._embedded['author'][0].name"/>
                <div class="text-sm">
                  <p class="text-gray-600">{{ post._embedded["author"][0].name }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- Pagination -->
      <ul class="flex flex-row justify-end my-2 w-full h-8 text-green-600 hover:text-blue-600">
        <li>
          <div class="flex flex-row line-height-8 h-full text-black px-2">
            <div class="px-1 line-height-8">Per Page</div>
            <input type="range" min="1" :max="numTotalPosts" step="1"
                   @change="setNumPages()" 
                   v-model="$root.storedPostsPerPage"
                   class="h-8 w-10 sm:w-20" /> 
            <div v-text="$root.storedPostsPerPage" class="px-1 line-height-8"></div>
          </div>
        </li>
        <li v-if="prevPage != 0" @click="switchPage(prevPage)"
            class="h-full w-8 bg-green-600 hover:bg-blue-600 hover:shadow-inner">
          <a href="javascript:(0);" :title="'page-' + prevPage">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 class="text-white hover:text-black fill-current">
              <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path>
            </svg>
          </a>
        </li>
        <li v-if="numPages > 1" class="flex flex-row">
          <ul class="flex flex-row">
            <li v-for="i in numPages" :key="i" 
                @click="switchPage(i)"
                :class="[ i == pageNum ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600' ]"
                class="h-full leading-8 hover:bg-blue-600 hover:shadow-inner">
              <a href="javascript:void(0)" 
                 :title="'Page-' + i"
                 :class="[ i == pageNum ? 'text-black' : 'text-white' ]"
                 class="font-bold leading-8 text-xl px-2 h-full hover:text-black">{{ i }}</a>
            </li>
          </ul>
        </li> 
        <li v-if="nextPage != numPages+1" @click="switchPage(nextPage)"
            class="h-full w-8 bg-green-600 hover:bg-blue-600 hover:shadow-inner">
          <a href="javascript:(0);" :title="'page-' + nextPage">
             <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="text-white hover:text-black fill-current">
               <path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path>
             </svg>
          </a>
        </li>
      </ul>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from "../partials/Loader.vue";

export default {
  props: [ 'limit', 'page'],

  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsCount: 'recentPostsCount',
      recentPostsLoaded: 'recentPostsLoaded',
    }),

    posts_count () {
      this.$store.dispatch('getPostsCount');
      return this.$store.state.post.post_count;
    },
  },

  data() {
    return {
      perPage: this.limit,
      pageNum: this.$root.storedPostsPageNum,
      prevPage: this.page - 1,
      nextPage: this.page + 1,
      numPages: false,
      numTotalPosts: this.limit,
      isPagesChanged: true,
    };
  }, // End data

  components: {
    Loader,
  },  // End components

  mounted() {
    this.numTotalPosts = this.$store.state.post.post_count;
    this.getNumPages();
    this.setSeo();
  },

  methods: {
    filteredPosts: function () {
       if( this.isPagesChanged ){
         this.$store.dispatch('clearPosts');
         this.prevPage = this.pageNum - 1;
         this.nextPage = this.pageNum + 1;
         this.$store.dispatch('getPosts', { limit: parseInt( this.perPage ), page: parseInt( this.pageNum ) });
         this.isPagesChanged = false;
       }
       return this.recentPosts( parseInt( this.perPage ), parseInt( this.pageNum ) );
    },

    setNumPages: function() {
      this.$root.storedPostsPageNum = 1;
      this.getNumPages();      
    },

    getNumPages: function() {
      this.pageNum = this.$root.storedPostsPageNum;
      this.numTotalPosts = this.posts_count;
      if( this.$root.storedPostsPerPage > this.numTotalPosts ){
        this.$root.storedPostsPerPage = this.numTotalPosts;
        this.perPage = this.$root.storedPostsPerPage;
      }else{
        this.perPage = this.$root.storedPostsPerPage;
      }
      this.numPages = Math.ceil( this.numTotalPosts / this.perPage );
      this.isPagesChanged = true;
    },

    switchPage: function(i){
      if( i > 0 && i <= this.numPages ){
        this.$root.storedPostsPageNum = i;
        this.pageNum = this.$root.storedPostsPageNum;
        this.isPagesChanged = true;
      }
    },

    setSeo: function(){
      var pageTitle;
      var desEl;
      var seo_description;

      if( this.$root.page_for_posts != 0 ){
        desEl = document.getElementsByName('description')[0];
        seo_description = "A portfolio page covering the techniques and capabilities of Whatartist. The work explores interaction design, media content creation, and full-stack development";
        desEl.content = seo_description;
        pageTitle = this.$slots.default[0].text + " - " + this.$store.state.options.all.blogname;
        document.title = pageTitle;
      }
    }

  },
};
</script>
