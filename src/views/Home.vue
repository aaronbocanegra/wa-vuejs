<template>
  <div class="page page--home">
    <recent-posts-widget v-bind:limit="5">Portfolio</recent-posts-widget>
    <pages-widget v-bind:limit="5">Pages</pages-widget>
  </div>
</template>

<script>
import RecentPostsWidget from '../components/widgets/RecentPosts.vue';
import PagesWidget from '../components/widgets/Pages.vue';

export default {
  components: {
    RecentPostsWidget,
    PagesWidget,
  }, // End Components
};
</script>
