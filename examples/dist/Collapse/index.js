Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  relations: {
    '../CollapseItem/index': {
      type: 'descendant',
      linked (child) {
        this.children = this.children || [];
        this.children.push(child);
      },
      unlinked (child) {
        this.children = (this.children || []).filter((it) => it !== child);
      }
    }
  },
  properties: {
    // 当前展开面板的 name
    value: {
      type: null,
      observer: 'updateExpanded'
    },
    // 是否开启手风琴模式
    accordion: {
      type: Boolean,
      observer: 'updateExpanded'
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    // 更新CollapseItem组件
    updateExpanded () {
      (this.children || []).forEach((child) => {
        child.updateExpanded();
      });
    },
    // 切换展开状态
    switch (currentName, expanded) {
      const { accordion, value } = this.properties;
      // 保存切换的item的name值
      const changeItem = currentName;
      if (!accordion) {
        // 不是手风琴模式，就是可以同时打开多个，currentName是数组
        currentName = expanded
          ? (value || []).concat(currentName)
          : (value || []).filter((activeName) => activeName !== currentName);
      } else {
        // 手风琴模式
        currentName = expanded ? currentName : '';
      }
      if (expanded) {
        // 展开
        this.triggerEvent('open', changeItem);
      } else {
        // 关闭
        this.triggerEvent('close', changeItem);
      }
      this.triggerEvent('change', currentName);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
