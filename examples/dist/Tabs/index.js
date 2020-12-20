import { getAllRect, getRect } from "../common/utils.js";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../Tab/index": {
      type: "descendant",
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        child.index = this.children.length - 1;
        this.updateTabs();
      },
      unlinked(child) {
        this.children = (this.children || [])
          .filter((it) => it !== child)
          .map((child, index) => {
            child.index = index;
            return child;
          });
        this.updateTabs();
      },
    },
  },
  externalClasses: [
    "custom-class",
    "wrapper-class",
    "scroll-class",
    "list-class",
    "line-class",
    "tab-item-class",
    "title-class",
    "content-class",
    "track-class",
  ],
  properties: {
    type: {
      type: String,
      value: "line",
      options: ["line", "card"],
    },
    color: String,
    active: {
      type: [String, Number],
      value: 0,
      observer() {
        this.setCurrentIndex();
      },
    },
    duration: Number,
    lineWidth: {
      type: [String, Number],
    },
    lineHeight: {
      type: [String, Number],
    },
    animated: {
      type: Boolean,
      observer() {
        (this.children || []).forEach((child, index) => {
          child.updateRender(index === this.data.currentIndex, this);
        });
      },
    },
    border: Boolean,
    ellipsis: {
      type: Boolean,
      value: true,
    },
    sticky: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
    offsetTop: Number,
    swipeThreshold: {
      type: Number,
      value: 5,
      observer(val) {
        this.setData({
          scrollable: this.children.length > val || !this.properties.ellipsis,
        });
      },
    },
    titleActiveColor: String,
    titleInactiveColor: String,
    zIndex: Number,
  },
  data: {
    tabs: [],
    scrollable: false,
    lineOffsetLeft: 0,
    currentIndex: -1,
    scrollLeft: 0,
    container: null,
  },
  methods: {
    emitChange(index) {
      if (index === this.data.currentIndex) {
        return;
      }
      this.triggerEvent("change", {
        name: this.children[index].getComponentName(),
      });
    },
    updateTabs() {
      const { children = [], data } = this;
      this.setData({
        tabs: children.map((child) => child.data),
        scrollable:
          this.children.length > data.swipeThreshold || !data.ellipsis,
      });
    },
    onTabClick(event) {
      const { index } = event.currentTarget.dataset;
      const currentTab = this.data.tabs[index];
      if (currentTab.disabled) {
        if (index !== this.data.currentIndex) {
          this.triggerEvent("disabled", {
            name: this.children[index].getComponentName(),
          });
        }
        return;
      }
      this.triggerEvent("click", {
        name: this.children[index].getComponentName(),
      });
      this.emitChange(index);
    },
    setLineOffsetByIndex(index) {
      const { type } = this.properties;
      if (index <= -1 || type !== "line") {
        return;
      }
      Promise.all([
        getAllRect(this, ".lin-tabs-item"),
        getRect(this, ".lin-tabs-line"),
      ]).then(([rects = [], lineRect]) => {
        let lineOffsetLeft = rects
          .slice(0, index)
          .reduce((prev, current) => prev + current.width, 0);
        lineOffsetLeft += (rects[index].width - lineRect.width) / 2;
        this.setData({
          lineOffsetLeft,
        });
      });
    },
    scrollIntoView(index) {
      const { scrollable } = this.data;
      if (!scrollable) {
        return;
      }
      Promise.all([
        getAllRect(this, ".lin-tabs-item"),
        getRect(this, ".lin-tabs-list"),
      ]).then(([itemRect, listRect]) => {
        const offsetLeft = itemRect
          .slice(0, index)
          .reduce((prev, current) => prev + current.width, 0);
        this.setData({
          scrollLeft: offsetLeft - (listRect.width - itemRect[index].width) / 2,
        });
      });
    },
    findCurrentIndex() {
      const { active } = this.properties;
      const index = (this.children || []).findIndex(
        (child) => child.getComponentName() === active
      );
      return index;
    },
    setCurrentIndex() {
      const index = this.findCurrentIndex();
      if (index === this.data.currentIndex || index == -1) {
        return;
      }
      this.setData({
        currentIndex: index,
      });
      this.setLineOffsetByIndex(index);
      this.scrollIntoView(index);
      this.updateContainer();
      this.updateChildrenRender(index);
    },
    resize() {
      const index = this.findCurrentIndex();
      if (index > -1) {
        this.setLineOffsetByIndex(index);
        this.scrollIntoView(index);
        this.updateContainer();
        this.updateChildrenRender(index);
      }
    },
    updateChildrenRender(activeIndex) {
      (this.children || []).forEach((child, index) => {
        const active = index === activeIndex;
        if (child.data.active !== active || !child.inited) {
          child.updateRender(active, this);
        }
      });
    },
    updateContainer() {
      this.setData({
        container: () => this.createSelectorQuery().select(".lin-tabs"),
      });
    },
    onTouchStart(event) {
      const { swipeable } = this.properties;
      if (!swipeable) {
        return;
      }
      this.endX = 0;
      this.startX = 0;
      this.startX = event.touches[0].clientX;
    },
    onTouchEnd() {
      const { swipeable } = this.properties;
      if (!swipeable) {
        return;
      }
      const offsetX = this.startX - this.endX;
      let { currentIndex } = this.data;
      if (Math.abs(offsetX) > 50) {
        if (offsetX < 0) {
          currentIndex = this.findNotDisabledTab(currentIndex - 1, "left");
        } else {
          currentIndex = this.findNotDisabledTab(currentIndex + 1, "right");
        }
        if (currentIndex > -1) {
          this.emitChange(currentIndex);
        }
      }
    },
    findNotDisabledTab(index, type) {
      const { tabs } = this.data;
      if (type === "left") {
        while (index >= 0) {
          if (!tabs[index].disabled) {
            return index;
          }
          index--;
        }
      } else if (type === "right") {
        while (index < tabs.length) {
          if (!tabs[index].disabled) {
            return index;
          }
          index++;
        }
      }
      return -1;
    },
    onTouchMove(event) {
      const { swipeable } = this.properties;
      if (!swipeable) {
        return;
      }
      this.endX = event.touches[0].clientX;
    },
    getTrackWidth() {
      return getRect(this, ".lin-tabs-track");
    },
  },
  created: function() {
    this.startX = 0;
    this.endX = 0;
  },
  attached: function() {},
  ready: function() {
    this.setCurrentIndex(this.findCurrentIndex());
  },
  moved: function() {},
  detached: function() {},
});
