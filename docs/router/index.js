import Vue from "vue";
import Router from "vue-router";

import IndexPage from "../pages/index.vue";
import ComponentPage from "../pages/components.vue";

Vue.use(Router);


const routes = [];

const comps = require.context("../markdown", true, /\.(md|vue)$/);

comps.keys().forEach(key => {
  const component = comps(key).default;
  const name = key.replace(/(.*\/)*([^.]+).*/gi, "$2");
  routes.push({
    component,
    name,
    path: `/${name}`
  });
});

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexPage,
    },
    {
      path: "/component",
      name: "component",
      component: ComponentPage,
      children: routes,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
