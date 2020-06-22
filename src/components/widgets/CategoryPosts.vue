<template>
  <div class="widget category-posts">
    <h1 class="flex flex-wrap flex-rows w-full">
      <router-link :to="{name: 'Archive', params: { taxSlug: 'categories' }}"
                   title="View Categories Archive">Categories</router-link>
      <div>&nbsp;|&nbsp;</div>
      <slot :parent="this.parent" :category="this.category">
        <router-link v-if="category.parent"
                     :to="{name: 'Category', params: { categorySlug: parent.slug }}"
                     :title="'Filter Posts by: ' + parent.name">{{ parent.name }}</router-link>
        <div v-if="category.parent">&nbsp;>&nbsp;</div>
        <div>{{ category.name }}</div>
      </slot>
    </h1>
    <div v-if="categoryPostsLoaded">
      <div v-for="post in categoryPosts(category.id)" :key="post.id">
        <router-link :to="post.slug"
                     :title="post.title.rendered"
                     tag="div" 
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
      </div>
    </div>
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

  updated() {
    this.filterPosts();
  },
  methods: {
    filterPosts: function() {
      if( this.prevSlug != this.category.id ){
        this.$store.dispatch('getCategoryPosts', { catid: this.category.id });
        this.prevSlug = this.category.id;
        return this.categoryPosts( this.category.id );
      }
    }
  },
};
</script>
