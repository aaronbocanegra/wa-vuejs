<template>
  <div class="page page--post">
    <div v-if="post && isAllLoaded" class="relative">
      <div class="taxonomies flex flex-col text-sm md:text-base mb-2">
        <!-- Categories -->
        <ul v-if="categoriesArr.length > 0" class="categoryUL mr-2 flex border-b-2 border-gray-600 pl-2">
          <li v-for="category in categoriesArr" 
              :key="category.id" 
              class="categoryLI font-semibold mr-1 pr-2" 
              :id="category.slug" >
            <router-link :to="{name: 'Category', params: { categorySlug: category.slug }}"
                         v-bind:catid="catid" 
                         :title="'Filter Posts by category: ' + category.name" replace>
              {{ category.name }}
            </router-link>
          </li>
        </ul>
        
        <!-- Tags -->
        <ul v-if="tagsArr.length > 0" class="tagsUL flex flex-wrap pl-2">
          <li v-for="tag in tagsArr" :key="tag.id" class="tagLI mr-1 pr-2 font-semibold" :id="tag.slug" >
            <router-link :to="{name: 'Tag', params: { tagSlug: tag.slug }}"
                         :title="'Filter Posts by tag: ' + tag.name">
              {{ tag.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Featured Media -->
      <div v-if="post._embedded['wp:featuredmedia'][0]" class="bg-black bg-opacity-25 mb-5 shadow-lg-white relative max-w-full">
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
                      class="wa-vuejs_post-card-featured min-h-64 sm:min-h-56 w-full object-cover flex rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden z-0">
        </picture>
        <div class="absolute w-full inset-x-0 top-0">
          <h1 class="w-full text-white p-2 bg-opacity-90 bg-black z-50 tracking-wide">{{ post.title.rendered }}</h1>
        </div>
      </div>

      <div :class="[ isVideosLoaded || isGalleryLoaded ? 'lg:grid-cols-2 ' : '' ]" class="vuejs-post__media-content grid grid-cols-1 lg:gap-5">
        <div class="vuejs-post__media">
          <!-- Portfolio Videos -->
          <transition name="fade" mode="out-in">
            <div class="portfolio mt-3 mb-3"
                 v-if="isVideosLoaded">
              <wa-lightbox v-if="this.videos.length > 0"
                 v-bind:gallery="videos"
                 v-bind:effect="'fade'">
              </wa-lightbox>
            </div>
          </transition>

          <!-- Portfolio Images -->
          <transition name="fade" mode="out-in">
            <div class="portfolio mt-3 mb-3"
                 v-if="isGalleryLoaded">
              <wa-lightbox v-if="this.gallery.length > 0"
                 v-bind:gallery="gallery"
                 v-bind:effect="'slide'">
              </wa-lightbox>
            </div>
          </transition>
        </div>

        <div class="content">
          <!-- Description -->
          <h3>Description</h3>
          <div v-html="post.excerpt.rendered"></div>
      
          <!-- Content -->
          <h3>Case Study</h3>
          <div v-html="post.content.rendered"></div>
        </div>
      </div>
    </div>  
    <Loader v-else/>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../components/partials/Loader.vue";
import SETTINGS from "../settings";
import WaLightbox from "../components/WaLightbox.vue";
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      activeCategory:      'activeCategory',
      allCategoriesLoaded: 'allCategoriesLoaded',
      activeTag:           'activeTag',
      allTagsLoaded:       'allTagsLoaded',
    }),
  },

  data() {
    return {
      post: false,
      galleryItem: [],
      gallery: [],
      videos: [],
      isGalleryLoaded: false,
      isVideosLoaded: false,
      portA: [],
      tagsArr: [],
      categoriesArr: [],
      catid: "",
      isAllLoaded: false,
    };
  },
  // End Data

  components: {
    Loader,
    WaLightbox,
  },
  // End components

  beforeMount() {
    this.getPost();
  },
  // End beforeMount

  methods: {
    // Assign Post JSON and call to getPortfolio
    async getPost() {
      await axios
        .get(
          SETTINGS.API_BASE_PATH + "posts?_embed&slug=" + this.$route.params.postname
        )
        .then(response => {
          this.post = response.data[0];
          this.setSeo();
          // Get JSON from Arrays
          this.getVideos();
          this.getGallery();
          this.catid = this.post.categories[0];
          this.getTags(this.post.tags);
          this.getCategories(this.post.categories);
        })
        .catch(e => {
          console.log(e);
        });
        this.isAllLoaded = true;
    },

    // Assign Portfolio JSON data to array
    getGallery: function() {
      if(this.post.metadata.vuejs_custom_gallery[0] != "" && this.post.metadata.vuejs_custom_gallery[0] != undefined){ 
        this.portA = this.post.metadata.vuejs_custom_gallery[0];
        axios.get(
          SETTINGS.API_VENDOR_PATH + "vuejs_custom_gallery/" + this.portA
        )
        .then(response => {
          this.gallery = response.data;
          if(this.gallery.length > 0){
            this.isGalleryLoaded = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
      } // End if not empty
    },

    getVideos: function( ) {
      if(this.post.metadata.vuejs_custom_videos != undefined && this.post.metadata.vuejs_custom_videos[0].includes('oembed') && this.post.metadata.vuejs_custom_videos != "" && !this.videos.length){
        axios.get(
          SETTINGS.API_VENDOR_PATH + "vuejs_custom_videos/" + this.post.id
        )
        .then(response => {
          this.videos = response.data;
          if( this.videos.length > 0 ){
            this.isVideosLoaded = true;
          }
        })
        .catch(e => {
           console.log(e);
        });
      }
    },

    // Assign Tags JSON data to array
    getTags: function(tags) {
      // Loop through tags array
      tags.forEach((t) => {
        this.tagsArr.push( this.activeTag( t ) );
      });
    },

    // Assign Categories JSON data to array
    getCategories: function(cats) {
      // Loop through tags array
      cats.forEach((c) => {
          this.categoriesArr.push( this.activeCategory( c ) );
      });
    },

    setSeo: function(){
      var baseName = this.$store.state.options.all.blogname;
      var pageTitle = this.post.title.rendered + " - " + baseName;
     
      document.title = pageTitle;

      var desEl = document.getElementsByName('description')[0];
      var seo_description = this.post.excerpt.rendered;
      seo_description = seo_description.replace( /<[^>]*>/g, '' );
      seo_description = seo_description.replace( /(\[.*\])/g, '...' );
      desEl.content = seo_description;

      return this.title;
    },
  }
  // End methods
};
</script>
