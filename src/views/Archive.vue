<template>
  <div class="page page--archive">

    <!-- Tags Archive -->
    <div v-if="filterTax() === 'tags'" class="wa-vuejs-taxonomy__tags" >
      <tags-archive :mode="selectTagMode">{{ this.title }}</tags-archive>
    </div>

    <!-- Categories Archive -->
    <div v-if="filterTax() === 'categories'" class="wa-vuejs-taxonomy__categories">
      <categories-archive>{{ this.title }}</categories-archive>
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
    this.setSeo();
  }, // End beforeMount
 
   methods: {
    filterTax: function() {
      if( this.taxonomy != this.$route.params.taxSlug ){
        this.taxonomy = this.$route.params.taxSlug;
        this.setSeo();
      }
      return this.taxonomy;
    },

    setSeo: function(){
      var origPageTitle = this.$route.params.taxSlug;
      var uppercaseFirstLetter = origPageTitle.charAt(0).toUpperCase();
      var stringWithoutFirstLetter = origPageTitle.slice(1);
      this.title = uppercaseFirstLetter + stringWithoutFirstLetter + " " + this.$route.name;
      var baseName = this.$store.state.options.all.blogname;
      var pageTitle = this.title + " - " + baseName;
      document.title = pageTitle;

      var desEl = document.getElementsByName('description')[0];
      var seo_description = this.title + ": Display the archive details with links to filter the portfolio. ";
      desEl.content = seo_description;

      return this.title;
    },
  },

};
</script>
