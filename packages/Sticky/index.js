import pageScrollBehavior from '../behaviors/page-scroll';

const ROOT_ELEMENT = '.lin-sticky';
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  behaviors: [
    pageScrollBehavior(function (event) {
      if (this.properties.scrollTop != null) {
        return;
      }
      this.onScroll(event);
    }),
  ],
  externalClasses: ['custom-class', 'wrapper-class'],
  properties: {
    offsetTop: {
      type: Number,
      value: 0,
      observer: 'onScroll',
    },
    zIndex: {
      type: Number,
      value: 99,
    },
    disabled: {
      type: Boolean,
      observer: 'onScroll',
    },
    container: {
      type: null,
      observer: 'onScroll',
    },
    scrollTop: {
      type: null,
      observer(val) {
        this.onScroll({ scrollTop: val });
      },
    },
  },
  data: {
    fixed: false,
    transform: 0,
    height: 0,
  },
  methods: {
    onScroll({ scrollTop } = {}) {
      const { container, offsetTop, disabled } = this.properties;
      if (disabled) {
        this.setDataAfterDiff({
          fixed: false,
          transform: 0,
        });
        return;
      }

      this.scrollTop = scrollTop || this.scrollTop;

      if (typeof container === 'function') {
        Promise.all([this.getRect(ROOT_ELEMENT), this.getContainerRect()])
          .then(([root, wrapperContainer]) => {
            if (offsetTop + root.height > wrapperContainer.height + wrapperContainer.top) {
            // 容器离开视区
              this.setDataAfterDiff({
                fixed: false,
                transform: wrapperContainer.height - root.height,
              });
            } else if (offsetTop >= root.top) {
            // 容器粘性的位置
              this.setDataAfterDiff({
                fixed: true,
                height: root.height,
                transform: 0,
              });
            } else {
              this.setDataAfterDiff({
                fixed: false,
                transform: 0,
              });
            }
          });
        return;
      }

      this.getRect(ROOT_ELEMENT).then((root) => {
        if (offsetTop > root.top) {
          this.setDataAfterDiff({
            fixed: true,
            height: root.height,
          });
        } else {
          this.setDataAfterDiff({ fixed: false });
        }
      });
    },
    setDataAfterDiff(data) {
      wx.nextTick(() => {
        const diff = Object.keys(data).reduce((prev, key) => {
          if (data[key] !== this.properties[key]) {
            prev[key] = data[key];
          }
          return prev;
        }, {});

        this.setData(diff);

        this.triggerEvent('scroll', {
          scrollTop: this.scrollTop,
          isFixed: data.fixed || this.data.fixed,
        });
      });
    },
    getRect(element) {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery();
        query.select(element).boundingClientRect();
        query.exec((rect) => {
          resolve(rect[0]);
        });
      });
    },
    getContainerRect() {
      const nodeRef = this.properties.container();
      return new Promise((resolve) => {
        nodeRef.boundingClientRect(resolve).exec();
      });
    },
  },
  created() { },
  attached() { },
  ready() { },
  moved() { },
  detached() { },
});
