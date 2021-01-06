Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../IndexBar/index': {
      type: 'ancestor',
      linked (parent) {
        this.parent = parent;
        this.updateDataFromParent();
      },
      unlinked () {
        this.parent = null;
      }
    }
  },
  externalClasses: ['custom-class', 'index-class'],
  properties: {
    index: {
      type: [String, Number]
    },
    useSlot: Boolean
  },
  data: {
    zIndex: 1,
    sticky: true,
    stickyOffsetTop: 0,
    highlightColor: '',
    fixed: false,
    transform: 0,
    indexwapperHeight: '',
    isActive: false
  },
  methods: {
    updateDataFromParent () {
      if (this.parent) {
        const {
          zIndex,
          sticky,
          stickyOffsetTop,
          highlightColor
        } = this.parent.properties;
        this.setData({
          zIndex,
          sticky,
          stickyOffsetTop,
          highlightColor
        });
      }
    },
    onScroll () {
      this.getRect().then((res) => {
        const { stickyOffsetTop, sticky } = this.data;
        const wrapper = res[0];
        const indexContainer = res[1];
        let obj = {};
        if (sticky) {
          if (wrapper.top > stickyOffsetTop) {
            obj = {
              fixed: false,
              transform: 0,
              indexwapperHeight: ''
            };
          } else if (
            wrapper.top <= stickyOffsetTop &&
            wrapper.height - stickyOffsetTop + wrapper.top >
              indexContainer.height
          ) {
            obj = {
              fixed: true,
              transform: 0,
              indexwapperHeight: indexContainer.height
            };
          } else {
            obj = {
              fixed: false,
              transform: wrapper.height - indexContainer.height,
              indexwapperHeight: indexContainer.height
            };
          }
        }
        const offsetTop = sticky ? stickyOffsetTop : 0;
        if (wrapper.top > offsetTop) {
          obj.isActive = false;
        } else if (
          wrapper.height - offsetTop + wrapper.top >
            indexContainer.height ||
          wrapper.height - offsetTop + wrapper.top > 0
        ) {
          obj.isActive = true;
        } else {
          obj.isActive = false;
        }
        this.setDiffData(obj);
      });
    },
    setDiffData (obj) {
      const data = Object.keys(obj).reduce((prev, key) => {
        if (obj[key] !== this.data[key]) {
          prev[key] = obj[key];
        }
        return prev;
      }, {});
      this.setData(data);
    },
    getRect () {
      return Promise.all([this.getContainerRect(), this.getIndexRect()]);
    },

    getIndexRect () {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery();
        query
          .select('.lin-index-anchor-index')
          .boundingClientRect(resolve)
          .exec();
      });
    },

    getContainerRect () {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery();
        query
          .select('.lin-index-anchor')
          .boundingClientRect(resolve)
          .exec();
      });
    }
  },
  created () {},
  attached () {},
  ready () {
    this.onScroll();
  },
  moved () {},
  detached () {}
});
