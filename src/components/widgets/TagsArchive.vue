<template>
  <div class="widget tags-archive">
    <h1>
      <slot></slot>
    </h1>
    <div v-if="allTagsLoaded" class="tags-archive__content">
      <nav class="wa-vuejs_taxonomy__nav flex flex-row justify-end border-b-2 mb-3 pr-3">
        <button type="button"
                @click="selectTagMode = 'cards'"
                v-bind:class="[ selectTagMode === 'cards' ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600']"
                class="h-10 px-5 font-bold rounded-t-lg hover:shadow-inner hover:bg-blue-600 hover:text-black text-white mr-1 tracking-wider"
                value="Cards">Cards</button>
        <button type="button"
                @click="selectTagMode = 'icons'"
                v-bind:class="[ selectTagMode === 'icons' ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600']"
                class="h-10 px-5 font-bold rounded-t-lg hover:shadow-inner hover:bg-blue-600 hover:text-black text-white mr-1 tracking-wider"
                value="icons">Icons</button>
        <button type="button"
                @click="selectTagMode = 'cloud'"
                v-bind:class="[ selectTagMode === 'cloud' ? ['bg-blue-600', 'shadow-inner'] : 'bg-green-600']"
                class="h-10 px-5 font-bold rounded-t-lg hover:shadow-inner hover:bg-blue-600 hover:text-black text-white tracking-wider"
                value="cloud">Cloud</button>
      </nav>

      <ul class="w-full wa-vuejs-taxonomy__tags"
          v-bind:class="[ selectTagMode === 'cards' ? ['wa-link-cards', 'w-full'] : '',
                          selectTagMode === 'icons' ? ['wa-link-icons', 'grid', 'grid-cols-1', 'relative', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-3'] : '',
                          selectTagMode === 'cloud' ? ['wa-link-cloud', 'flex', 'flex-row', 'flex-wrap', 'leading-tight'] : '']">
        <li v-for="tag in allTags" :key="selectTagMode + '-' + tag.id" 
            v-bind:class="[ selectTagMode === 'cards' ? 'wa-link-cards__list-item' : '',
                            selectTagMode === 'icons' ? 'wa-link-icons__list-item' : '',
                            selectTagMode === 'cloud' ? ['wa-link-cloud__list-item', 'leading-tight', 'whitespace-no-wrap', 'w-auto', 'px-3'] : '' ]">
          <wa-link-prevue :url="tag.description" 
                          :index="tag.id" 
                          :title="tag.name" 
                          :slug="tag.slug" 
                          :count="tag.count" 
                          :taxonomy="tag.taxonomy" 
                          :mode="selectTagMode"></wa-link-prevue>
        </li>
      </ul>
    </div>
    <Loader v-else/>
  </div>
</template>

<script>
import Loader from "../partials/Loader.vue";
import WaLinkPrevue from '../WaLinkPrevue.vue';
import { mapGetters } from 'vuex';

export default {
  props: ['mode'],

  computed: {
    ...mapGetters({
      allTags:       'allTags',
      allTagsLoaded: 'allTagsLoaded',
    }),
  },

  data() {
    return {
      selectTagMode: this.mode,
    };
  },  // End data
 
  components: {
    WaLinkPrevue,
    Loader,
  }, // End Components

};
</script>
