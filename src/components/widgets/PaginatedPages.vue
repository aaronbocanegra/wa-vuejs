<template>
  <div class="widget pages">
    <h1>
      <slot></slot>
    </h1>
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
                <div class="text-green-600 hover:text-blue-600 font-bold text-xl mb-2" v-html="page.title.rendered"></div>
                <p class="text-gray-700 text-base" v-html="page.excerpt.rendered"></p>
              </div>
              <div v-if="$root.show_author_avatar" class="flex items-center">
                <img
                  class="w-10 h-10 rounded-full mr-4"
                  :src="page._embedded['author'][0].avatar_urls[96]"
                  :alt="page._embedded['author'][0].name"
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
                   @change="setNumPages()"
                   v-model="$root.storedPagesPerPage"
                   class="h-8 w-10 sm:w-20" />
            <div v-text="$root.storedPagesPerPage" class="px-1 line-height-8"></div>
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
        <li v-if="numPages > 1" class="flex flex-rows">
          <ul class="flex flex-rows">
            <li v-for="i in numPages" :key="i" 
                @click="switchPage(i)"
                :class="[ i == pageNum ? ['bg-blue-600', 'shadow-inner']  : 'bg-green-600' ]"
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
import Loader from "../partials/Loader.vue";
import { mapGetters } from 'vuex';

export default {
  props: [ 'page_id', 'limit', 'pager' ],
  computed: {
    ...mapGetters({
      somePages: 'somePages',
      page: 'page',
      allPagesCount: 'allPagesCount',
      allPagesLoaded: 'allPagesLoaded',
    }),
    pageContent() {
      return this.page( parseInt(this.page_id) );
    },
  },

  data() {
    return {
      perPage: this.limit,
      pageNum: this.$root.storedPagesPageNum,
      prevPage: this.pager - 1,
      nextPage: this.pager + 1,
      numTotalPages: false,
      numPages: false,
      isPageChanged: true,
    };
  },

  components: {
    Loader,
  },  // End components

  mounted() {
    console.log( "pageContent: "  );
    console.log( this.pageContent );
    console.log( "Page ID: " + this.page_id );
    this.getNumPages();
  },
 
  methods: {
    filteredPages: function () {
       if( this.isPagesChanged ){
         this.prevPage = this.pageNum - 1;
         this.nextPage = this.pageNum + 1;
         this.isPagesChanged = false;
       }
       return this.somePages( parseInt( this.perPage ), parseInt( this.pageNum ) );
    },

    setNumPages: function() {
      this.$root.storedPagesPageNum = 1;
      this.getNumPages();
    },

    getNumPages: function() {
      this.pageNum = this.$root.storedPagesPageNum;
      this.numTotalPages = this.allPagesCount;
      if(this.$root.storedPagesPerPage > this.numTotalPages){
        this.$root.storedPagesPerPage = this.numTotalPages
        this.perPage = this.$root.storedPagesPerPage;
      }else{
        this.perPage = this.$root.storedPagesPerPage;
      }
      this.numPages = Math.ceil( this.numTotalPages / this.perPage );
      this.isPagesChanged = true;
    },

    switchPage: function(i){
      if( i > 0 && i <= this.numPages ){
        this.$root.storedPagesPageNum = i;
        this.pageNum = this.$root.storedPagesPageNum;
        this.isPagesChanged = true;
      }
    },

  }, // End Methods
};
</script>
