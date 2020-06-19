<template>
  <div class="page page--post">
    <div v-if="post && isAllLoaded">
      <div class="taxonomies flex flex-col text-sm md:text-base mb-2">
        <!-- Categories -->
        <ul v-if="categoriesArr.length > 0" class="categoryUL mr-2 flex border-b-2 border-green-900">
          <li v-for="category in categoriesArr" 
              :key="category.id" 
              class="categoryLI font-semibold mr-1 pr-2" 
              :id="category.slug" >
            <router-link :to="{name: 'Category', params: { categorySlug: category.slug }}"
                         v-bind:catid="catid" 
                         :title="category.name" replace>
              {{ category.name }}
            </router-link>
          </li>
        </ul>
        
        <!-- Tags -->
        <ul v-if="tagsArr.length > 0" class="tagsUL flex flex-wrap">
          <li v-for="tag in tagsArr" :key="tag.id" class="tagLI mr-1 pr-2 font-semibold" :id="tag.slug" >
            <a :href="tag.description" :title="'External Link -> ' + tag.name" rel="external" target="_blank">
              {{ tag.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Featured Media -->
      <div v-if="post._embedded['wp:featuredmedia'][0]" class="relative max-w-full">
        <img 
             :src="post._embedded['wp:featuredmedia'][0].media_details.sizes['large'].source_url"
             :alt="post._embedded['wp:featuredmedia'][0].alt_text" 
             class="z-0 "/>
        <div class="absolute w-full inset-x-0 top-0">
          <h1 class="w-full text-white p-2 bg-opacity-75 bg-black z-10000">{{ post.title.rendered }}</h1>
        </div>
      </div>

      <!-- Portfolio Videos -->
      <transition name="fade" mode="out-in">
        <div class="portfolio mt-3 mb-3"
             v-if="isVideosLoaded">
          <WaLightbox 
             v-bind:gallery="videos"
             v-bind:effect="'fade'">
          </WaLightbox>
        </div>
      </transition>

      <!-- Portfolio Images -->
      <transition name="fade" mode="out-in">
        <div class="portfolio mt-3 mb-3"
             v-if="isGalleryLoaded">
          <WaLightbox 
             v-bind:gallery="gallery"
             v-bind:effect="'slide'">
          </WaLightbox>
        </div>
      </transition>

      <div class="content">
        <!-- Description -->
        <h3>Description</h3>
        <div v-html="post.excerpt.rendered"></div>
      
        <!-- Content -->
        <h3>Case Study</h3>
        <div v-html="post.content.rendered"></div>
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

export default {
  data() {
    return {
      post: false,
      portfolioArr: [],
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
    this.getPost()
  },
  // End beforeMount

  methods: {
    // Assign Post JSON and call to getPortfolio
    async getPost() {
      await axios
        .get(
          SETTINGS.API_BASE_PATH + "posts?_embed&slug=" + this.$route.params.postSlug
        )
        .then(response => {
          this.post = response.data[0];
          // Get JSON from Arrays
          this.getPortfolio(this.post);
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
    getPortfolio: function(ps) {
      if(ps.metadata.vuejs_custom_gallery != undefined){
        this.portA = ps.metadata.vuejs_custom_gallery[0].split(",");
        // Loop through portfolio array
        var i = 0;
        this.portA.forEach((p) => {
          axios.get(
            SETTINGS.API_BASE_PATH + "media/" + p
          )
          .then(response => {
            this.portfolioArr.push(response.data);
            //Create Portfolio Items List
            this.galleryItem = [];
            this.galleryItem.id = i;
            this.galleryItem.object_id = response.data.id;
            this.galleryItem.xl = response.data.media_details.sizes["vuejs_wordpress-4k"].source_url;
            this.galleryItem.lg = response.data.media_details.sizes["vuejs_wordpress-1080"].source_url;
            this.galleryItem.md = response.data.media_details.sizes["vuejs_wordpress-720"].source_url;
            this.galleryItem.src = response.data.media_details.sizes["vuejs_wordpress-480"].source_url;
            this.galleryItem.thumbnail = response.data.media_details.sizes.thumbnail.source_url;
            this.galleryItem.type = response.data.media_type;
            this.galleryItem.title = response.data.title.rendered;
            this.galleryItem.alt = response.data.alt_text;
            this.galleryItem.description = response.data.caption.rendered;
            this.galleryItem.htmldesc = response.data.description.rendered;
            this.gallery.push(this.galleryItem);
            i++;
          })
          .catch(e => {
             console.log(e);
          });
        });
        this.isGalleryLoaded = true;
      }

      if(ps.metadata.vuejs_custom_videos != undefined){
        axios.get(
          SETTINGS.API_VENDOR_PATH + "vuejs_videos?postid=" + this.post.id
        )
        .then(response => {
          this.videos = response.data[0];
        })
        .catch(e => {
           console.log(e);
        });
        this.isVideosLoaded = true;
      }
    },

    // Assign Tags JSON data to array
    getTags: function(tags) {
      // Loop through tags array
      tags.forEach((t) => {
        axios.get(
          SETTINGS.API_BASE_PATH + "tags/" + t
        )
        .then(response => {
          this.tagsArr.push(response.data);
        })
        .catch(e => {
           console.log(e);
        });
      });
    },

    // Assign Categories JSON data to array
    getCategories: function(cats) {
      // Loop through tags array
      cats.forEach((c) => {
        axios.get(
          SETTINGS.API_BASE_PATH + "categories/" + c
        )
        .then(response => {
          this.categoriesArr.push(response.data);
        })
        .catch(e => {
           console.log(e);
        });
      });
    }
  }
  // End methods
};
</script>
