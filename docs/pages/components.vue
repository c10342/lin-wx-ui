<template>
  <div class="container">
    <sideNav class="nav"></sideNav>
    <router-view :class="['view', 'beautyScroll', componentClass]"></router-view>
  </div>
</template>

<script>
import mainHeader from "../components/header.vue";
import sideNav from "../components/side-nav.vue";
export default {
  components: {
    mainHeader,
    sideNav,
  },
  computed: {
    componentClass() {
      return `component-${this.$route.path.split("/").pop()}`;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/var.scss";
.container {
  padding-left: $padding;
  background-color: #fff;
  position: relative;
  .nav {
    float: left;
    width: $nav-width;
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
    padding: 32px 0;
  }
  .view {
    float: left;
    width: calc(100% - #{$nav-width + 2px});
    padding: 32px ($demo-width + 20px) 48px 48px;
    box-sizing: border-box;
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
  }
  .component-start,.component-giud,.component-install,.component-logs,.component-explain{
padding-right: 48px;
  }
}

.container:after {
  content: "";
  clear: both;
  display: block;
}
</style>
