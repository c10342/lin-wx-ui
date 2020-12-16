Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../IndexBar/index": {
      type: "ancestor",
      linked(parent) {
        this.parent = parent;
        this.updateDataFromParent();
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  externalClasses: ["custom-class"],
  properties: {
    index: {
      type: [String, Number],
    },
    useSlot: Boolean,
  },
  data: {
    zIndex: 1,
    sticky: true,
    stickyOffsetTop: 0,
    highlightColor: "",
    fixed: false,
    transform: 0,
    indexwapperHeight: "",
    // 是否离开了容器粘性的位置
    leaveClient: false,
  },
  methods: {
    updateDataFromParent() {
      if (this.parent) {
        const {
          zIndex,
          sticky,
          stickyOffsetTop,
          highlightColor,
        } = this.parent.properties;
        this.setData({
          zIndex,
          sticky,
          stickyOffsetTop,
          highlightColor,
        });
      }
    },
    onScroll(event) {
      this.getRect().then((res) => {
        const { stickyOffsetTop } = this.data;
        const wrapper = res[0];
        const indexContainer = res[1];
        let obj = {};
        if (wrapper.top > stickyOffsetTop) {
          obj = {
            fixed: false,
            transform: 0,
            indexwapperHeight: "",
            leaveClient: false,
          };
        } else if (
          wrapper.top <= stickyOffsetTop &&
          wrapper.height - stickyOffsetTop + wrapper.top > indexContainer.height
        ) {
          obj = {
            fixed: true,
            transform: 0,
            indexwapperHeight: indexContainer.height,
            leaveClient: true,
          };
        } else {
          obj = {
            fixed: false,
            transform: wrapper.height - indexContainer.height,
            indexwapperHeight: indexContainer.height,
            leaveClient: true,
          };
        }
        this.setDiffData(obj);
      });
    },
    setDiffData(obj) {
      const data = Object.keys(obj).reduce((prev, key) => {
        if (obj[key] !== this.data[key]) {
          prev[key] = obj[key];
        }
        return prev;
      }, {});
      this.setData(data);
    },
    getRect() {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery();
        query.select(".lin-index-anchor").boundingClientRect();
        query.select(".lin-index-anchor-index").boundingClientRect();
        query.exec((rect) => {
          resolve(rect);
        });
      });
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.onScroll();
  },
  moved: function() {},
  detached: function() {},
});
