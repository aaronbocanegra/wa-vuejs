<template>
  <div class="page--tags-archive w-full">
    <ul v-if="isTaxonomyLoaded" class="w-full wa-vuejs-taxonomy__tags"
        v-bind:class="[ mode === 'cards' ? 'w-full' : '',
                        mode === 'icons' ? ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-3'] : '',
                        mode === 'cloud' ? ['flex', 'flex-rows', 'flex-wrap', 'min-h-64', 'relative'] : '']">
      <li v-for="(tag, index) in tags" :key="index" 
          v-bind:class="[ mode === 'cloud' ? ['relative', 'h-full', 'w-auto', 'px-3', 'min-h-10'] : '' ]"
          class="">
        <wa-link-prevue :url="tag.description" :index="index" :title="tag.name" :count="tag.count" :mode="mode"></wa-link-prevue>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../../settings";
import WaLinkPrevue from '../WaLinkPrevue.vue';
import { mapGetters } from 'vuex';

export default {
   props: ['mode'],

   computed: {
    ...mapGetters({
      allCustomLogo:       'allCustomLogo',
    }),
  },

  data() {
    return {
      tags: [],
      isTaxonomyLoaded: false,
    };
  },  // End data
 
  components: {
    WaLinkPrevue,
  }, // End Components

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
        })
        .catch(e => {
          this.isTaxonomyLoaded = false;
          console.log(e);
        });
    },
  },
};
</script>

<style type="postcss" scoped>
</style>
