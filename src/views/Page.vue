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

  beforeMount() {
    this.setPageTitle();
  },

  updated() {
    this.setPageTitle();
  },
 
  methods: {
    setPageTitle: function(){
      var pageTitle;
      if( this.$root.page_for_posts != this.pageContent.id ){
        pageTitle = this.pageContent.title.rendered + " | " + this.$store.state.customLogo.all.site_name;
        document.title = pageTitle;
      }
    }

  },
};
</script>

<style type="postcss" scoped>
</style>
