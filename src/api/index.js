import axios from 'axios';
import SETTINGS from '../settings';

export default {
  async getCategories(cb) {
    await axios
      .get(
        SETTINGS.API_BASE_PATH +
          'categories?sort=name&hide_empty=true'
      )
      .then(response => {
        cb(response.data.filter(c => c.name !== 'Uncategorized'));
      })
      .catch(e => {
        cb(e);
      });
  },

  async getTags(cb) {
    await axios
      .get(
        SETTINGS.API_BASE_PATH +
          'tags?sort=name&hide_empty=true'
      )
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  async getPages(cb) {
    await axios
      .get(SETTINGS.API_BASE_PATH + 'pages?_embed')
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  /*
  async getSomePages(limit = 5, pager = 1, cb) {
    await axios
      .get(
         SETTINGS.API_BASE_PATH + 'pages?_embed&per_page=' + limit + '&page=' + pager
       )
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },
  */

  async getPage(id, cb) {
    if(!Number.isInteger(id) || !id)
      return false;

    await axios
      .get(SETTINGS.API_BASE_PATH + 'pages/' + id + '?_embed')
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  async getPagesCount(cb) {
      await axios
        .get(
          SETTINGS.API_VENDOR_PATH + "page_count"
        )
        .then(response => {
          cb(response.data);
        })
        .catch(e => {
          cb(e);
        });
    },

  async getPostsCount(cb) {
      await axios
        .get(
          SETTINGS.API_VENDOR_PATH + "post_count"
        )
        .then(response => {
          cb(response.data);
        })
        .catch(e => {
          cb(e);
        });
    },

  async getPosts(limit = 5, page = 1, cb) {
    await axios
      .get(
         SETTINGS.API_BASE_PATH + 'posts?_embed&per_page=' + limit + '&page=' + page
       )
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  async getCategoryPosts(catid = 0, cb) {
    await axios
      .get(SETTINGS.API_BASE_PATH + 'posts?_embed&categories=' + catid)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  async getTagPosts(tagid = 0, cb) {
    await axios
      .get(SETTINGS.API_BASE_PATH + 'posts?_embed&tags=' + tagid)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  async getCustomLogo(cb) {
      await axios
        .get(
          SETTINGS.API_VENDOR_PATH + "settings/custom_logo"
        )
        .then(response => {
          cb(response.data);
        })
        .catch(e => {
          cb(e);
        });
   },

  //https://whatartist.com/wp-json/vuejs_wordpress/v2/menus
  async getMenus(cb) {
      await axios
        .get(
          SETTINGS.API_VENDOR_PATH + "menus"
        )
        .then(response => {
          cb(response.data);
        })
        .catch(e => {
          cb(e);
        });
    },
};
