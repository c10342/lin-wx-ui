import { LinComponent } from "../common/component";
import { getAllRect, getRect } from "../common/utils";

interface TabsItem {
  disabled: boolean;
}

LinComponent({
  classes: [
    "wrapper-class",
    "scroll-class",
    "list-class",
    "line-class",
    "tab-item-class",
    "title-class",
    "content-class",
    "track-class"
  ],
  relation: {
    type: "descendant",
    name: "tab",
    linked(child) {
      child.index = this.children.length - 1;
      this.updateTabs();
    },
    unlinked() {
      this.children = (this.children || []).map((childData, index) => {
        childData.index = index;
        return childData;
      });
      this.updateTabs();
    }
  },
  props: {
    // 样式风格
    type: {
      type: String,
      value: "line",
      options: ["line", "card"]
    },
    // 标签主题色
    color: String,
    // 当前选中标签的标识符
    active: {
      type: [String, Number],
      value: 0,
      observer() {
        this.setCurrentIndex();
      }
    },
    // 动画时间，单位秒
    duration: Number,
    // 底部条宽度，默认单位 px
    lineWidth: {
      type: [String, Number]
    },
    // 底部条高度，默认单位 px
    lineHeight: {
      type: [String, Number]
    },
    // 是否开启切换标签内容时的转场动画
    animated: {
      type: Boolean,
      observer() {
        (this.children || []).forEach((child, index) => {
          child.updateRender(index === this.data.currentIndex, this);
        });
      }
    },
    // 是否展示外边框，仅在 `line` 风格下生效
    border: Boolean,
    // 是否省略过长的标题文字
    ellipsis: {
      type: Boolean,
      value: true
    },
    // 是否使用粘性定位布局
    sticky: Boolean,
    // 是否开启手势滑动切换
    swipeable: Boolean,
    // 是否开启标签页内容延迟渲染
    lazyRender: Boolean,
    // 粘性定位布局下与顶部的最小距离，单位 px
    offsetTop: Number,
    // 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动
    swipeThreshold: {
      type: Number,
      value: 5,
      observer(val) {
        this.setData({
          scrollable: this.children.length > val || !this.data.ellipsis
        });
      }
    },
    // 标题选中态颜色
    titleActiveColor: String,
    // 标题默认态颜色
    titleInactiveColor: String,
    // z-index 层级
    zIndex: Number
  },
  data: {
    // 存储子组件tab数据
    tabs: [] as TabsItem[],
    // 是否可以滚动
    scrollable: false,
    // 下划线位移距离
    lineOffsetLeft: 0,
    // 当前选中的tab索引
    currentIndex: -1,
    // scroll-view组件x轴滚动距离
    scrollLeft: 0,
    // 粘性布局容器
    container: null
  },
  methods: {
    emitChange(index) {
      if (index === this.data.currentIndex) {
        return;
      }
      this.triggerEvent("change", {
        // 组件唯一标识
        name: this.children[index].getComponentName()
      });
    },
    // 更新tabs数据
    updateTabs() {
      const { children = [], data } = this;
      this.setData({
        tabs: children.map((child) => child.data),
        scrollable: this.children.length > data.swipeThreshold || !data.ellipsis
      });
    },
    // 点击tab
    onTabClick(event) {
      // 找出点击的是第几个tab
      const { index } = event.currentTarget.dataset;
      const currentTab = this.data.tabs[index];
      if (currentTab.disabled) {
        if (index !== this.data.currentIndex) {
          // 发射禁用事件
          this.triggerEvent("disabled", {
            name: this.children[index].getComponentName()
          });
        }
        return;
      }
      // 点击事件
      this.triggerEvent("click", {
        name: this.children[index].getComponentName()
      });
      this.emitChange(index);
    },
    // 根据index索引设置下划线x轴位移距离
    setLineOffsetByIndex(index) {
      const { type } = this.data;
      if (index <= -1 || type !== "line") {
        return;
      }
      Promise.all([
        getAllRect(this, ".lin-tabs-item"),
        getRect(this, ".lin-tabs-line")
      ]).then(([rects = [], lineRect]) => {
        // x轴位移距离是前面每个tab的宽度之和
        let lineOffsetLeft = rects
          .slice(0, index)
          .reduce((prev, current) => prev + current.width, 0);
        // 下划线要居中
        lineOffsetLeft += (rects[index].width - lineRect.width) / 2;
        this.setData({
          lineOffsetLeft
        });
      });
    },
    // 将指定的tab滚动到视图区域
    scrollIntoView(index) {
      const { scrollable } = this.data;
      if (!scrollable) {
        return;
      }
      Promise.all([
        getAllRect(this, ".lin-tabs-item"),
        getRect(this, ".lin-tabs-list")
      ]).then(([itemRect, listRect]) => {
        const offsetLeft = itemRect
          .slice(0, index)
          .reduce((prev, current) => prev + current.width, 0);
        this.setData({
          // 滚动到中间的位置
          scrollLeft: offsetLeft - (listRect.width - itemRect[index].width) / 2
        });
      });
    },
    // 找出当前选中的tab的索引
    findCurrentIndex() {
      const { active } = this.data;
      const index = (this.children || []).findIndex(
        (child) => child.getComponentName() === active
      );
      return index;
    },
    // 设置索引
    setCurrentIndex() {
      const index = this.findCurrentIndex();
      if (index === this.data.currentIndex || index === -1) {
        return;
      }
      this.setData({
        currentIndex: index
      });
      // 设置下滑线位置
      this.setLineOffsetByIndex(index);
      // 将tab滚动到视图区域
      this.scrollIntoView(index);
      // 更新粘性布局容器
      this.updateContainer();
      // 更新子组件数据
      this.updateChildrenRender(index);
    },
    // 重置刷新所有数据
    resize() {
      const index = this.findCurrentIndex();
      if (index > -1) {
        this.setLineOffsetByIndex(index);
        this.scrollIntoView(index);
        this.updateContainer();
        this.updateChildrenRender(index);
      }
    },
    // 更新子组件数据
    updateChildrenRender(activeIndex) {
      (this.children || []).forEach((child, index) => {
        const active = index === activeIndex;
        // 点击的不是同一个tab才更新，或者说子组件还没初始化完成
        if (child.data.active !== active || !child.inited) {
          child.updateRender(active, this);
        }
      });
    },
    // 更新粘性布局容器
    updateContainer() {
      this.setData({
        container: () => this.createSelectorQuery().select(".lin-tabs")
      });
    },
    // 手指触摸事件开始
    onTouchStart(event) {
      const { swipeable } = this.data;
      if (!swipeable) {
        return;
      }
      // 重置终点位置和起始位置
      this.endX = 0;
      this.startX = 0;
      this.startX = event.touches[0].clientX;
    },
    // 手指触摸结束
    onTouchEnd() {
      const { swipeable } = this.data;
      if (!swipeable) {
        return;
      }
      // 计算差值
      const offsetX = this.startX - this.endX;
      let { currentIndex } = this.data;
      if (Math.abs(offsetX) > 50) {
        // 差值大于50才能滚动到下一个或者上一个
        if (offsetX < 0) {
          // 上一个，找到没有禁用的
          currentIndex = this.findNotDisabledTab(currentIndex - 1, "left");
        } else {
          // 下一个，找到没有禁用的
          currentIndex = this.findNotDisabledTab(currentIndex + 1, "right");
        }
        if (currentIndex > -1) {
          this.emitChange(currentIndex);
        }
      }
    },
    // 根据当前索引找出没有禁用的tab
    findNotDisabledTab(index, type) {
      const { tabs } = this.data;
      if (type === "left") {
        // 上一个
        while (index >= 0) {
          if (!tabs[index].disabled) {
            return index;
          }
          index--;
        }
      } else if (type === "right") {
        // 下一个
        while (index < tabs.length) {
          if (!tabs[index].disabled) {
            return index;
          }
          index++;
        }
      }
      return -1;
    },
    // 手指移动事件
    onTouchMove(event) {
      const { swipeable } = this.data;
      if (!swipeable) {
        return;
      }
      // 记录移动位置
      this.endX = event.touches[0].clientX;
    },
    // 获取内容容器宽度
    getTrackWidth() {
      return getRect(this, ".lin-tabs-track");
    }
  },
  beforeCreate() {
    this.startX = 0;
    this.endX = 0;
  },
  mounted() {
    this.setCurrentIndex(this.findCurrentIndex());
  }
});
