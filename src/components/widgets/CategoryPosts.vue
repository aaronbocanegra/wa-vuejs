<template>
  <div class="widget category-posts">
    <h3>
      <slot></slot>
    </h3>
    <div v-if="categoryPostsLoaded">
      <div v-for="post in categoryPosts(catid)" :key="post.id">
        <router-link 
          v-bind:catid="catid" 
          :to="post.slug"
          :title="post.title.rendered"
          tag="div" 
          class="w-full flex flex-row cursor-pointer">
          <img v-if="post._embedded['wp:featuredmedia'] != undefined"
            class="w-1/2 object-contain flex rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            :src="post._embedded['wp:featuredmedia'][0].media_details.sizes['medium_large'].source_url"
            :alt="post._embedded['wp:featuredmedia'][0].alt_text" />          
          <div
            class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
                  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-1/2 object-contain">
            <div class="mb-8">
              <div class="text-gray-900 font-bold text-xl mb-2">{{ post.title.rendered }}</div>
              <p class="text-gray-700 text-base" v-html="post.excerpt.rendered"></p>
            </div>
            <div class="flex items-center">
              <img
                class="w-10 h-10 rounded-full mr-4"
                :src="post._embedded['author'][0].avatar_urls[96]"
                alt="post._embedded['author'][0].name"
              />
              <div class="text-sm">
                <p class="text-gray-600">{{ post._embedded["author"][0].name }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../../settings";
import { mapGetters } from 'vuex';
import Loader from '../partials/Loader.vue';

export default {
  props: [ 'catid', ],
  computed: {
    ...mapGetters({
      categoryPosts: 'categoryPosts',
      categoryPostsLoaded: 'categoryPostsLoaded',
    }),
  },
  
  components: {
    Loader, 
  },

  data() {
    return {
      category: false,
      prevID: false,
    };
  },
  // End Data

  mounted() {
    this.getCategory();
  },

  beforeUpdate() {
    this.getCategory();
  },
  methods: {
    getCategory: function() {
      if( this.prevID != this.catid ){
        this.$store.dispatch('getCategoryPosts', { catid: this.catid });
        this.prevID = this.catid;
      }
    },
  },


};
</script>
