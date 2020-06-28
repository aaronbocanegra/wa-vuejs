<template>
  <div class="widget homepage">
    <h1 v-if="this.$slots.default != undefined">
      <slot></slot>
    </h1>
    <div v-if="allPagesLoaded">
      <h1 class="page-title text-3xl mb-5" v-html="pageContent.title.rendered"></h1>
      <div class="page-content" v-html="pageContent.content.rendered"></div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../partials/Loader.vue";
import { mapGetters } from 'vuex';

export default {
  props: [ 'page_id' ],
  computed: {
    ...mapGetters({
      page: 'page',
      allPagesLoaded: 'allPagesLoaded',
    }),

    pageContent() {
      return this.page( parseInt(this.page_id) );
    },
  },

  components: {
    Loader,
  },  // End components
};
</script>
