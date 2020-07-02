<template>
  <div v-if="gallery.length > 0" id="gallery-wrap" class="relative">
    <!-- Thumbs -->
    <div id="thumbnails">
      <ul class="grid grid-cols-3 gap-2 mb-10">
        <li v-for="(item, index) in gallery" :key="item.id"
            @click="openLightbox(index)"
            class="flex m-0 hover:m-1 transition-all duration-300 relative cursor-pointer shadow-md-white hover:shadow-white">
          <img v-if="item.type === 'image'"
               :src="item.thumbnail"
               :alt="item.alt" 
               draggable="false"
               class="w-full object-cover" />
          <img v-if="item.type === 'oembed'"
               :src="item.thumbnail"
               :alt="item.title" 
               draggable="false"
               class="w-full object-cover" />
          <svg v-if="item.type === 'oembed'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              class="opacity-70 h-full w-full absolute  fill-current text-white hover:text-blue-600 flex items-center justify-center">
              <path d="M6.5 5.4v13.2l11-6.6z"></path>
            </svg>
          <div v-if="item.type === 'image'" 
               class="hidden sm:block title-overlay absolute p-2 w-full font-hairline text-sm md:text-lg lg:text-xl text-white bg-opacity-75 hover:bg-opacity-90 bg-black">
            {{ item.title }}
          </div>
          <div v-if="item.type === 'oembed'" 
               class="hidden sm:block title-overlay absolute p-2 w-full font-hairline text-sm md:text-lg lg:text-xl text-white bg-opacity-75 hover:bg-opacity-90 bg-black">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>

    <transition name="fade" mode="out-in">
      <!-- Overlay -->
      <div id="overlay"
           v-if="isLightbox"
           v-touch:swipe="swipeLightbox"
           v-bind:class="[isLightbox ? 'flex' : 'hidden']"
           class="fixed w-screen h-screen inset-0 bg-black bg-opacity-90 items-center justify-between z-max">
        
        <!-- Previous -->
        <div id="swipe-left" class="z-max">
          <button type="button" 
                  @click="loadPreviousItem();"
                  id="wa-lightbox-button--prev" 
                  v-bind:class="[toggleThumbnails ? 'hidden' : 'flex',
                                this.imgIndex > 0 ? 'opacity-100' : 'opacity-0']"
                  class="wa-lightbox-button"
                  title="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 viewBox="0 0 24 24" 
                 class="text-white hover:text-green-600 fill-current h-10">
              <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path>
            </svg>
          </button>
        </div>
        <!-- End Previous -->

        <!-- Thumbs -->
        <transition name="slide-bounce" mode="out-in">
          <div id="overlay-thumbnails"
               v-if="toggleThumbnails" 
               v-bind:class="[toggleThumbnails ? 'flex' : 'hidden']"
               class="w-full justify-center">
            <ul class="grid grid-col-auto-28 md:grid-col-auto-24 lg:grid-col-auto-36 gap-1 w-full h-full p-3 justify-center items-center ">
              <li v-for="(item, index) in gallery" :key="item.id"
                  @click="switchLightbox(index)"
                  class="relative cursor-pointer flex justify-center item-center hover:m-1" >
                <!-- Thumbnail -->
                <img v-if="item.type == 'image'"
                     :src="item.thumbnail"
                     draggable="false"
                     :alt="item.alt"/>
                <img v-if="item.type == 'oembed'"
                    :src="item.thumbnail"
                    draggable="false"
                    :alt="item.title"/>
              </li>
            </ul>
          </div>
        </transition>
        <!-- End Thumbs -->

        <!-- Lightbox Media Placeholder -->
        <transition name="slide-bounce" mode="out-in">
          <div id="media-content" 
               v-if="!toggleThumbnails"
               v-bind:class="[toggleThumbnails ? 'hidden' : 'flex']"
               class="w-full lg:h-full sm:h-90full cursor-pointer">

            <!-- Slide Effect -->
            <ul v-if="effect === 'slide'"
                id="media-content-ul"
                class="flex relative w-full h-full justify-center items-center">
              <!-- Define Overlay for Lightbox -->
              <li v-for="(item, index) in gallery" :key="item.id"
                  :id="'item-' + item.id"
                  v-bind:class="[ index === imgIndex     ? 'wa-lightbox__slide--current'  : '', 
                                  index === imgIndex - 1 ? 'slideLeft' : '',
                                  index === imgIndex + 1 ? 'slideRight' : '',
                                  index  >  imgIndex + 1 || index < imgIndex - 1 ? 'wa-lightbox__slide ' : '',
                                  item.type === 'oembed' && index === imgIndex ? 'vuejs-video' : '' ]"
                  class="flex absolute inset-0 min-w-full h-full justify-center items-center content-overlay transition-all ease-in duration-500">
                <picture v-if="item.type === 'image'">
                         <source v-if="item.md != undefined" media="(min-width:1280px)" :srcset="item.md">
                         <source v-if="item.lg != undefined" media="(min-width:1920px)" :srcset="item.lg">
                         <source v-if="item.xl != undefined" media="(min-width:3840px)" :srcset="item.xl">
                         <img :src="item.src" :alt="item.alt" draggable="false"
                              class="object-cover p-3 w-full h-auto sm:w-auto sm:h-90screen lg:h-screen">
                </picture>

                <div v-if="item.type === 'oembed'" 
                     v-html="item.iframe"
                     class="object-cover w-full h-16:9 sm:w-16:9 sm:h-screen sm:py-3 sm:px-3 sm:max-h-screen flex justify-center items-center"> 
                </div>

                <transition  v-if="item.type == 'image'" name="fade" mode="out-in">
                  <div :id="'overlay-details-' + index" 
                     v-if="toggleShowDesc"
                     class="overlay-details flex flex-row fixed bottom-0 left-0 px-3 py-2 w-screen text-white bg-opacity-75 bg-black z-50 transition-all ease-in duration-500">
                  <h5 class="m-0 mb-0 p-0 font-hairline">{{ item.title }}&nbsp;|&nbsp;</h5>
                  <div v-html="item.description" class="overlay-desc"></div>
                  </div>
                </transition>
              </li>
            </ul>

            <!-- Fade Effect -->
            <ul v-if="effect === 'fade'"
                class="flex relative w-full h-full justify-center items-center">
              <!-- Define Overlay for Lightbox -->
              <li v-for="(item, index) in gallery" :key="item.id"
                  :id="'item-' + item.id"
                   v-bind:class="[ index === imgIndex ? 'wa-lightbox-fade__slide--current'  : 'wa-lightbox-fade__slide',
                                  item.type === 'oembed' && index === imgIndex ? 'vuejs-video' : '' ]"
                  class="flex absolute inset-0 min-w-full h-full justify-center items-center content-overlay transition ease-in-out duration-300">

                <picture v-if="item.type === 'image'">
                         <source v-if="item.md != undefined" media="(min-width:1280px)" :srcset="item.md">
                         <source v-if="item.lg != undefined" media="(min-width:1920px)" :srcset="item.lg">
                         <source v-if="item.xl != undefined" media="(min-width:3840px)" :srcset="item.xl">
                         <img :src="item.src" :alt="item.alt" draggable="false"
                              class="object-cover p-3 w-full h-auto sm:w-auto sm:h-90screen lg:h-screen">
                </picture>

                <div v-if="item.type === 'oembed'"
                     v-html="item.iframe"
                     class="object-cover w-full h-16:9 sm:w-16:9 sm:h-screen sm:py-3 sm:px-3 sm:max-h-screen flex justify-center items-center">
                </div>

                <transition v-if="item.type === 'image'" name="fade" mode="out-in">
                  <div :id="'overlay-details-' + index" 
                     v-if="toggleShowDesc"
                     class="overlay-details flex flex-row fixed bottom-0 left-0 px-3 py-2 w-screen text-white bg-opacity-75 bg-black z-50">
                    <h5 class="m-0 mb-0 p-0 font-hairline">{{ item.title }}&nbsp;|&nbsp;</h5>
                    <div v-html="item.description" class="overlay-desc"></div>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </transition>
        <!-- End Lightbox Media Placeholder -->

        <!-- Next -->
        <div id="swipe-right" class="z-max">
          <button type="button" 
                  @click="loadNextItem();"
                  id="wa-lightbox-button--next"
                  v-bind:class="[toggleThumbnails ? 'hidden' : 'flex',
                                this.imgIndex != this.gallery.length -1 ? 'opacity-100' : 'opacity-0']"
                 class="wa-lightbox-button" 
                 title="Next">
             <svg xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  class="text-white fill-current hover:text-green-600 h-10">
               <path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path>
             </svg>
          </button>
        </div>
        <!-- End Next -->

        <!-- Toolbar -->
        <div class="wa-lightbox-toolbar fixed bg-black bg-opacity-50 top-0 right-0">
 
          <!-- Play Slideshow -->
          <button v-if="!toggleThumbnails" type="button" 
                  title="Play slideshow" 
                  @click="toggleSlideshow()"
                  class="wa-lightbox-toolbar__btn">
            <svg v-if="!this.isSlideshowPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              class="h-10 fill-current text-white hover:text-green-600">
              <path d="M6.5 5.4v13.2l11-6.6z"></path>
            </svg>
            <!-- Pause Slideshow -->
            <svg v-else xmlns="http://www.w3.org/2000/svg"
                 class="h-10 w-10 fill-current text-red-600 items-center">
              <g>
                <rect id="svg_4" height="26" width="26" x="7" y="7" rx="5" />
              </g>
            </svg>
          </button>

          <!-- Show Thumbnails -->
          <button type="button" v-if="thumbnails" @click="showThumbs();" title="Show thumbnails" class="wa-lightbox-toolbar__btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 class="h-10 fill-current text-white hover:text-green-600">
              <path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 
                    0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 
                    0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 
                    0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z">
              </path>
            </svg>
          </button>

          <!-- Info -->
          <button type="button" v-if="!isCurrentVideo && !toggleThumbnails"
                  @click="toggleDesc();" 
                  class="wa-lightbox-toolbar__btn" 
                  title="Info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"
                 class="h-10 border-0 fill-current text-white hover:text-green-600">
              <defs>
                <clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath>
                <clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath>
                <clipPath><path d="m22.2 686.12h1447.73v-667.19h-1447.73v667.19"/></clipPath>
                <clipPath><path d="m0 706.47h1490.93v-706.47h-1490.93v706.47"/></clipPath>
                <clipPath><path fill="#aade87" fill-opacity=".472" d="m-6 1028.36h32v32h-32z"/></clipPath>
                <clipPath><path fill="#00f" fill-opacity=".514" d="m-7 1024.36h34v34h-34z"/></clipPath>
                <clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath>
                <clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath>
                <clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath>
              </defs>
              <path d="M11 3A8 8 0 0 0 3 11 8 8 0 0 0 11 19 8 8 0 0 0 19 11 8 8 0 0 0 11 3M10.800781 6.5A1 1 0 0 1 11.800781 7.5 1 1 0 0 1 10.800781 8.5 1 1 0 0 1 9.800781 7.5 1 1 0 0 1 10.800781 6.5M10.693 9.5H10.906C11.262 9.5 11.551 9.786 11.551 10.143V14.857C11.551 15.214 11.262 15.5 10.906 15.5H10.693C10.337 15.5 10.05 15.214 10.05 14.857V10.143C10.05 9.786 10.337 9.5 10.693 9.5" 
                    transform="translate(0-.004)" 
                    fill-rule="evenodd"/>
            </svg>
          </button>

          <!-- Fullscreen -->
          <button type="button" v-if="fullScreen" 
                  @click="toggleFullScreenMode();" 
                  class="wa-lightbox-toolbar__btn" 
                  title="Fullscreen">
            <svg  viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" 
                 class="h-10 fill-current text-white hover:text-green-600">
              <path d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"></path>
            </svg>
          </button>

          <!-- Close -->
          <button type="button" 
                  title="Close" 
                  @click="closeLightbox()"
                  class="wa-lightbox-toolbar__btn"> 
            <slot name="close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                   class="h-10 fill-current text-white hover:text-green-600">
                <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
              </svg>
            </slot>
          </button>
        </div> 
        <!-- End Toolbar -->
      </div>
      <!-- End Overlay -->
    </transition>
  </div>
</template>

<script>
// refrences Vue-Cool-Lightbox
// https://github.com/lucaspulliese/vue-cool-lightbox
// https://vue-cool-lightbox.lucaspulliese.com/
export default {
  props: {
         gallery: {
           type: Array,
           default: () => []
         },
         effect: {
           type: String,
           default: ''
           },
         },

  data() {
    return {
      isLightbox        : false,
      thumbnails        : true,
      fullScreen        : true,
      slideshow         : null,
      isSlideshowPlaying: false,
      isFullScreenMode  : false,
      toggleThumbnails  : false,
      toggleShowDesc    : true,
      isCurrentVideo    : false,
      imgIndex          : 0,
    };
  },
 
  methods: {
    openLightbox: function(index){
      this.imgIndex = index;
      this.loadLightbox();
      this.isFullScreenMode = true;
      this.fullScreenMode();
      this.isLightbox = true; 
      document.body.style.overflow = 'hidden';
    },
 
    closeLightbox: function(){
      this.closeFullscreen();
      this.isLightbox = false;
      document.body.style.overflow = 'auto';
    },

    switchLightbox: function(id){
      this.toggleThumbnails = false;
      this.imgIndex = id;

      this.loadLightbox();
    },

    swipeLightbox: function(direction){
      switch(direction) {
        case 'top':
          this.showDesc();
          break;
        case 'right':
          this.loadPreviousItem();
          break;
        case 'bottom':
          this.hideDesc();
          break;
        case 'left':
          this.loadNextItem();
          break;
       }
    },

    loadPreviousItem: function(){
      if(this.imgIndex > 0){
        if(this.effect == 'fade'){
          setTimeout(() => {
            var fadeOut = document.getElementsByClassName('wa-lightbox-fade__slide--current');
            fadeOut[0].classList.add('opacity-0');
            setTimeout(() => {
              this.imgIndex--;
              setTimeout(() => {
                var fadeIn = document.getElementsByClassName('wa-lightbox-fade__slide--current');
                fadeIn[0].classList.remove('opacity-0');
                this.loadLightbox();
              }, 300);
            }, 300);
          },50);
        }else if(this.effect == 'slide'){
          setTimeout(() => {
            this.imgIndex--;
            this.loadLightbox();
          }, 50); 
        }
      }
    },

    loadNextItem: function(){
      if(this.imgIndex != this.gallery.length -1){
        if(this.effect == 'fade'){
          setTimeout(() => {
            var fadeOut = document.getElementsByClassName('wa-lightbox-fade__slide--current');
            fadeOut[0].classList.add('opacity-0');
            setTimeout(() => {
              this.imgIndex++;
              setTimeout(() => {
                var fadeIn = document.getElementsByClassName('wa-lightbox-fade__slide--current');
                fadeIn[0].classList.remove('opacity-0');
                this.loadLightbox();
              }, 300);
            }, 300);
          }, 50);
        }else if(this.effect == 'slide'){
          setTimeout(() => {
            this.imgIndex++;
            this.loadLightbox();
          }, 50); 
        }

      }
    },

    loadLightbox: function(){
      //Active Lightbox
      setTimeout(() => {
        var current = document.getElementsByClassName('vuejs-video');
        if( current.length ){
          this.isCurrentVideo = true;
        }else{
          this.isCurrentVideo = false;
        }
      },500);
      this.isLightbox = true;

      if(this.imgIndex === this.gallery.length - 1){
        this.isSlideshowPlaying = false;
        clearInterval(this.slideshow);
      }
    },
 
    toggleDesc: function(){
      this.toggleShowDesc = !this.toggleShowDesc;
    },

    showDesc: function(){
      this.toggleShowDesc = true;
    },

    hideDesc: function(){
      this.toggleShowDesc = false;
    },

    toggleFullScreenMode: function() {
      this.isFullScreenMode = !this.isFullScreenMode;
      if(!this.isFullScreenMode) {
        this.closeFullscreen()
      } else {
        this.fullScreenMode()
      }
    },

    closeFullscreen: function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      this.isFullScreenMode = false;
    },

    fullScreenMode: function() {
      /* Get the documentElement (<html>) to display the page in fullscreen */
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    
    showThumbs: function(){
      //Active Lightbox
      this.toggleThumbnails = !this.toggleThumbnails;

      if(!this.toggleThumbnails){
        this.loadLightbox();
      }
    },

    toggleSlideshow: function(){
      this.isSlideshowPlaying = !this.isSlideshowPlaying;
      if(this.isSlideshowPlaying){
        this.slideshow = setInterval(() => {
          this.loadNextItem();
        }, 4000);
      }else{
        clearInterval(this.slideshow);
      }
    },
  },
}
</script>

<style type="postcss" scoped>
  .wa-lightbox__slide{
    backface-visibility: hidden;
    z-index: 1;
    display: none;
    opacity: 0;
  }
	
  .wa-lightbox__slide .wa-lightbox__slide-oembed,
  .slideRight .wa-lightbox__slide-oembed,
  .slideLeft .wa-lightbox__slide-oembed{
    width: 0;
  }
  .wa-lightbox__slide--current{
    opacity:1;
  }

  .wa-lightbox-fade__slide{
    display: none;
    backface-visibility: hidden;
    z-index: 1;
  }

  .wa-lightbox-fade__slide--current{
    display: flex;
  }

.wa-lightbox__slide-oembed{
  width: 100%;
  height: 100%;
}
</style>
