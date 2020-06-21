<template>
  <div class="page page--tag">
    <transition name="fade" mode="out-in">
      <tag-posts-widget  v-if="this.prevSlug == this.$route.params.tagSlug"
                              v-bind:tagid="this.tag.id"
                              v-bind:tag="this.tag"
                              class="mb-10">{{ this.tag.name }}
      </tag-posts-widget>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../settings";

import TagPostsWidget from '../components/widgets/TagPosts.vue';

export default {
  components: {
   TagPostsWidget,
  },

  data() {
    return {
      tag: [],
      prevSlug: false,
    };
  },
  // End data

  mounted() {
    this.getTag();
  },

  beforeUpdate() {
    this.getTag();
  }, 
 
  methods: {
    async getTag() {
      if( this.tag == undefined || this.$route.params.tagSlug != this.prevSlug ){
        await axios
          .get(
            SETTINGS.API_BASE_PATH + "tags?slug=" + this.$route.params.tagSlug
          )
          .then(response => {
            this.tag = response.data[0];
            console.log(this.tag);
            this.prevSlug = this.$route.params.tagSlug;
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
};
</script>

<style type="postcss" scoped>
</style>
