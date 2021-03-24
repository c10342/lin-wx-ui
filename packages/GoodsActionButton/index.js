import LinkBehavior from '../behaviors/link';
import OpenTypeBehavior from '../behaviors/open-type';
import ButtonBehavior from '../behaviors/button';

Component({
  name: 'GoodsActionButton',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [LinkBehavior, OpenTypeBehavior, ButtonBehavior],
  externalClasses: ['custom-class'],
  relations: {
    '../GoodsAction/index': {
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
    // 按钮文字
    text: String,
    // 按钮颜色
    color: String,
    // 是否显示为加载状态
    loading: Boolean,
    // 是否禁用按钮
    disabled: Boolean,
    // 是否为朴素按钮
    plain: Boolean,
    // 按钮类型
    type: {
      type: String,
      value: 'danger',
      options: ['primary', 'success', 'info', 'warning', 'danger', 'default', 'success']
    },
    // 点击后跳转的链接地址
    url: String
  },
  data: {
    // 第几个按钮
    index: 0,
    // 总的按钮个数
    totalLen: -1
  },
  methods: {
    // 提供给父组件调用，更新该组件数据
    update (index, len) {
      this.setData({
        index,
        totalLen: len
      });
    },
    // 点击按钮
    onClick () {
      this.triggerEvent('click');
      // 跳转页面
      const { url } = this.properties;
      this.jump(url);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
