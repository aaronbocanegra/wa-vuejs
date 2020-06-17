<template>
  <div class="widget pages">
    <h3>
      <slot></slot>
    </h3>
    <div v-if="allPagesLoaded">
      <!-- Pages -->
      <ul class="grid grid-cols-2 w-full mb-3">
        <li v-for="page in filteredPages()" :key="page.id">
          <router-link :to="page.slug" 
                       tag="div" 
                       :title="page.title.rendered"
                       class="w-full flex flex-row cursor-pointer">
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400
                    bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full object-contain">   
              <div class="mb-8">
                <div class="text-gray-900 font-bold text-xl mb-2" v-html="page.title.rendered"></div>
                <p class="text-gray-700 text-base" v-html="page.excerpt.rendered"></p>
              </div>
              <div class="flex items-center">
                <img
                  class="w-10 h-10 rounded-full mr-4"
                  :src="page._embedded['author'][0].avatar_urls[96]"
                  alt="page._embedded['author'][0].name"
                />
                <div class="text-sm">
                  <p class="text-gray-600">{{ page._embedded["author"][0].name }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>

      <!-- Pagination -->
      <ul class="flex flex-row justify-end my-2 w-full h-8 text-green-600 hover:text-green-300">
        <li>
          <div class="flex flex-row line-height-8 h-full text-black px-2">
            <div class="px-1 line-height-8">Per Page</div>
            <input type="range" min="1" :max="numTotalPages" step="1"
                   @change="getNumPages()"
                   v-model="perPageSlide"
                   class="h-8 w-10 sm:w-20" />
            <div v-text="perPageSlide" class="px-1 line-height-8"></div>
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
  props: [ 'limit', 'pager' ],
  computed: {
    ...mapGetters({
      allPagesCount: 'allPagesCount',
      // somePages: 'somePages',
      // allPagesLoaded: 'allPagesLoaded',
    }),
  },

  data() {
    return {
      perPage: this.limit,
      perPageSlide: this.limit,
      pageNum: 1,
      prevPage: 0,
      nextPage: 2,
      numTotalPages: false,
      numPages: false,
      somePages: [],
      allPagesLoaded: false,
      isPageChanged: true,
    };
  },

  components: {
    Loader,
  },  // End components

  mounted() {
    this.$store.dispatch('getPagesCount');
    //this.$store.dispatch('getPages', { limit: this.perPage, pager: this.pageNum });
    this.getNumPages();
    this.getSomePages();
  },
 
  methods: {
    async getSomePages() {
      await axios
        .get(
           SETTINGS.API_BASE_PATH + 'pages?_embed&per_page=' + this.perPage + '&page=' + this.pageNum
         )
        .then(response => {
          this.somePages = response.data;
          this.allPagesLoaded = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    filteredPages: function () {
       if( this.isPagesChanged ){
         this.prevPage = this.pageNum - 1;
         this.nextPage = this.pageNum + 1;
         this.getSomePages();
         this.isPagesChanged = false;
       }
       return this.somePages;
       // this.$store.dispatch('getPages', { limit: this.perPage, pager: this.pageNum });
       // return this.somePages(this.perPage, this.pageNum);
    },

    getNumPages: function() {
      this.pageNum = 1;
      this.numTotalPages = this.allPagesCount;
      if(this.perPageSlide > this.numTotalPages){
        this.perPageSlide = this.numTotalPages
        this.perPage = this.perPageSlide;
      }else{
        this.perPage = this.perPageSlide;
      }
      this.numPages = Math.ceil( this.numTotalPages / this.perPage );
      this.isPagesChanged = true;
    },

    switchPage: function(i){
      if( i > 0 && i <= this.numPages ){
        this.pageNum = i;
        this.isPagesChanged = true;
      }
    },

  }, // End Methods
};
</script>
