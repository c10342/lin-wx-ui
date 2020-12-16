import { pageScrollBehaviors } from "../behaviors/page-scroll";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../IndexAnchor/index": {
      type: "descendant",
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateDataFromChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateDataFromChildren();
      },
    },
  },
  behaviors: [
    pageScrollBehaviors(function(event) {
      // console.log(event);
      this.onScroll(event);
    }),
  ],
  externalClasses: ["custom-class"],
  properties: {
    indexList: {
      type: Array,
      value: null,
      observer(val) {
        if (Array.isArray(val)) {
          this.setData({
            barList: val,
          });
        }
      },
    },
    zIndex: {
      type: Number,
      value: 1,
      observer: "updateChildren",
    },
    sticky: {
      type: Boolean,
      value: true,
      observer: "updateChildren",
    },
    stickyOffsetTop: {
      type: Number,
      value: 0,
      observer: "updateChildren",
    },
    highlightColor: {
      type: String,
      observer: "updateChildren",
    },
  },
  data: {
    barList: [],
    activeIndex: -1,
  },
  methods: {
    updateDataFromChildren() {
      const barList = [];
      (this.children || []).forEach((child) => {
        barList.push(child.properties.index);
      });
      if (Array.isArray(this.data.barList)) {
        this.setData({
          barList,
        });
      }
    },
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateDataFromParent();
      });
    },
    onScroll(event) {
      (this.children || []).forEach((child) => {
        child.onScroll(event);
      });
      const child = (this.children || []).find((child) => child.data.fixed);
      let activeIndex = -1;
      if (child) {
        activeIndex = child.properties.index;
      }
      if (activeIndex !== this.data.activeIndex) {
        this.setData({
          activeIndex: activeIndex,
        });
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
