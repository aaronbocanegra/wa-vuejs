<template>
  <div class="widget tags-archive">
    <h1>
      <slot></slot>
    </h1>
    <div v-if="isTaxonomyLoaded" class="tags-archive__content">
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

      <ul class="w-full wa-vuejs-taxonomy__tags"
          v-bind:class="[ selectTagMode === 'cards' ? 'w-full' : '',
                          selectTagMode === 'icons' ? ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-3'] : '',
                          selectTagMode === 'cloud' ? ['flex', 'flex-rows', 'flex-wrap', 'min-h-64', 'relative'] : '']">
        <li v-for="(tag, index) in tags" :key="index" 
            v-bind:class="[ selectTagMode === 'cloud' ? ['relative', 'h-full', 'w-auto', 'px-3', 'min-h-10'] : '' ]"
            class="">
          <wa-link-prevue :url="tag.description" :index="index" :title="tag.name" :count="tag.count" :mode="selectTagMode"></wa-link-prevue>
        </li>
      </ul>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../../settings";
import Loader from "../partials/Loader.vue";
import WaLinkPrevue from '../WaLinkPrevue.vue';

export default {
   props: ['mode'],

  data() {
    return {
      tags: [],
      isTaxonomyLoaded: false,
      selectTagMode: this.mode,
    };
  },  // End data
 
  components: {
    WaLinkPrevue,
    Loader,
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
