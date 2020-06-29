<template>
  <div class="widget tag-posts">
    <h1 class="w-full flex flex-wrap flex-row">
      <router-link :to="{name: 'Archive', params: { taxSlug: 'tags' }}" 
                   title="Tags Archive">Tags</router-link>
      <div>&nbsp;|&nbsp;</div>
      <slot :tag="tag">{{ tag.name }}</slot>
    </h1>
    <wa-link-prevue class="border-b-2 border-gray-400 mb-3" 
                    :url="tag.description" 
                    :title="tag.name" 
                    :index="tag.id"
                    :slug="tag.slug"
                    :taxonomy="tag.taxonomy" 
                    :count="tag.count" 
                    mode="filter-card"></wa-link-prevue>
    <ul v-if="tagPostsLoaded" class="my-5 min-h-64 sm:min-h-56 grid grid-cols-1 lg:grid-cols-2 gap-1">
      <li v-for="post in filterPosts()" :key="post.id" class="relative">
        <router-link v-bind:tagid="tag.id" 
                     :to="post.slug"
                     :title="post.title.rendered"
                     class="w-full flex flex-row cursor-pointer">
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
    <Loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '../partials/Loader.vue';
import WaLinkPrevue from '../WaLinkPrevue.vue';

export default {
  props: [ 'tag'],
  computed: {
    ...mapGetters({
      tagPosts: 'tagPosts',
      tagPostsLoaded: 'tagPostsLoaded',
    }),
  },
  
  components: {
    WaLinkPrevue,
    Loader, 
  },

  data() {
    return {
      prevSlug: false,
    };
  },
  // End Data

  beforeMount() {
    this.filterPosts();
    this.setSeo();
  },

  methods: {
    filterPosts: function() {
      if( this.prevSlug != this.tag.id ){
        this.$store.dispatch('clearTagPosts');
        this.$store.dispatch('getTagPosts', { tagid: this.tag.id });
        this.prevSlug = this.tag.id;
        this.setSeo();
      }
      return this.tagPosts( this.tag.id );
    },

    setSeo: function(){
      var desEl = document.getElementsByName('description')[0];
      var seo_description = "Filter portfolio by Tag: " + this.tag.name;
      desEl.content = seo_description;

      var baseName = this.$store.state.customLogo.all.site_name;
      var pageTitle = "Tag - " + this.tag.name + " | " + baseName;
      document.title = pageTitle;
      return this.title;
    },

  },
};
</script>
