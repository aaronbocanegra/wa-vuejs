<template>
  <div class="page page--home">
    <recent-posts-widget v-if="$root.show_on_front === 'posts'" v-bind:limit="$root.storedPostsPerPage" v-bind:page="$root.storedPostsPageNum">Portfolio</recent-posts-widget>
    <home-page-widget v-else-if="$root.show_on_front === 'page'" v-bind:page_id="$root.page_on_front"></home-page-widget>
  </div>
</template>

<script>
import RecentPostsWidget from '../components/widgets/RecentPosts.vue';
import HomePageWidget from '../components/widgets/HomePage.vue';

export default {
  components: {
    RecentPostsWidget,
    HomePageWidget,
  }, // End Components
};
</script>
