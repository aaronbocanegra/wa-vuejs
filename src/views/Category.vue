<template>
  <div class="page page--category pt-5">
    <transition name="fade" mode="out-in">
      <category-posts-widget  v-if="this.prevSlug == this.$route.params.categorySlug"
                              v-bind:catid="this.category.id" 
                              class="mb-10">
        {{ this.category.name }}
      </category-posts-widget>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../settings";

import CategoryPostsWidget from '../components/widgets/CategoryPosts.vue';
import TransitionPage from '../components/partials/TransitionPage.vue';

export default {
  components: {
    CategoryPostsWidget,
    TransitionPage,
  },

  data() {
    return {
      category: [],
      prevSlug: false,
    };
  },
  // End data

  mounted() {
    this.getCategory();
  },

  beforeUpdate() {
    this.getCategory();
  }, 
 
  methods: {
    async getCategory() {
      if( this.category == undefined || this.$route.params.categorySlug != this.prevSlug ){
        await axios
          .get(
            SETTINGS.API_BASE_PATH + "categories?slug=" + this.$route.params.categorySlug
          )
          .then(response => {
            this.category = response.data[0];
            this.prevSlug = this.$route.params.categorySlug;
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
};
</script>

<style type="postcss" scoped>
</style>
