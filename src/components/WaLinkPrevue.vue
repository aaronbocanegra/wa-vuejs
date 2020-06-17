<!-- Reference: https://github.com/nivaldomartinez/link-prevue/blob/master/src/LinkPrevue.vue -->
<template>
  <div class="wa-link-prevue__main w-full flex flex-rows flex-wrap">
    <h4 class="pl-3 w-full">{{ title }}</h4>
    <div id="wa-link-prevue__loader" v-if="!response && validUrl" class="w-full">
      <slot name="loading">
        <div class="spinner"></div>
      </slot>
    </div>
    <a v-if="response" 
        class="wa-link-prevue_response w-full flex flex-cols cursor-pointer hover:text-black text-black"
	:href="url"
        target="_blank"  
        :title="'Go To: ' + title">
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
    cardWidth: {
      type: String,
      default: '400px'
    },
    apiUrl: {
      type: String,
      default: 'https://linkpreview-api.herokuapp.com/'
    }
  },

  watch: {
    url: function(value) {
      this.response = null
      this.getLink();
      // this.getLinkPreview()
    }
  },

  created() {
    // this.getLinkPreview();
    this.getLink();
  },

  data: function() {
    return {
      response: null,
      validUrl: false
    }
  },

  methods: {

    async getLink() {
      await axios
        .get(
          SETTINGS.API_VENDOR_PATH + 'wa-link-prevue?link=' + this.url
        )
        .then(response => {
	  this.response = response.data;
          console.log( this.response );
        })
        .catch(e => {
          console.log(e);
        });
    },

    isValidUrl: function(url) {
      const regex =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      //const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      this.validUrl = regex.test(url)
      return this.validUrl
    },

    getLinkPreview: function() {
      if (this.isValidUrl(this.url)) {
        this.httpRequest((res) => {
          this.response = JSON.parse(res)
          if( this.response.images.length > 0 ){
            const regex = /[*+?^${}()|[\]\/\\]/g;
            const regexBaseURL = /((http(s)?)(\:\/\/)?(\w+)?(\.)(\w+)(\.)?(\w+)?)/g;
            const baseURL = this.response.url.match( regexBaseURL );
            const image = this.response.images[0];
            const newregex = new RegExp( baseURL + '\/?' , 'g' );
            this.response.images[0] = image.replace( newregex, baseURL + '/' );
          }else{
            console.log( this.response );
          }
        }, () => {
          this.response = null
          this.validUrl = false
        })
      }
    }, // End getLinkPreview

    httpRequest: function(success, error) {
      const http = new XMLHttpRequest()
      const params = 'url=' + this.url
      http.open('POST', this.apiUrl, true)
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          success(http.responseText)
        }
        if (http.readyState === 4 && http.status === 500) {
          error()
        }
      }
      http.send(params)
    }, // End httpRequest

  }
}
</script>

<style scoped>
/* Loader */
.spinner {
  margin-top: 40%;
  margin-left: 45%;
  height: 28px;
  width: 28px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid #868686;
  border-right-color: transparent;
  border-radius: 50%;
}

@keyframes rotate {
  0%    { transform: rotate(0deg); }
  100%  { transform: rotate(360deg); }
}
</style>
