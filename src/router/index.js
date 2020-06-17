import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '../views/Home.vue';
import Post from '../views/Post.vue';
import Page from '../views/Page.vue';
import Category from '../views/Category.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { transitionName: 'slide' },
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: '/:year/:month/:day/:postSlug',
      name: 'Post',
      linkExactActiveClass: 'active',
      component: Post,
      meta: { transitionName: 'slide' },
    },
    {
      path: '/:pageSlug',
      name: 'Page',
      linkExactActiveClass: 'active',
      component: Page,
      meta: { transitionName: 'slide' },
    },
    {
      path: '/category/:categorySlug',
      name: 'Category',
      linkExactActiveClass: 'active',
      component: Category,
      meta: { transitionName: 'slide' },
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
  // Add a body class specific to the route we're viewing
  let body = document.querySelector('body');

  const slug = !(to.params.postSlug)
    ? to.params.pageSlug
    : to.params.postSlug;
  body.classList.add('vue--page--' + slug);
});

export default router;
