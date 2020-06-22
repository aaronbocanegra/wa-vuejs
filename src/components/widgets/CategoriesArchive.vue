<template>
  <div class="widget categories-archive">
    <h1>
      <slot></slot>
    </h1>
    <div v-if="allCategoriesLoaded" class="categories-archive__content">
      <ul class="w-full wa-vuejs-taxonomy__categories"
        <li v-for="(category, index) in allCategories" :key="category.id" 
            class="w-full list-none">
          <router-link :to="{ name: 'Category', params: { categorySlug: category.slug } }"
                       :title="'Filter Posts by Category: ' + category.name"
                       class="wa-vuejs-taxonomy__wrapper w-full flex flex-rows cursor-pointer hover:text-black text-black p-3 mb-6 shadow-lg hover:shadow-2xl relative">
            <div class="wa-vuejs-taxonomy__card-text px-4 w-full">
              <div v-if="category.count" class="wa-vuejs-taxonomy__card-count absolute z-50 bg-gray-500 text-white px-2 line-height-3 text-xs py-1 right-0 mt-1 mr-2 rounded-full">{{ category.count }}</div>
              <h3 class="flex flex-wrap flex-rows font-hairline border-b-2 border-green-600 hover:border-blue-600">
                <div v-if="activeCategory( category.parent )">{{ activeCategory( category.parent ).name }}</div>
                <div v-if="activeCategory( category.parent )">&nbsp;>&nbsp;</div>
                <div v-if="category.name.length" class="0" v-html="category.name"></div>
              </h3>
              <p v-if="category.description.length" v-html="category.description"></p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import Loader from "../partials/Loader.vue";
import { mapGetters } from 'vuex';

export default {
  props: ['mode'],

  computed: {
    ...mapGetters({
      allCategories:       'allCategories',
      allCategoriesLoaded: 'allCategoriesLoaded',
      activeCategory:       'activeCategory',
    }),
  },

  data() {
    return {
    };
  },  // End data
 
  components: {
    Loader,
  }, // End Components
};
</script>
