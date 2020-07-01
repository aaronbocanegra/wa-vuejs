<template>
  <div class="widget category-posts">
    <h1 class="flex flex-wrap flex-row w-full text-xl tracking-widest">
      <router-link :to="{name: 'Archive', params: { taxSlug: 'categories' }}"
                   title="View Categories Archive">Categories Archive</router-link>
      <slot v-if="false" :parent="parent" :category="category">
        <div>&nbsp;|&nbsp;</div>
        <router-link v-if="category.parent"
                     :to="{name: 'Category', params: { categorySlug: parent.slug }}"
                     :title="'Filter Posts by: ' + parent.name">{{ parent.name }}</router-link>
        <div v-if="category.parent">&nbsp;>&nbsp;</div>
        <div>{{ category.name }}</div>
      </slot>
    </h1>
    <div class="wa-link-prevue-content w-full mb-10 relative">
      <div class="wa-vuejs-taxonomy__card-text px-4 w-full p-3 mb-6 bg-black bg-opacity-25 shadow-md-white relative">
        <div v-if="category.count" 
            class="wa-vuejs-taxonomy__card-count absolute bg-black bg-opacity-50 text-white px-2 line-height-3 text-xs py-1 right-0 mr-2 rounded-full">{{ category.count }}</div>
        <h3 class="flex flex-wrap flex-row font-hairline border-b-2 border-gray-600">
          <div v-if="parent">
            <router-link v-if="category.parent"
                         :to="{name: 'Category', params: { categorySlug: parent.slug }}"
                         :title="'Filter Posts by: ' + parent.name">{{ parent.name }}</router-link>
          </div>
            <div v-if="category.parent">&nbsp;>&nbsp;</div>
            <div v-if="category.name.length" class="0" v-html="category.name"></div>
        </h3>
        <p v-if="category.description.length" class="tracking-wide" v-html="category.description"></p>
      </div>
    </div>

    <!-- Posts -->
    <ul v-if="categoryPostsLoaded" class="mb-5 min-h-64 sm:min-h-56 grid grid-cols-1 gap-10">
      <li v-for="post in filterPosts()" :key="post.id" class="wa-vuejs__posts_li mx-1 hover:mx-0 transition-all duration-300 shadow-lg-white hover:shadow-xl-white">
        <router-link :to="post.slug"
                     :title="post.title.rendered"
                     class="w-full flex flex-row cursor-pointer h-full">
          <picture v-if="post._embedded['wp:featuredmedia'] != undefined">
                   <source v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_extra_large'] != undefined"
                            media="(min-width:1921px)"
                            :srcset="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_extra_large'].source_url">
                   <source v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_large'] != undefined"
                            media="(min-width:1281px)"
                            :srcset="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_large'].source_url">
                   <source v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_medium_large'] != undefined"
                            media="(min-width:721px)"
                            :srcset="post._embedded['wp:featuredmedia'][0].media_details.sizes['post_thumbnail_medium_large'].source_url">
                   <img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail'].source_url"
                        :alt="post._embedded['wp:featuredmedia'][0].alt_text"
                        draggable="false"
                        class="wa-vuejs_post-card-featured min-h-64 sm:min-h-56 w-full object-cover flex rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          </picture>
 
          <div class="wa-vuejs_post-description absolute w-full sm:w-1/2 lg:w-1/3 text-white bg-black bg-opacity-65 hover:bg-opacity-75
                      p-4 flex flex-col justify-between leading-normal inset-0 object-contain">
            <div class="wa-vuejs__post-card">
              <div class="wa-vuejs__post-card-title">{{ post.title.rendered }}</div>
              <p class="wa-vuejs_post-excerpt leading-snug sm:leading-tight lg:leading-normal text-white text-base pt-10" v-html="post.excerpt.rendered"></p>
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

export default {
  props: [ 'category', 'parent', ],
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
      if( this.prevSlug != this.category.id ){
        this.$store.dispatch('clearCategoryPosts');
        this.$store.dispatch('getCategoryPosts', { catid: this.category.id });
        this.prevSlug = this.category.id;
        this.setSeo();
      }
      return this.categoryPosts( this.category.id );
    },

    setSeo: function(){
      var desEl = document.getElementsByName('description')[0];
      var seo_description = "Filter Portfolio by Category: " + this.category.name + ". " + this.category.description;
      desEl.content = seo_description;

      var baseName = this.$store.state.options.all.blogname;
      var pageTitle = "Category - " + this.category.name + " - " + baseName;
      document.title = pageTitle;
      return this.title;
    },

  },
};
</script>
