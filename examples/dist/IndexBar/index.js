import pageScrollBehavior from '../behaviors/page-scroll';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../IndexAnchor/index': {
      type: 'descendant',
      linked (child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateDataFromChildren();
      },
      unlinked (child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateDataFromChildren();
      }
    }
  },
  behaviors: [
    pageScrollBehavior(function (event) {
      this.onScroll(event);
    })
  ],
  externalClasses: ['custom-class', 'sidebar-class', 'sidebar-item-class'],
  properties: {
    zIndex: {
      type: Number,
      value: 1,
      observer: 'updateChildren'
    },
    sticky: {
      type: Boolean,
      value: true,
      observer: 'updateChildren'
    },
    stickyOffsetTop: {
      type: Number,
      value: 0,
      observer: 'updateChildren'
    },
    highlightColor: {
      type: String,
      observer: 'updateChildren'
    }
  },
  data: {
    barList: [],
    activeIndex: -1
  },
  methods: {
    updateDataFromChildren () {
      const barList = [];
      (this.children || []).forEach((child) => {
        barList.push(child.properties.index);
      });
      this.setData({
        barList
      });
    },
    updateChildren () {
      (this.children || []).forEach((child) => {
        child.updateDataFromParent();
      });
    },
    onScroll (event) {
      (this.children || []).forEach((child) => {
        child.onScroll(event);
      });
      const child = (this.children || []).find((scrollChild) => scrollChild.data.isActive);
      let activeIndex = -1;
      if (child) {
        activeIndex = child.properties.index;
      }
      if (activeIndex !== this.data.activeIndex) {
        this.setData({
          activeIndex
        });
      }
    },
    onSidebarClick (event) {
      const { index } = event.currentTarget.dataset;
      this.triggerEvent('select', index);
      const child = (this.children || []).find(
        (childData) => index === childData.properties.index
      );
      if (child) {
        Promise.all([this.getViewPort(), child.getContainerRect()]).then(
          (res) => {
            const data = res[0].scrollTop + res[1].top; // 顶部距离该id值得距离
            wx.pageScrollTo({
              scrollTop: data,
              duration: 300
            });
          }
        );
      }
    },
    getViewPort () {
      return new Promise((resolve) => {
        const query = wx.createSelectorQuery().in(this);
        query
          .selectViewport()
          .scrollOffset(resolve)
          .exec();
      });
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
