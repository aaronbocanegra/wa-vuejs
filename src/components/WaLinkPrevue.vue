<!-- Reference: https://github.com/nivaldomartinez/link-prevue/blob/master/src/LinkPrevue.vue -->
<template>

    <div :id="'wa-link-prevue__loader' + index" v-if="!response && validUrl" class="wa-link-prevue__main flex flex-rows flex-wrap items-center justify-center h-full">
      <slot name="loading">
        <div class="text-black w-full flex justify-center items-center">
          <svg xmlns:svg="http://www.w3.org/2000/svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.0" viewBox="0 0 128 128"
              xml:space="preserve"
              class="text-black fill-current flex h-10 w-10">
		  <path d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z">
                  <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform>
                </path>
            </svg>
        </div>
      </slot>
    </div>

    <div v-else-if="mode === 'cards'" 
         :id="'card' + index"
         class="wa-link-prevue__main flex flex-rows flex-wrap items-center justify-center h-full">
      <transition name="fade" mode="out-in">
        <a v-if="response && urlExists" 
          class="wa-link-prevue_response w-full flex flex-rows flex-wrap cursor-pointer hover:text-black text-black"
          :href="url"
          target="_blank"  
          :title="'Go To: ' + title">
            <h4 class="pl-3 w-full">{{ title }}</h4>
          <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
            <div class="wa-link-prevue__wrapper w-full flex flex-rows p-3 mb-6 shadow-lg hover:shadow-2xl" >
              <div class="wa-link-prevue__card-img flex w-1/4 justify-center items-center">	
	        <img v-if="response.image.length" :src="response.image" :alt="response.title" />
              </div>
	      <div class="wa-link-prevue__card-info flex w-3/4 justify-center items-center">
	        <div class="wa-link-prevue__card-text px-4 text-center">
	          <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
	          <p v-if="response.description.length" v-html="response.description"></p>
	        </div>
             </div>
            </div>
          </slot>
        </a>
      </transition>
    </div>

    <div v-else-if="mode === 'icons'" 
         :id="'list-item' + index"
         @mouseenter="showCardInfo(index)"
         @mouseleave="hideCardInfo(index)"
         class="wa-link-prevue__icon-main relative flex flex-rows flex-wrap items-center justify-center h-full">
      <transition name="fade" mode="out-in">
        <a v-if="response && urlExists" 
           class="wa-link-prevue__icon-response flex flex-cols w-full flex-wrap cursor-pointer hover:text-black text-black"
           :href="url"
           target="_blank"
           :title="'Go To: ' + title">
          <slot :img="response.image" :title="response.title" :description="response.description" 
                :url="url">
            <div class="wa-link-prevue__icon-wrapper flex flex-rows w-full min-h-20">
              <div class="wa-link-prevue__icon-card-img flex h-full w-1/3 min-h-20 object-contain justify-center items-center">	
	        <img v-if="response.image.length" :src="response.image" :alt="response.title" class="w-full h-full object-contain"/>
              </div>
              <div class="flex font-bold justify-center items-center h-full w-2/3">{{ title }}</div>
            </div>
	    <div :id="'wa-link-prevue__icon-card-info-' + index"
                  v-bind:class="[]"
                  class="wa-link-prevue__icon-card-text pt-2 top-0 bg-white w-full z-50 shadow-black absolute shadow-xl px-4 text-center hidden
                         transition-all duration-500">
	      <div class="wa-link-prevue__icon-card-text px-4 text-center">
	         <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
	         <p v-if="response.description.length" v-html="response.description"></p>
	      </div>
            </div>
          </slot>
        </a>
      </transition>
    </div>

    <div v-else="mode === 'cloud'" 
         :id="'list-item' + index"
         class="wa-link-prevue__cloud-main relative flex h-full items-center justify-center">

      <transition name="fade" mode="out-in">
        <a v-if="response && urlExists" 
           class="wa-link-prevue__cloud-response cursor-pointer"
           :href="url"
           target="_blank"
           :title="'Go To: ' + title">

          <slot :img="response.image" :title="response.title" :description="response.description" 
                :url="url">

            <div class="wa-link-prevue__cloud-wrapper relative">
              <div 
                   v-bind:class="[ testCount == 1  ? ['text-xs'  , 'rotate-deg-0']  : '',
                                   testCount == 2  ? ['text-s'   , 'rotate-deg-0']  : '',
                                   testCount == 3  ? ['text-base',  'rotate-deg-0']  : '',
                                   testCount == 4  ? ['text-lg'  ,  'rotate-deg-0']  : '',
                                   testCount == 5  ? ['text-xl'  , 'rotate-deg-0']  : '',
                                   testCount == 6  ? ['text-2xl' , 'rotate-deg-0']  : '',
                                   testCount == 7  ? ['text-3xl' ,  'rotate-deg-0']  : '',
                                   testCount == 8  ? ['text-4xl' ,  'rotate-deg-0']  : '',
                                   testCount == 9  ? ['text-5xl' , 'rotate-deg-0']  : '',
                                   testCount >= 10 ? ['text-6xl' ,   'rotate-deg-0']  : '']"
                   class="font-bold whitespace-no-wrap">
                {{ title }}
              </div>
            </div>

	    <div :id="'wa-link-prevue__cloud-card-info-' + index"
                  v-bind:class="[]"
                  class="wa-link-prevue__cloud-card-text pt-2 top-0 bg-white w-full z-50 shadow-black absolute shadow-xl px-4 text-center hidden
                         transition-all duration-500">
            
              <div class="wa-link-prevue__cloud-card-img flex h-full w-1/3 min-h-20 object-contain justify-center items-center">	
	        <img v-if="response.image.length" :src="response.image" :alt="response.title" class="w-full h-full object-contain"/>
              </div>

	      <div class="wa-link-prevue__cloud-card-text px-4 text-center">
	         <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
	         <p v-if="response.description.length" v-html="response.description"></p>
	      </div>
            </div>

          </slot>
        </a>
      </transition>
    </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../settings";
import Loader from "../components/partials/Loader.vue";

export default {
  name: 'wa-link-prevue',
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'cards'
    },
    index: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
  },

  data: function() {
    return {
      response: null,
      validUrl: false,
      urlExists: false,
      hover: false,
      testCount: Math.floor(Math.random() * 10) + 1,
    }
  },

  watch: {
    url: function(value) {
      this.response = null
      this.getLink();
    }
  },

  created() {
    this.getLink();
    console.log(this.testCount);
  },

  methods: {

    async getLink() {
      if( this.isValidUrl( this.url ) ){
        await axios
          .get(
            SETTINGS.API_VENDOR_PATH + 'wa-link-prevue?link=' + this.url
          )
          .then(response => {
             if(response.data != false && response.data != undefined){
	      this.urlExists = true;
	      this.response = response.data;
	    }else{
	      this.urlExists = false;
	    }
          })
          .catch(e => {
            this.response = null
            this.validUrl = false
            console.log(e);
          });
       }
    },

    isValidUrl: function(url) {
      const regex =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      //const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      this.validUrl = regex.test(url);
      return this.validUrl;
    },
    
    showCardInfo: function(i){
       var el = document.getElementById('wa-link-prevue__icon-card-info-' + i);
       el.classList.remove('hidden');
       setTimeout(() => {
         el.classList.remove('opacity-0');
         el.classList.add('opacity-98');
       },50);
    },

    hideCardInfo: function(i){
       var el = document.getElementById('wa-link-prevue__icon-card-info-' + i);
       setTimeout(() => {
         el.classList.remove('opacity-98');
         el.classList.add('opacity-0');
         setTimeout(() => {
           el.classList.add('hidden');
         },500);
       },25);
    },

  }, // End Methods
}
</script>

<style type="postcss" scoped>

</style>
