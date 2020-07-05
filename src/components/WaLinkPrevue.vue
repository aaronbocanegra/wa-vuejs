<!-- Reference: https://github.com/nivaldomartinez/link-prevue/blob/master/src/LinkPrevue.vue -->
<template>
  <div :id="'wa-link-prevue-content-' + id" class='wa-link-prevue-content w-full'>

    <!-- Loader -->
    <div v-if="!response && validUrl" 
         class="wa-link-prevue__main flex flex-row flex-wrap items-center justify-center h-full"
         :id="'wa-link-prevue__loader-' + id">
      <slot name="loading">
        <div class="text-blue-800 w-full h-full flex justify-center items-center">
          <svg xmlns:svg="http://www.w3.org/2000/svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.0" viewBox="0 0 128 128"
              xml:space="preserve"
              class="fill-current flex h-10 w-10">
            <path d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z">
              <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform>
            </path>
          </svg>
        </div>
      </slot>
    </div>

    <!-- Filter Card -->
    <div v-else-if="mode === 'filter-card' && this.response" 
         :id="'wa-link-prevue__filter-card-' + id"
         class="wa-link-prevue__main flex flex-row flex-wrap items-center justify-center h-full">
      <transition name="fade" mode="out-in">
        <div v-if="urlExists" class="wa-link-prevue_response w-full flex flex-row flex-wrap text-black">
          <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
            <div :id="'wa-link-prevue__filter-card-wrapper-' + id" 
                 class="wa-link-prevue__filter-card-wrapper w-full flex flex-row px-4 w-full py-3 mb-6 bg-black bg-opacity-25 shadow-md-white relative" >
              
              <div v-if="count" 
                   class="wa-vuejs-taxonomy__card-count absolute z-0 bg-black bg-opacity-50 text-white px-2 line-height-3 text-xs py-1 right-0 mr-2 rounded-full">{{ count }}</div>	
              <div v-if="response.image != undefined" class="wa-link-prevue__filter-card-img flex w-1/4 justify-center items-center">
                <img :src="response.image" :alt="response.title" />
              </div>
              
              <div :id="'wa-link-prevue__filter-card-info-' + id" class="wa-link-prevue__filter-card-info text-white pr-5 flex w-3/4 justify-center items-center">
                <div class="wa-link-prevue__filter-card-text px-4 text-center">
                  <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
                  <p v-if="response.description.length" class="tracking-wide" v-html="response.description"></p>
                  <p v-if="urlExists">
                    <a :href="url" :title="'Visit: ' + title" target="_blank" 
                       class="wa-link-prevue_external-link rounded-full bg-blue-800 shadow-inner hover:bg-green-800 text-white hover:text-black px-4 py-1">Visit Site</a>
                  </p>
                </div>
              </div>
            </div>
          </slot>
        </div>
        <!-- Defunct -->
        <div v-else-if="!urlExists">
          <h4 class="pl-3 w-full">{{ title }}</h4>
        </div>
      </transition>
    </div>

    <!-- Cards -->
    <div v-else-if="mode === 'cards' && this.response" 
         :id="'wa-link-prevue__card-' + id"
         :class="[ (index >= 0 && index % 2 == 0) ? 'transform-translate-x-screen' : '',
                   (index >= 0 && index % 2 != 0) ? '-transform-translate-x-screen' : '']"
         class="wa-link-prevue__main transition-transform duration-300 opacity-0 flex flex-row flex-wrap items-center justify-center h-full">
      <transition name="fade" mode="out-in">
        <!-- post_tag -->
        <router-link v-if="taxonomy === 'post_tag' && urlExists" 
           class="wa-link-prevue_response w-full flex flex-row flex-wrap cursor-pointer"
           :to="{ name: 'Tag', params: { tagSlug: slug } }"
           :title="'Filter Posts by: ' + title">
          <h4 class="pl-3 w-full">{{ title }}</h4>
          <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
            <div :id="'wa-link-prevue__card-wrapper-' + id" 
                 class="wa-link-prevue__card-wrapper w-full flex flex-row px-4 w-full hover:text-white text-white 
                        py-3 mb-5 bg-black bg-opacity-25 mx-1 hover:mx-0 transition-all duration-300 shadow-lg-white hover:shadow-xl-white relative" >
              <div v-if="count" 
                   class="wa-link-prevue__card-count absolute z-00 bg-black bg-opacity-50 text-white px-2 line-height-3 text-xs py-1 right-0 mr-2 rounded-full">{{ count }}</div>	
              <div v-if="response.image != undefined" class="wa-link-prevue__card-img flex w-1/4 justify-center items-center">	
                <img :src="response.image" :alt="response.title" />
              </div>
                <div :id="'wa-link-prevue__card-info-' + id" class="wa-link-prevue__card-info flex w-3/4 justify-center items-center">
                <div class="wa-link-prevue__card-text px-4 text-center">
                  <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
                  <p v-if="response.description.length" v-html="response.description"></p>
                  <p>
                    <a :href="url" :title="'Visit: ' + title" target="_blank" 
                       class="wa-link-prevue_external-link rounded-full bg-blue-800 shadow-inner hover:bg-green-800 text-white hover:text-black px-4 py-1">Visit Site</a>
                  </p>
                </div>
              </div>
            </div>
          </slot>
        </router-link>
        <!-- custom -->
        <a v-else-if="taxonomy === 'custom' && urlExists" 
           class="wa-link-prevue_response w-full flex flex-row flex-wrap cursor-pointer hover:text-black text-black"
           :href="url"
           target="_blank"
           :title="title">
          <h4 class="pl-3 w-full text-green-600 hover:text-blue-600">{{ title }}</h4>
          <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
            <div class="wa-link-prevue__card-wrapper w-full flex flex-row p-3 mb-6 shadow-lg hover:shadow-2xl" >
              <div v-if="response.image != undefined"  class="wa-link-prevue__card-img flex w-1/4 justify-center items-center">	
                <img :src="response.image" :alt="response.title" />
              </div>
              <div class="wa-link-prevue__card-info flex w-3/4 justify-center items-center">
                <div class="wa-link-prevue__card-text px-4 text-center">
                  <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
                  <p v-if="response.description.length" v-html="response.description"></p>
                  <p>
                    <a :href="url" :title="'Visit: ' + title" target="_blank" 
                       class="wa-link-prevue_external-link rounded-full bg-blue-800 shadow-inner hover:bg-green-800 text-white hover:text-black px-4 py-1">Visit Site</a>
                  </p>
                </div>
              </div>
            </div>
          </slot>
        </a>
        <!-- Defunct -->
        <div v-else-if="!urlExists">
          <h4 class="pl-3 w-full">{{ title }}</h4>
        </div>
      </transition>
    </div>

    <!-- Icons -->
    <div v-else-if="mode === 'icons' && this.response" 
         :id="'icon-list-item-' + id"
         @mouseenter="showCardInfo()"
         @mouseleave="hideCardInfo()"
         v-touch:longtap="this.iconToggle" 
         class="wa-link-prevue__icon-main mx-1 hover:mx-0 transition-all duration-300 relative items-center justify-center h-full 
                bg-black bg-opacity-25 shadow-md-white hover:shadow-lg-white border-gray-200 p-2">
      <transition name="fade" mode="out-in">
        <router-link v-if="taxonomy === 'post_tag'"
           :to="{ name: 'Tag', params: { tagSlug: slug } }" 
           class="wa-link-prevue__icon-response cursor-pointer"
           :title="'Filter Posts by: ' + title">
          <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
            <div class="wa-link-prevue__icon-wrapper relative flex flex-col justify-center items-center">
              <div v-if="count" class="wa-link-prevue__icon-count absolute z-0 bg-black bg-opacity-50 text-white px-2 line-height-3 text-xs py-1 top-0 right-0 mr-2 rounded-full">{{ count }}</div>
              <div class="flex font-bold justify-center items-center h-full w-2/3">{{ title }}</div>
              <div v-if="response.image != undefined" class="wa-link-prevue__icon-img flex h-full w-1/3 min-h-20 object-contain justify-center items-center">	
                <img :src="this.response.image" :alt="response.title" class="w-full h-full object-contain"/>
              </div>
            </div>
            <div :id="'wa-link-prevue__icon-info-' + id"
                  class="wa-link-prevue__icon-card-text py-2 top-0 left-0 bg-white w-full z-40 shadow-black absolute shadow-xl px-4 text-center hidden
                         transition-all duration-500 min-h-full">
              <div class="wa-link-prevue__icon-card-text px-4 text-center text-black text-sm">
                <h3 v-if="response.title.length" class="font-hairline text-base" v-html="response.title"></h3>
                <p v-if="response.description.length" v-html="response.description"></p>
                <a v-if="urlExists" 
                   :href="url" 
                   :title="'Visit: ' + title" 
                   target="_blank"
                   class="wa-link-prevue_external-link rounded-full bg-blue-800 shadow-inner hover:bg-green-800 text-white hover:text-black px-4 py-1">Visit Site</a>
              </div>
            </div>
          </slot>
        </router-link>

        <a v-else-if="taxonomy === 'custom' && urlExists"
           :href="url" 
           class="wa-link-prevue__icon-response flex flex-col w-full flex-wrap cursor-pointer hover:text-black text-black"
           :title="title"
           target="_blank">
          <slot :img="response.image" :title="response.title" :description="response.description" 
                :url="url">
            <div class="wa-link-prevue__icon-wrapper flex flex-row w-full min-h-20">
              <div v-if="response.image != undefined" class="wa-link-prevue__icon-card-img flex h-full w-1/3 min-h-20 object-contain justify-center items-center">	
                <img :src="response.image" :alt="response.title" class="w-full h-full object-contain"/>
              </div>
              <div class="flex font-bold justify-center items-center h-full w-2/3">{{ title }}</div>
            </div>
            <div :id="'wa-link-prevue__icon-info-' + id"
                  v-bind:class="[]"
                  class="wa-link-prevue__icon-card-text pt-2 top-0 bg-white w-full z-40 shadow-black absolute shadow-xl px-4 text-center hidden
                         transition-all duration-500">
              <div class="wa-link-prevue__icon-card-text px-4 text-center text-black">
                <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
                <p v-if="response.description.length" v-html="response.description"></p>
                <p v-if="urlExists">
                  <a :href="url" :title="'Visit: ' + title" target="_blank"
                     class="wa-link-prevue_external-link rounded-full bg-blue-800 shadow-inner hover:bg-green-800 text-white hover:text-black px-4 py-1">Visit Site</a>
                </p>
              </div>
            </div>
          </slot>
        </a>

        <!-- Defunct -->
        <div v-else-if="!urlExists">
          <div class="wa-link-prevue__icon-wrapper flex flex-row w-full min-h-20">
            <div class="flex font-bold justify-center items-center h-full w-full">{{ title }}</div>
          </div>
        </div>

      </transition>
    </div>

    <!-- Cloud -->
    <div v-else-if="mode === 'cloud' && this.response"
         @mouseenter="cloudEnter" 
         @mouseleave="cloudLeave"
         v-touch:longtap="this.cloudToggle" 
         :id="'cloud-list-item-' + id"
         class="wa-link-prevue__cloud-main flex h-full items-center justify-center">

      <transition name="fade" mode="out-in">
        <router-link v-if="taxonomy === 'post_tag' && response && urlExists" 
                     class="wa-link-prevue__cloud-response cursor-pointer"
                     :to="{ name: 'Tag', params: { tagSlug: slug } }"
                     :title="'Filter Posts by: ' + title">
          <slot :img="response.image" :title="response.title" :description="response.description" 
                :url="url">
            <div class="wa-link-prevue__cloud-wrapper">
              <div 
                   v-bind:class="[ testCount == 1  ? ['text-xs'  , 'rotate-deg-0']  : '',
                                   testCount == 2  ? ['text-s'   , 'rotate-deg-0']  : '',
                                   testCount == 3  ? ['text-base', 'rotate-deg-0']  : '',
                                   testCount == 4  ? ['text-lg'  , 'rotate-deg-0']  : '',
                                   testCount == 5  ? ['text-xl'  , 'rotate-deg-0']  : '',
                                   testCount == 6  ? ['text-2xl' , 'rotate-deg-0']  : '',
                                   testCount == 7  ? ['text-3xl' , 'rotate-deg-0']  : '',
                                   testCount == 8  ? ['text-4xl' , 'rotate-deg-0']  : '',
                                   testCount == 9  ? ['text-5xl' , 'rotate-deg-0']  : '',
                                   testCount >= 10 ? ['text-6xl' , 'rotate-deg-0']  : '']"
                   class="font-bold whitespace-normal">
                {{ title }}
              </div>
            </div>
            <div :id="'wa-link-prevue__cloud-info-' + id"
                  v-bind:class="[]"
                  class="wa-link-prevue__cloud-text flex flex-col pt-2 bottom-0 w-64 max-h-72 left-0 bg-white text-black z-40 shadow-black fixed shadow-xl px-4 text-center hidden
                         transition-all opacity-95 duration-500 shadow-xl-white">
              <div v-if="count" 
                   class="wa-link-prevue__cloud-count absolute z-0 bg-black bg-opacity-50 text-white px-2 line-height-3 text-xs py-1 top-0 right-0 mr-2 mt-2 rounded-full">{{ count }}</div>	
              <div v-if="response.image != undefined" class="wa-link-prevue__cloud-img flex h-full w-full min-h-20 object-contain justify-center items-center">	
                <img :src="response.image" :alt="response.title" class="w-full h-full object-contain"/>
              </div>
              <div class="wa-link-prevue__cloud-text px-4 text-center w-full">
                <p v-if="urlExists" class="pt-3">
                  <a :href="url" :title="'Visit: ' + title" target="_blank"
                     class="wa-link-prevue_external-cloud-link rounded-full bg-blue-800 hover:bg-green-800 text-white hover:text-black shadow-inner px-4 py-1">Visit Site</a>
                </p>
              </div>
            </div>
          </slot>
        </router-link>
        <a v-else-if="taxonomy === 'custom' && response && urlExists" 
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
            <div :id="'wa-link-prevue__cloud-info-' + id"
                  v-bind:class="[]"
                  class="wa-link-prevue__cloud-text pt-2 top-0 bg-white w-full z-40 shadow-black absolute shadow-xl px-4 text-center hidden
                         transition-all duration-500">
              <div v-if="response.image != undefined" class="wa-link-prevue__cloud-img flex h-full w-1/3 min-h-20 object-contain justify-center items-center">	
                <img :src="response.image" :alt="response.title" class="w-full h-full object-contain"/>
              </div>
              <div class="wa-link-prevue__cloud-text px-4 text-center">
                <h3 v-if="response.title.length" class="font-hairline" v-html="response.title"></h3>
                <p v-if="response.description.length" v-html="response.description"></p>
              </div>
            </div>
          </slot>
        </a>
        <!-- Defunct -->
        <div v-else-if="!urlExists">
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
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SETTINGS from "../settings";

export default {
  name: 'wa-link-prevue',
  props: {
    index: {
      type: Number,
      default: -1
    },
    id: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    taxonomy: {
      type: String,
      default: 'custom'
    },
    mode: {
      type: String,
      default: 'cards'
    },
  },

  data: function() {
    return {
      response: null,
      validUrl: false,
      urlExists: false,
      testCount: Math.floor(Math.random() * 10) + 1,
      isIconHover: false,
      isCloudHover: false,
    }
  },

  mounted() {
    this.isValidUrl(this.url);
    this.getLink();
  },

  methods: {
    async getLink() {
      if(this.validUrl){
        this.urlExists = false;
        await axios
          .get(
            SETTINGS.API_VENDOR_PATH + 'wa-link-prevue?link=' + this.url
          )
          .then(response => {
            this.urlExists = true;
            this.response = response.data;
            /* Slide In Posts */
            if( this.mode === 'cards'){
              setTimeout(() => {
                var item = document.getElementById('wa-link-prevue__card-' + this.id);
                item.classList.remove("opacity-0");
                setTimeout(() => {
                  var item = document.getElementById('wa-link-prevue__card-' + this.id);
                  item.classList.remove("transform-translate-x-screen");
                  item.classList.remove("-transform-translate-x-screen");
                });
              },125);
            }
          })
          .catch(e => {
            this.response = null;
            this.validUrl = false;
            this.urlExists = false;
            console.log(e);
          });
      }
    },

    isValidUrl: function(url) {
      const regex =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      this.validUrl = regex.test(url);
      return this.validUrl;
    },
    
    showCardInfo: function(){
      var el = document.getElementById('wa-link-prevue__icon-info-' + this.id);
      if(el != undefined){
        el.classList.remove('hidden');
        setTimeout(() => {
          el.classList.remove('opacity-0');
          el.classList.add('opacity-98');
        },50);
      }
    },

    hideCardInfo: function(){
      var el = document.getElementById('wa-link-prevue__icon-info-' + this.id);
      if(el != undefined){
        setTimeout(() => {
          el.classList.remove('opacity-98');
          el.classList.add('opacity-0');
          setTimeout(() => {
            el.classList.add('hidden');
          },500);
        },25);
      } 
    },

    iconToggle: function() {
      this.isIconHover = !this.isIconHover;
      var el = document.getElementById('wa-link-prevue__icon-info-' + this.id);
      if( this.isIconHover){
        el.classList.remove('hidden');
        setTimeout(() => {
          el.classList.remove('opacity-0');
          el.classList.add('opacity-98');
        },50);
      }else{
        setTimeout(() => {
          el.classList.remove('opacity-98');
          el.classList.add('opacity-0');
          setTimeout(() => {
            el.classList.add('hidden');
          },500);
        },25);
      }
    },

    cloudEnter: function(event){
      var el = document.getElementById( 'wa-link-prevue__cloud-info-' + this.id);
      el.classList.remove('hidden');
      var pos = [];
      pos.x = event.layerX;
      pos.y = event.layerY
      if( (pos.x - (el.clientWidth/2)) < 0){
        el.style.left = (el.clientWidth/4)+ "px";
      }else if( pos.x + (el.clientWidth/2) > window.innerWidth ){
        el.style.left = (window.innerWidth - (el.clientWidth/2)) + "px";
      }else{
        el.style.left = pos.x + "px"
      }
      if( pos.y - (el.clientHeight/2) < 0 ){
        el.style.top = (el.clientHeight/4) + "px";
      }else if( pos.y + (el.clientHeight/2) > window.innerHeight ){
        el.style.top = (window.innerHeight - ( el.clientHeight/2) ) + 'px';
      }else{
        el.style.top = pos.y + "px";
      }
    },

    cloudLeave: function(){
      var el = document.getElementById( 'wa-link-prevue__cloud-info-' + this.id );
      el.classList.add('hidden');
    },

    cloudToggle: function(event){
      this.isCloudHover = !this.isCloudHover;
      var el = document.getElementById( 'wa-link-prevue__cloud-info-' + this.id);
      if(this.isCloudHover){
        el.classList.remove('hidden');
        var pos = [];
        pos.x = event.changedTouches[0].clientX - (el.clientWidth/2);
        pos.y = event.changedTouches[0].clientY - (el.clientHeight/2);
        if( pos.x < 0 ){
          el.style.left = (el.clientWidth/4) + "px";
        }else if( pos.x + el.clientWidth > window.innerWidth){
          el.style.left = (window.innerWidth - el.clientWidth) + 'px';
        }else{
          el.style.left = pos.x + "px";
        }

        if( pos.y < 0 ){
          el.style.top = (el.clientHeight/4) + "px";
        }else if( pos.y + el.clientHeight > window.innerHeight ){
          el.style.top = (window.innerHeight - el.clientHeight) + 'px';
        }else{
          el.style.top  = pos.y + "px";
        }
      }else{
        el.classList.add('hidden');
      }
    },

  }, // End Methods
}
</script>
