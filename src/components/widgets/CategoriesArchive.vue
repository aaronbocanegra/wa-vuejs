<template>
  <div class="widget categories-archive">
    <h1 id="wa-vuejs__home-title">
      <slot></slot>
    </h1>
    <div v-if="allCategoriesLoaded" class="categories-archive__content">
      <ul class="w-full wa-vuejs-taxonomy__categories">
        <li v-for="(category, index) in allCategories" 
            :key="category.id" 
            :class="[ index % 2 == 0 ? 'transform-translate-x-screen' : '-transform-translate-x-screen']"
            class="wa-vuejs__category_li list-none mb-5 mx-1 hover:mx-0 transition-all duration-300">
          <router-link :to="{ name: 'Category', params: { categorySlug: category.slug } }"
                       :title="'Filter Posts by Category: ' + category.name"
                       class="wa-vuejs-taxonomy__wrapper w-full flex flex-row cursor-pointer px-4 w-full px-3 mb-6 bg-black bg-opacity-25 shadow-lg-white hover:shadow-xl-white relative"">
            <div class="wa-vuejs-taxonomy__card-text px-4 w-full text-white">
              <div v-if="category.count" 
                   class="wa-vuejs-taxonomy__card-count absolute bg-black bg-opacity-50 text-white px-2 line-height-3 text-xs py-1 right-0 mr-2 mt-1 rounded-full">{{ category.count }}</div>
              <h3 class="flex flex-wrap flex-row pt-2 font-hairline tracking-widest border-b-2 border-blue-800 hover:border-green-800">
                <div v-if="activeCategory( category.parent )">{{ activeCategory( category.parent ).name }}</div>
                <div v-if="activeCategory( category.parent )">&nbsp;>&nbsp;</div>
                <div v-if="category.name.length" class="0" v-html="category.name"></div>
              </h3>
              <p v-if="category.description.length" class="tracking-wide" v-html="category.description"></p>
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

  mounted() {
    this.slideIn();
  },

  methods: {
    slideIn: function(){
      /* Slide In Posts */
      if(this.allCategoriesLoaded){
        setTimeout(() => {
          var items = document.getElementsByClassName('wa-vuejs__category_li');
          items.forEach( async function( item ){
            item.classList.remove("transform-translate-x-screen");
            item.classList.remove("-transform-translate-x-screen");
          });
        },125);
      }
    }
  } 
};
</script>
