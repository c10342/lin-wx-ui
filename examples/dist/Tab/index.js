Component({
  name: 'Tab',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  relations: {
    '../Tabs/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
        this.updateWidth();
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  properties: {
    // 标签名称，作为匹配的标识符
    name: {
      type: [String, Number],
    },
    // 标题
    title: {
      type: String,
      observer: 'update',
    },
    // 是否禁用标签
    disabled: {
      type: Boolean,
      observer: 'update',
    },
    // 是否显示小红点
    dot: {
      type: Boolean,
      observer: 'update',
    },
    // 图标右上角提示信息
    info: {
      type: [String, Number],
      observer: 'update',
    },
    // 自定义标题样式
    titleStyle: {
      type: String,
      observer: 'update',
    },
  },
  data: {
    // 是否是选中状态
    active: false,
    // 是否需要渲染，wx:if
    shouldRender: false,
    // 是否显示出来，display
    shouldShow: false,
    // 容器宽度
    width: 0,
  },
  methods: {
    // 获取组件标识符，默认使用name，没有就使用index
    getComponentName() {
      const { name } = this.properties;
      if (name) {
        return name;
      }
      return this.index;
    },
    // 显示组件
    updateRender(active, parent) {
      const { data } = parent;
      // 是否完成初始化了（第一次）
      this.inited = this.inited || active;
      this.setData({
        active,
        // 完成初始化
        shouldRender: this.inited || !data.lazyRender,
        // 选中状态或者开启了转场动画，需要一直show
        shouldShow: active || data.animated,
      });
    },
    // 更新父组件Tabs数据
    update() {
      if (this.parent) {
        this.parent.updateTabs();
      }
    },
    // 从父组件那里获取数据更新容器宽度
    updateWidth() {
      if (this.parent) {
        this.parent.getTrackWidth().then((res) => {
          this.setData({
            width: res.width,
          });
        });
      }
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
