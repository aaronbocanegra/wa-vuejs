<template>
    <div v-if="allPagesLoaded" class="pt-10">
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
      page: 'page',
      allPagesLoaded: 'allPagesLoaded',
    }),

    pageContent() {
      return this.page(this.$route.params.pageSlug);
    },
  },

  components: {
    Loader,
  },
};
</script>

<style type="postcss" scoped>
</style>
