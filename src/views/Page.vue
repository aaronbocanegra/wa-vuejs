<template>
  <div class="page page--page">
    <recent-posts-widget v-if="$root.show_on_front === 'page' && $root.page_for_posts === pageContent.id" v-bind:limit="$root.storedPostsPerPage" v-bind:page="$root.storedPostsPageNum">Portfolio</recent-posts-widget>
    <div v-else-if="allPagesLoaded">
      <h1 class="text-3xl mb-5">{{ pageContent.title.rendered }}</h1>
      <div class="page-content" v-html="pageContent.content.rendered"></div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import RecentPostsWidget from '../components/widgets/RecentPosts.vue';
import Loader from '../components/partials/Loader.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      page: 'page',
      allPagesLoaded: 'allPagesLoaded',
    }),

    pageContent() {
      return this.page(this.$route.params.pageSlug);
    },
  }, // End Computed

  components: {
    RecentPostsWidget,
    Loader,
  },
  
  mounted() {
    this.setSeo();
  },

  updated() {
    this.setSeo();
  },
 
  methods: {
    setSeo: function(){
        var seo_description;
        var desEl;

      if( this.$root.page_for_posts != this.pageContent.id ){
        document.title = this.pageContent.title.rendered + " - " + this.$store.state.options.all.blogname;
        desEl = document.getElementsByName('description')[0];
        seo_description = this.pageContent.excerpt.rendered;
        seo_description = seo_description.replace( /<[^>]*>/g, '' );
        seo_description = seo_description.replace( /(\[.*\])/g, '...' );
        desEl.content = seo_description;
      }
    },

  },
};
</script>

<style type="postcss" scoped>
</style>
