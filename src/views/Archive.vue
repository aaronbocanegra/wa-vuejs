<template>
  <div class="page page--archive">

    <!-- Tags Archive -->
    <div v-if="filterTax() === 'tags'" class="wa-vuejs-taxonomy__tags relative" >
      <tags-archive :mode="selectTagMode">{{ setPageTitle() }}</tags-archive>
    </div>

    <!-- Categories Archive -->
    <div v-if="filterTax() === 'categories'" class="wa-vuejs-taxonomy__categories">
      <categories-archive>{{ setPageTitle() }}</categories-archive>
    </div>

  </div>
</template>

<script>
import TagsArchive from "../components/widgets/TagsArchive.vue"
import CategoriesArchive from "../components/widgets/CategoriesArchive.vue"

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
    CategoriesArchive,
  },

  beforeMount() {
    this.setPageTitle();
  }, // End beforeMount
 
   methods: {
    filterTax: function() {
      if( this.taxonomy != this.$route.params.taxSlug ){
        this.taxonomy = this.$route.params.taxSlug;
      }
      return this.taxonomy;
    },

    setPageTitle: function(){
      var origPageTitle = this.$route.params.taxSlug;
      var uppercaseFirstLetter = origPageTitle.charAt(0).toUpperCase();
      var stringWithoutFirstLetter = origPageTitle.slice(1);
      this.title = uppercaseFirstLetter + stringWithoutFirstLetter + " " + this.$route.name;
      var baseName = this.$store.state.customLogo.all.site_name;
      var pageTitle = this.title + " | " + baseName;
      document.title = pageTitle;
      return this.title;
    },
  },

};
</script>
