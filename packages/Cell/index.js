import LinkBehavior from '../behaviors/link';

Component({
  relations: {
    '../CellGroup/index': {
      type: 'ancestor'
    }
  },
  behaviors: [LinkBehavior],
  externalClasses: [
    'custom-class',
    'title-class',
    'value-class',
    'label-class',
    'header-class',
    'right-icon-class'
  ],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    // 左侧标题
    title: String,
    // 右侧内容
    value: String,
    // 标题下方的描述信息
    label: String,
    // 是否显示下边框
    border: {
      type: Boolean,
      value: true
    },
    // 单元格大小
    size: { type: String, options: ['large'] },
    // 左侧图标
    icon: String,
    // 是否展示右侧箭头
    isLink: Boolean,
    // 是否显示表单必填星号
    required: Boolean,
    // 箭头方向
    arrowDirection: {
      type: String,
      value: 'right',
      options: ['up', 'down', 'right', 'left']
    },
    // 点击后跳转的链接地址
    url: String,
    // 标题宽度
    titleWidth: {
      type: [String, Number]
    },
    // 根节点样式
    customStyle: String
  },
  data: {
    // 是否显示底边框
    borderBottom: true
  },
  methods: {
    // 点击单元格
    onClick (event) {
      this.triggerEvent('click', event);
      this.jumpLink();
    },
    // 有传入url就跳转页面
    jumpLink () {
      const { url } = this.properties;
      this.jump(url);
    },
    // 设置底边框
    setBorder (value) {
      this.setData({ borderBottom: value });
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
