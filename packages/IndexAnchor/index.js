import { getRect } from '../common/utils';

Component({
  name: 'IndexAnchor',
  externalClasses: ['custom-class', 'index-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../IndexBar/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
        this.updateDataFromParent();
      },
      unlinked() {
        this.parent = null;
      }
    }
  },
  properties: {
    // 索引字符
    index: {
      type: [String, Number]
    },
    // 是否使用自定义内容的插槽
    useSlot: Boolean
  },
  data: {
    // 层级
    zIndex: 1,
    // 是否为粘性布局
    sticky: true,
    // 粘性布局时距离顶部的距离
    stickyOffsetTop: 0,
    // 高亮颜色
    highlightColor: '',
    // 是否固定定位
    fixed: false,
    // y轴上位移的距离
    transform: 0,
    // 标题容器高度
    indexwapperHeight: '',
    // 是否为选中状态
    isActive: false
  },
  methods: {
    // 从父组件IndexBar中获取数据更新
    updateDataFromParent() {
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
    // 滚动事件，提供给父组件调用
    onScroll() {
      this.getRect().then((res) => {
        const { stickyOffsetTop, sticky } = this.data;
        // 整个容器
        const wrapper = res[0];
        // 标题容器
        const indexContainer = res[1];
        let obj = {};
        if (sticky) {
          // 粘性布局
          if (wrapper.top > stickyOffsetTop) {
            // 这个容器距离顶部距离比粘性布局时距离顶部的距离大，说明还没到达临界点
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
            // wrapper.top <= stickyOffsetTop  说明了到达临界点
            // wrapper.height - stickyOffsetTop + wrapper.top 计算出整个容器底部距离stickyOffsetTop的距离，称为可视区域高度吧
            // wrapper.height - stickyOffsetTop + wrapper.top > indexContainer.height，可视区域高度比标题容器大，说明整个容器还没有完全消失在可视区域
            obj = {
              fixed: true,
              transform: 0,
              indexwapperHeight: indexContainer.height
            };
          } else {
            // 消失在可视区域
            obj = {
              fixed: false,
              transform: wrapper.height - indexContainer.height,
              indexwapperHeight: indexContainer.height
            };
          }
        }
        // 距离顶部距离，也就是临界点
        const offsetTop = sticky ? stickyOffsetTop : 0;
        if (wrapper.top > offsetTop) {
          // 还没到临界值
          obj.isActive = false;
        } else if (
          wrapper.height - offsetTop + wrapper.top > indexContainer.height ||
          wrapper.height - offsetTop + wrapper.top > 0
        ) {
          // 到达了临界值
          // wrapper.height - offsetTop + wrapper.top > 0 说明还没离开临界点
          obj.isActive = true;
        } else {
          // 其他的情况
          obj.isActive = false;
        }
        // 设置改变了的数据
        this.setDiffData(obj);
      });
    },
    // 对比找出改变了的数据
    setDiffData(obj) {
      const data = Object.keys(obj).reduce((prev, key) => {
        if (obj[key] !== this.data[key]) {
          prev[key] = obj[key];
        }
        return prev;
      }, {});
      this.setData(data);
    },
    // 获取标题容器和整个容器信息
    getRect() {
      // 获取整个容器的信息
      const getContainerRect = getRect(this, '.lin-index-anchor');
      // 获取标题容器信息
      const getIndexRect = getRect(this, '.lin-index-anchor-index');
      return Promise.all([getContainerRect, getIndexRect]);
    }
  },
  created() {},
  attached() {},
  ready() {
    this.onScroll();
  },
  moved() {},
  detached() {}
});
