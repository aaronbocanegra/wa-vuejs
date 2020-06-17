<template>
  <div class="page page--archive pt-5 w-full">
    <h1>{{ this.title }}</h1>
    <div class="wa-vuejs-taxonomy wa-vuejs-taxonomy__tags">
      <ul v-if="isTaxonomyLoaded" class="w-full">
        <li class="w-full">
          <wa-link-prevue url="https://whatartist.com" title="Whatartist"></wa-link-prevue>
        </li>
        <li v-for="tag in tags"
            class="w-full">
          <wa-link-prevue :url="tag.description" :title="tag.name"></wa-link-prevue>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../settings";
import WaLinkPrevue from '../components/WaLinkPrevue.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      allCustomLogo:       'allCustomLogo',
      allCustomLogoLoaded: 'allCustomLogoLoaded',
    }),
  },

  data() {
    return {
      tags: [],
      isTaxonomyLoaded: false,
      title: false,
    };
  },  // End data
 
  components: {
    WaLinkPrevue,
  },

  beforeMount() {
    this.setPageTitle();
  }, // End beforeMount

  mounted() {
    this.getTags();
  }, // End Mounted
 
  methods: {
    async getTags() {
      await axios
        .get(
          SETTINGS.API_BASE_PATH + "tags?orderby=name"
        )
        .then(response => {
          this.tags = response.data;
          this.isTaxonomyLoaded = true;
          console.log(this.tags);
        })
        .catch(e => {
          console.log(e);
        });
    },

    setPageTitle: function(){
      var origPageTitle = this.$route.params.taxSlug;
      var uppercaseFirstLetter = origPageTitle.charAt(0).toUpperCase();
      var stringWithoutFirstLetter = origPageTitle.slice(1);
      this.title = uppercaseFirstLetter + stringWithoutFirstLetter + " " + this.$route.name;
      var baseName = this.allCustomLogo.site_name;
      var pageTitle = this.title + " | " + baseName;
      document.title = pageTitle;
    }
  },
};
</script>

<style type="postcss" scoped>
</style>
