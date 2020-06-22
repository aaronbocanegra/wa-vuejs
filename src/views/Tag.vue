<template>
  <div class="page page--tag">
    <transition name="fade" mode="out-in">
      <tag-posts-widget v-if="activeTag( this.$route.params.tagSlug )"
                        v-bind:tag="activeTag( this.$route.params.tagSlug )"
                        class="mb-10"></tag-posts-widget>
    </transition>
  </div>
</template>

<script>
import TagPostsWidget from '../components/widgets/TagPosts.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      activeTag: "activeTag",
      allTagsLoaded: "allTagsLoaded",
    }),
  },

  components: {
   TagPostsWidget,
  },

  data() {
    return {
      tag: [],
      prevSlug: false,
    };
  },
  // End data
};
</script>
