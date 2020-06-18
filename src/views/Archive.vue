<template>
  <div class="page page--archive pt-5 w-full mb-5 sm:mb-10 md:mb-10">
    <h1>{{ title }}</h1>

    <!-- Tags Archive -->
    <div class="wa-vuejs-taxonomy__tags" v-if="taxonomy === 'tags'">
      <nav class="wa-vuejs_taxonomy__nav flex flex-row justify-end border-b-2 mb-3 pr-3">
        <button type="button"
                @click="selectTagMode = 'cards'"
                v-bind:class="[ selectTagMode === 'cards' ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600']"
                class="h-10 px-5 font-bold rounded-t-lg hover:shadow-inner hover:bg-green-300 hover:text-black text-white mr-1 tracking-wider"
                value="Cards">Cards</button>
        <button type="button"
                @click="selectTagMode = 'icons'"
                v-bind:class="[ selectTagMode === 'icons' ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600']"
                class="h-10 px-5 font-bold rounded-t-lg hover:shadow-inner hover:bg-green-300 hover:text-black text-white mr-1 tracking-wider"
                value="icons">Icons</button>
        <button type="button"
                @click="selectTagMode = 'cloud'"
                v-bind:class="[ selectTagMode === 'cloud' ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600']"
                class="h-10 px-5 font-bold rounded-t-lg hover:shadow-inner hover:bg-green-300 hover:text-black text-white tracking-wider"
                value="cloud">Cloud</button>
      </nav> 
      <tags-archive v-if="taxonomy === 'tags'" :mode="selectTagMode"></tags-archive>
    </div>

    <!-- Categories Archive -->
    <div class="wa-vuejs-taxonomy__categories" v-if="taxonomy === 'categories'">
      <nav class="wa-vuejs_taxonomy__nav">
        <button type="button"
                @click="selectTagMode = 'cards'"
                value="Cards">Cards</button>
        <button type="button"
                @click="selectTagMode = 'icons'"
                value="Cards">Cards</button>
      </nav> 
      <categories-archive v-if="taxonomy === 'categories'" :mode="selectTagMode"></categories-archive>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import TagsArchive from "../components/widgets/TagsArchive.vue"
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      allCustomLogo:       'allCustomLogo',
    }),
  },

  data() {
    return {
      taxonomy: this.$route.params.taxSlug,
      title: false,
      selectTagMode: 'cards',
    };
  },  // End data
 
  components: {
    TagsArchive,
  },

  beforeMount() {
    this.setPageTitle();
  }, // End beforeMount

  mounted() {
  }, // End Mounted
 
  methods: {
    setPageTitle: function(){
      var origPageTitle = this.$route.params.taxSlug;
      var uppercaseFirstLetter = origPageTitle.charAt(0).toUpperCase();
      var stringWithoutFirstLetter = origPageTitle.slice(1);
      this.title = uppercaseFirstLetter + stringWithoutFirstLetter + " " + this.$route.name;
      var baseName = this.allCustomLogo.site_name;
      var pageTitle = this.title + " | " + baseName;
      document.title = pageTitle;
    },
  },

};
</script>

<style type="postcss" scoped>
</style>
