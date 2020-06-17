<template>
    <div v-if="allPagesLoaded" class="pt-5">
      <h1 class="text-3xl mb-5">{{ pageContent.title.rendered }}</h1>
      <div class="page-content" v-html="pageContent.content.rendered"></div>
    </div>
    <Loader v-else />
</template>

<script>
import Loader from '../components/partials/Loader.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      allCustomLogo: 'allCustomLogo',
      page: 'page',
      allPagesLoaded: 'allPagesLoaded',
    }),

    pageContent() {
      return this.page(this.$route.params.pageSlug);
    },
  }, // End Computed

  components: {
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
      var pageTitle = this.pageContent.title.rendered + " | " + this.allCustomLogo.site_name;
      document.title = pageTitle;
    }

  },
};
</script>

<style type="postcss" scoped>
</style>
