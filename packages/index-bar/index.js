import pageScrollBehavior from '../behaviors/page-scroll';
import { getViewPort } from '../common/utils';

Component({
  name: 'IndexBar',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [
    pageScrollBehavior(function (event) {
      this.onScroll(event);
    })
  ],
  relations: {
    '../index-anchor/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateDataFromChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateDataFromChildren();
      }
    }
  },
  externalClasses: ['custom-class', 'sidebar-class', 'sidebar-item-class'],
  properties: {
    // z-index 层级
    zIndex: {
      type: Number,
      value: 1,
      observer: 'updateChildren'
    },
    // 是否开启锚点自动吸顶
    sticky: {
      type: Boolean,
      value: true,
      observer: 'updateChildren'
    },
    // 锚点自动吸顶时与顶部的距离
    stickyOffsetTop: {
      type: Number,
      value: 0,
      observer: 'updateChildren'
    },
    // 索引字符高亮颜色
    highlightColor: {
      type: String,
      observer: 'updateChildren'
    }
  },
  data: {
    // 右侧索引列表
    barList: [],
    // 当前索引字符
    activeIndex: -1
  },
  methods: {
    // 从子组件IndexAnchor获取数据更新
    updateDataFromChildren() {
      const barList = [];
      (this.children || []).forEach((child) => {
        barList.push(child.properties.index);
      });
      this.setData({
        barList
      });
    },
    // 更新子组件IndexAnchor的数据
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateDataFromParent();
      });
    },
    // 滚动事件
    onScroll(event) {
      // 触发子组件的事件
      (this.children || []).forEach((child) => {
        child.onScroll(event);
      });
      // 找出当前高亮的锚点
      const child = (this.children || []).find(
        (scrollChild) => scrollChild.data.isActive
      );
      let activeIndex = -1;
      if (child) {
        // 存在就说明有选中的锚点
        activeIndex = child.properties.index;
      }
      // 设置索引字符
      if (activeIndex !== this.data.activeIndex) {
        this.setData({
          activeIndex
        });
      }
    },
    // 点击右侧索引
    onSidebarClick(event) {
      // 找出点击的是第几个
      const { index } = event.currentTarget.dataset;
      this.triggerEvent('select', index);
      // 找出对应的子组件
      const child = (this.children || []).find(
        (childData) => index === childData.properties.index
      );
      if (child) {
        Promise.all([getViewPort(this), child.getContainerRect()]).then(
          (res) => {
            // 计算子组件需要向上滚动多少距离才能到达顶部
            const data = res[0].scrollTop + res[1].top;
            wx.pageScrollTo({
              scrollTop: data,
              duration: 300
            });
          }
        );
      }
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
