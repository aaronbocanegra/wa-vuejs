<template>
  <div class="page page--home">
    <recent-posts-widget v-if="$root.show_on_front === 'posts'" v-bind:limit="$root.storedPostsPerPage" v-bind:page="$root.storedPostsPageNum">Portfolio</recent-posts-widget>
    <home-page-widget v-else-if="$root.show_on_front === 'page'" v-bind:page_id="$root.page_on_front"></home-page-widget>
  </div>
</template>

<script>
import RecentPostsWidget from '../components/widgets/RecentPosts.vue';
import HomePageWidget from '../components/widgets/HomePage.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      allOptions: 'allOptions',
      allOptionsLoaded: 'allOptionsLoaded',
    }),
  },

  components: {
    RecentPostsWidget,
    HomePageWidget,
  }, // End Components

  data() {
    return {
      seo_title: this.$store.state.options.all.blogname,
      seo_description: this.$store.state.options.all.blogdescription,
    };
  }, // End Data

  mounted() {
    this.setSeo();
  },

  methods: {
    setSeo: function(){
      var desEl = document.getElementsByName('description')[0];
      document.title = this.seo_title + " - " + this.seo_description;
      desEl.content = this.seo_description;
    },
  },

};
</script>
