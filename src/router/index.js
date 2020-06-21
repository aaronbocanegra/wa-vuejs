import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '../views/Home.vue';
import Post from '../views/Post.vue';
import Page from '../views/Page.vue';
import Category from '../views/Category.vue';
import Archive from '../views/Archive.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { transitionName: 'slide-route' },
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: '/:year/:month/:day/:postSlug',
      name: 'Post',
      linkExactActiveClass: 'active',
      component: Post,
      meta: { transitionName: 'slide-route' },
    },
    {
      path: '/:pageSlug',
      name: 'Page',
      linkExactActiveClass: 'active',
      component: Page,
      meta: { transitionName: 'slide-route' },
    },
    {
      path: '/category/:categorySlug',
      name: 'Category',
      linkExactActiveClass: 'active',
      component: Category,
      meta: { transitionName: 'slide-route' },
    },
    {
      path: '/archive/:taxSlug',
      name: 'Archive',
      linkExactActiveClass: 'active',
      component: Archive,
      meta: { transitionName: 'slide-route' },
    },
  ],
  mode: 'history',
  base: '',

  // Prevents window from scrolling back to top
  // when navigating between components/views
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.afterEach((to) => { // (to, from)
  // Swaich the body id specific to the route we're viewing
  let bodyID = to.name;
  switch(bodyID) {
    case 'Home':
      break;
    case 'Post':
      bodyID = bodyID + '__' + to.params.postSlug;
      break;
    case 'Page':
      bodyID = bodyID + '__' + to.params.pageSlug;
      break;
    case 'Category':
      bodyID = bodyID + '__' + to.params.categorySlug;
      break;
    case 'Archive':
      bodyID = bodyID + '__' + to.params.taxSlug;
      break;
  }
  document.body.id = 'wa-vuejs--' + bodyID.toLowerCase();
});

export default router;
