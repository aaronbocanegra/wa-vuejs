<!-- Reference: https://markus.oberlehner.net/blog/vue-router-page-transitions/ -->
<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter">
    <slot/>
  </transition>
</template>

<script>
const DEFAULT_TRANSITION = 'fade-route';
const DEFAULT_TRANSITION_MODE = 'out-in';

export default {
  name: 'TransitionPage',

  data() {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: '',
    };
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION;

      if (transitionName === 'slide-route') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-route-right' : 'slide-route-left';
      }

      this.transitionMode = DEFAULT_TRANSITION_MODE;
      this.transitionEnterActiveClass = '${transitionName}-enter-active';

      if (to.meta.transitionName === 'zoom-route') {
        this.transitionMode = 'in-out';
        this.transitionEnterActiveClass = 'zoom-route-enter-active';
        document.body.style.overflow = 'hidden';
      }

      if (from.meta.transitionName === 'zoom-route') {
        this.transitionMode = null;
        this.transitionEnterActiveClass = null;
        document.body.style.overflow = null;
      }

      this.transitionName = transitionName;

      next();
    });
  },

  methods: {
    beforeLeave(element) {
      setTimeout(() => {
        this.prevHeight = getComputedStyle(element).height;
        // console.log("this.prevHeight: " + this.prevHeight);
      },125);
    },

    enter(element) {
      setTimeout(() => {
        const { height } =  getComputedStyle(element);
        element.style.height = this.prevHeight;
        element.style.height = height;
        // console.log( "enter height: " + element.style.height );
      },500);
    },

    afterEnter(element) {
      setTimeout(() => {
        // console.log( "After: " + element.style.height);
        element.style.height = 'auto';
      },625);
    },
  },
};
</script>

<style type="postcss" scoped>
.fade-route-enter-active,
.fade-route-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity;
  transition-timing-function: ease;
/*  overflow: hidden; */
}

.fade-route-enter,
.fade-route-leave-active {
  opacity: 0;
  transition-delay: 0.125s;
}

.slide-route-left-enter-active,
.slide-route-left-leave-active,
.slide-route-right-enter-active,
.slide-route-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
/*  overflow: hidden; */
}

.slide-route-left-enter,
.slide-route-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
  transition-delay: 0.125s;
/*  overflow: hidden; */
}

.slide-route-left-leave-active,
.slide-route-right-enter {
  opacity: 0; 
  transform: translate(-2em, 0);
  transition-delay: 0.125s;
/*  overflow: hidden; */
}

.zoom-route-enter-active,
.zoom-route-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom-route;
}

.zoom-route-leave-active {
  transition-delay: 0.125s;
  animation-direction: reverse;
}

@keyframes zoom-route {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
