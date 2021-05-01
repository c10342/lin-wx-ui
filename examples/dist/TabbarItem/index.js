Component({
  name: 'TabbarItem',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'content-class'],
  relations: {
    '../Tabbar/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
        this.updateFromParent();
      },
      unlinked() {
        this.parent = null;
      }
    }
  },
  properties: {
    // 标签名称，作为匹配的标识符
    name: {
      type: [String, Number]
    },
    // 图标名称
    icon: String,
    // 是否显示小红点
    dot: Boolean,
    // 图标右上角提示信息
    info: {
      type: [String, Number]
    }
  },
  data: {
    // 组件宽度
    width: 0,
    // 是否选中状态
    active: false,
    // 选中标签的颜色
    activeColor: '',
    // 未选中标签的颜色
    inactiveColor: ''
  },
  methods: {
    // 获取组件唯一标识
    getComponentName() {
      const { name } = this.properties;
      if (name != null) {
        return name;
      }
      return this.index;
    },
    // 从父组件中获取数据并更新
    updateFromParent() {
      if (this.parent) {
        const params = {};
        const { children, properties } = this.parent;
        const width = `${100 / children.length}%`;
        params.width = width;
        params.active = properties.active === this.getComponentName();
        params.activeColor = properties.activeColor;
        params.inactiveColor = properties.inactiveColor;
        this.setDiffData(params);
      }
    },
    // 找出不同的数据项，并更新
    setDiffData(data) {
      const obj = Object.keys(data).reduce((prev, current) => {
        if (this.data[current] !== data[current]) {
          prev[current] = data[current];
        }
        return prev;
      }, {});

      this.setData(obj);
    },
    // 设置状态（是否选中）
    setActive(active) {
      this.setData({ active });
    },
    // 点击组件
    onClick() {
      if (this.data.active || !this.parent) {
        return;
      }
      this.parent.emitChange(this.getComponentName());
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
