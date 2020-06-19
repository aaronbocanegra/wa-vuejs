<template>
  <div class="page page--archive">
    <!-- Tags Archive -->
    <div v-if="taxonomy === 'tags'" class="wa-vuejs-taxonomy__tags" >
      <tags-archive v-if="taxonomy === 'tags'" :mode="selectTagMode">{{ title }}</tags-archive>
    </div>

    <!-- Categories Archive -->
    <div v-if="taxonomy === 'categories'" class="wa-vuejs-taxonomy__categories">
      <nav class="wa-vuejs_taxonomy__nav">
        <button type="button"
                @click="selectTagMode = 'cards'"
                value="Cards">Cards</button>
        <button type="button"
                @click="selectTagMode = 'icons'"
                value="Cards">Cards</button>
      </nav> 
      <categories-archive v-if="taxonomy === 'categories'" :mode="selectTagMode">{{ title }}</categories-archive>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import TagsArchive from "../components/widgets/TagsArchive.vue"

export default {
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
 
  methods: {
    setPageTitle: function(){
      var origPageTitle = this.$route.params.taxSlug;
      var uppercaseFirstLetter = origPageTitle.charAt(0).toUpperCase();
      var stringWithoutFirstLetter = origPageTitle.slice(1);
      this.title = uppercaseFirstLetter + stringWithoutFirstLetter + " " + this.$route.name;
      var baseName = this.$root.allCustomLogo.site_name;
      var pageTitle = this.title + " | " + baseName;
      document.title = pageTitle;
    },
  },

};
</script>
