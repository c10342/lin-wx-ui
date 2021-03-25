import { getRect } from '../common/utils';

Component({
  name: 'CollapseItem',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'content-class'],
  relations: {
    '../Collapse/index': {
      type: 'ancestor',
      linked (parent) {
        this.parent = parent;
      },
      unlinked () {
        this.parent = null;
      }
    }
  },
  properties: {
    // 唯一标识符，默认为索引值
    name: null,
    // 标题栏左侧内容
    title: null,
    // 标题栏右侧内容
    value: null,
    // 标题栏左侧图标名称
    icon: String,
    // 标题栏描述信息
    label: String,
    // 是否禁用面板
    disabled: Boolean,
    // 是否显示内边框
    border: {
      type: Boolean,
      value: true
    },
    // 是否展示标题栏右侧箭头并开启点击反馈
    isLink: {
      type: Boolean,
      value: true
    }
  },
  data: {
    // 是否展开
    expanded: false,
    // 索引值，就是是第几个CollapseItem孩子
    index: -1,
    // 动画
    animation: null
  },
  methods: {
    // 从父亲（Collapse）组件哪里更新数据
    updateExpanded () {
      if (!this.parent) {
        return Promise.resolve();
      }
      const { value, accordion } = this.parent.properties;
      const { children = [] } = this.parent;
      const { name } = this.properties;
      // 找出是第几个孩子，确定索引号
      const index = children.indexOf(this);
      const currentName = name == null ? index : name;
      // 默认不展开
      let expanded = false;
      if (accordion) {
        // 手风琴模式
        expanded = value === currentName;
      } else {
        // 非手风琴模式
        expanded = (value || []).some((expandedName) => expandedName === currentName);
      }
      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }
      this.setData({ index, expanded });
    },
    // 更新样式
    updateStyle (expanded) {
      const { inited } = this;
      getRect(this, '.lin-collapse-item-content')
        .then(rect => {
        // 获取元素高度
          const { height } = rect;
          // 动画实例
          const { myAnimation } = this;
          if (expanded) {
          // 展开状态(关闭->展开)
            if (height === 0) {
            // 高度为0的情况，就让高度为auto吧
              myAnimation.height('auto').step();
            } else {
            // inited==fasle是说明初始化的时候就需要展开，这个时候需要立刻展开，不需要动画
              myAnimation.height(height).step({
                duration: inited ? 300 : 1
              });
            }
            // 导出动画
            this.setData({ animation: myAnimation.export() });
            return;
          }
          // 关闭状态(展开->关闭)
          myAnimation.height(0).step({ duration: 300 });
          this.setData({ animation: myAnimation.export() });
        });
    },
    // 点击标题栏
    onClick () {
      const { expanded } = this.data;
      const { name, disabled } = this.properties;
      if (disabled) {
        return;
      }
      const index = this.parent.children.indexOf(this);
      // 没有传入name则默认使用索引作为唯一标识
      const currentName = name == null ? index : name;
      // 切换展开/关闭状态
      this.parent.switch(currentName, !expanded);
    }
  },
  created () {},
  attached () {
    // 创建一个动画实例
    this.myAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease-in-out'
    });
  },
  ready () {
    // 更新面板
    this.updateExpanded();
    // 标志位，初始化完成
    this.inited = true;
  },
  moved () {},
  detached () {}
});
