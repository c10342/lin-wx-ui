<template>
  <div class="container">
    <sideNav class="nav"></sideNav>
    <router-view
      :class="['view', 'beautyScroll', componentClass]"
    ></router-view>
  </div>
</template>

<script>
import sideNav from '../components/side-nav.vue';
export default {
  components: {
    sideNav
  },
  computed: {
    componentClass() {
      return `component-${this.$route.path.split('/').pop()}`;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/styles/var.scss';

.container {
  position: relative;
  padding-left: $padding;
  background-color: #fff;

  .nav {
    float: left;
    width: $nav-width;
    height: calc(100vh - #{$header-height});
    padding: 32px 0;
    overflow-y: auto;
  }

  .view {
    box-sizing: border-box;
    float: left;
    width: calc(100% - #{$nav-width + 2px});
    height: calc(100vh - #{$header-height});
    padding: 32px ($demo-width + 20px) 48px 48px;
    overflow-y: auto;
  }

  .component-start,
  .component-giud,
  .component-install,
  .component-logs,
  .component-load,
  .component-request,
  .component-explain {
    padding-right: 48px;
  }
}

.container::after {
  display: block;
  clear: both;
  content: '';
}
</style>
