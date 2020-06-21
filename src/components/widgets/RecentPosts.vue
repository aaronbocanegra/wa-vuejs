<template>
  <div class="widget recent-posts">
    <h1>
      <slot></slot>
    </h1>
    <div v-if="recentPostsLoaded">
      <!-- Posts -->
      <ul class="mb-5">
        <router-link v-for="post in filteredPosts()" :key="post.id"
                     tag="li"
                     :to="post.slug" 
                     :title="post.title.rendered"
                     class="w-full flex flex-row cursor-pointer">
          <img v-if="post._embedded['wp:featuredmedia'] != undefined"
            class="w-1/4 md:w-1/2 object-cover flex rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            :src="post._embedded['wp:featuredmedia'][0].media_details.sizes['medium_large'].source_url"
            :alt="post._embedded['wp:featuredmedia'][0].alt_text" />          
          <div
            class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
                  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-3/4 md:w-1/2 object-contain">
            <div class="mb-8">
              <div class="text-gray-900 font-bold text-xl mb-2">{{ post.title.rendered }}</div>
              <p class="text-gray-700 text-base" v-html="post.excerpt.rendered"></p>
            </div>
            <div class="flex items-center">
              <img
                class="w-10 h-10 rounded-full mr-4"
                :src="post._embedded['author'][0].avatar_urls[96]"
                :alt="post._embedded['author'][0].name"
              />
              <div class="text-sm">
                <p class="text-gray-600">{{ post._embedded["author"][0].name }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </ul>
      <!-- Pagination -->
      <ul class="flex flex-row justify-end my-2 w-full h-8 text-green-600 hover:text-green-300">
        <li>
          <div class="flex flex-row line-height-8 h-full text-black px-2">
            <div class="px-1 line-height-8">Per Page</div>
            <input type="range" min="1" :max="numPosts" step="1"
                   @change="getNumPages()" 
                   v-model="$root.storedPostsPerPage"
                   class="h-8 w-10 sm:w-20" /> 
            <div v-text="$root.storedPostsPerPage" class="px-1 line-height-8"></div>
          </div>
        </li>
        <li v-if="prevPage != 0" @click="switchPage(prevPage)"
            class="h-full w-8 bg-green-600 hover:bg-green-300">
          <a href="javascript:(0);" :title="'page-' + prevPage">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 class="text-white hover:text-black fill-current">
              <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path>
            </svg>
          </a>
        </li>
        <li v-if="numPages > 1" v-for="i in numPages" 
            @click="switchPage(i)"
            :class="[ i == pageNum ? 'bg-green-300' : 'bg-green-600' ]"
            class="h-full leading-8 hover:bg-green-300">
          <a href="javascript:void(0)" 
             :title="'Page-' + i"
             :class="[ i == pageNum ? 'text-black' : 'text-white' ]"
             class="font-bold leading-8 text-xl px-2 h-full hover:text-black">
            {{ i }}
          </a>
        </li> 
        <li v-if="nextPage != numPages+1" @click="switchPage(nextPage)"
            class="h-full w-8 bg-green-600 hover:bg-green-300">
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
import axios from "axios";
import SETTINGS from "../../settings";
import { mapGetters } from 'vuex';
import Loader from "../partials/Loader.vue";

export default {
  props: [ 'limit', 'page'],

  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded',
    }),
  },

  data() {
    return {
      perPage: this.limit,
      pageNum: this.$root.storedPostsPageNum,
      prevPage: 0,
      nextPage: 2,
      numPosts: false,
      numPages: false,
      isPagesChanged: true,
    };
  }, // End data

  components: {
    Loader,
  },  // End components

  mounted() {
    this.getNumPages();
  },

  methods: {
    filteredPosts: function () {
       if( this.isPagesChanged ){
         this.prevPage = this.pageNum - 1;
         this.nextPage = this.pageNum + 1;
         this.$store.dispatch('getPosts', { limit: parseInt( this.perPage ), page: parseInt( this.pageNum ) });
         this.isPagesChanged = false;
       }
       return this.recentPosts( parseInt( this.perPage ), parseInt( this.pageNum ) );
    },

    getNumPages: function() {
      this.numPosts = this.$root.recentPostsCount;
      if(this.$root.storedPostsPerPage > this.numPosts){
        this.$root.storedPostsPerPage = this.numPosts;
        this.perPage = this.$root.storedPostsPerPage;
      }else{
        this.perPage = this.$root.storedPostsPerPage;
      }
      this.isPagesChanged = true;
      this.numPages = Math.ceil( this.numPosts / this.perPage );
    },

    switchPage: function(i){
      if( i > 0 && i <= this.numPages ){
        this.$root.storedPostsPageNum = i;
        this.pageNum = this.$root.storedPostsPageNum;
        this.isPagesChanged = true;
      }
    },

  },
};
</script>
