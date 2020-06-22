<template>
  <div class="page page--category">
    <transition name="fade" mode="out-in">
      <category-posts-widget v-if="allCategoriesLoaded"
                             v-bind:category="filterCategory()"
                             v-bind:parent="this.parentCategory"
                             class="mb-10">
      </category-posts-widget>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CategoryPostsWidget from '../components/widgets/CategoryPosts.vue';

export default {
  computed: {
    ...mapGetters({
      allCategoriesLoaded: 'allCategoriesLoaded',
      activeCategory: 'activeCategory',
    }),
  },

  data() {
    return {
      category: [],
      parentCategory: [],
    };
  },
  // End data

  components: {
    CategoryPostsWidget,
  },

  methods: {
    filterCategory: function() {
      this.category = this.activeCategory( this.$route.params.categorySlug );
      if( this.category.parent ){
        this.parentCategory = this.activeCategory( this.category.parent );
      }
      return this.category;
    },
  },
};
</script>
