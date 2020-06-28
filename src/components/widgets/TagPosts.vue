<template>
  <div class="widget tag-posts">
    <h1 class="w-full flex flex-wrap flex-rows">
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
    <ul v-if="tagPostsLoaded" class="mt-5">
      <li v-for="post in filterPosts()" :key="post.id">
        <router-link v-bind:tagid="tag.id" 
                     :to="post.slug"
                     :title="post.title.rendered"
                     class="w-full flex flex-row cursor-pointer">
          <img v-if="post._embedded['wp:featuredmedia'] != undefined"
            class="w-1/2 object-cover flex rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            :src="post._embedded['wp:featuredmedia'][0].media_details.sizes['medium_large'].source_url"
            :alt="post._embedded['wp:featuredmedia'][0].alt_text" />          
          <div
            class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
                  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-1/2 object-contain">
            <div class="mb-8">
              <div class="text-green-600 hover:text-blue-600 font-bold text-xl mb-2">{{ post.title.rendered }}</div>
              <p class="text-gray-700 text-base" v-html="post.excerpt.rendered"></p>
            </div>
            <div v-if="$root.show_author_avatar" class="flex items-center">
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
    this.setPageTitle();
  },

  methods: {
    filterPosts: function() {
      if( this.prevSlug != this.tag.id ){
        this.$store.dispatch('clearTagPosts');
        this.$store.dispatch('getTagPosts', { tagid: this.tag.id });
        this.prevSlug = this.tag.id;
      }
      return this.tagPosts( this.tag.id );
    },

    setPageTitle: function(){
      var baseName = this.$store.state.customLogo.all.site_name;
      var pageTitle = "Tag - " + this.tag.name + " | " + baseName;
      document.title = pageTitle;
      return this.title;
    },

  },
};
</script>
