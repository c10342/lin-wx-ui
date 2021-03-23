import { canIUseFormFieldButton } from '../common/version';
import ButtonBehavior from '../behaviors/button';
import OpenTypeBehavior from '../behaviors/open-type';

const behaviors = [];
behaviors.push(ButtonBehavior);
behaviors.push(OpenTypeBehavior);
// 使用内置 behaviors
// 对于 form 组件，目前可以自动识别下列内置 behaviors:
// wx://form-field
// wx://form-field-group
// wx://form-field-button

// 判断能否使用表单行为
if (canIUseFormFieldButton()) {
  behaviors.push('wx://form-field-button');
}

Component({
  name:'Button',
  options: {
    addGlobalClass: true
  },
  behaviors,
  externalClasses: [
    'custom-class',
    'loading-class',
    'icon-class',
    'hover-class'
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    // 用于 form 组件，可选值为`submit` `reset`，点击分别会触发 form 组件的 submit/reset 事件
    formType: String,
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      value: false
    },
    // 是否为块级元素
    block: {
      type: Boolean,
      value: false
    },
    // 按钮类型
    type: {
      type: String,
      value: 'default',
      options: ['primary', 'success', 'info', 'warning', 'danger', 'default', 'success']
    },
    // 是否为朴素按钮
    plain: {
      type: Boolean,
      value: false
    },
    // 是否为圆角按钮
    round: {
      type: Boolean,
      value: false
    },
    // 是否为圆形按钮
    circle: {
      type: Boolean,
      value: false
    },
    // 左侧图标名
    icon: {
      type: String,
      value: ''
    },
    // 图标大小
    iconSize: {
      type: String
    },
    // 按钮尺寸
    size: {
      type: String,
      value: 'default',
      options: ['default', 'medium', 'small']
    },
    // 是否显示为加载状态
    loading: {
      type: Boolean,
      value: false
    },
    // 加载图标颜色
    loadingColor: String,
    // 加载图标大小
    loadingSize: String,
    // 按钮 dataset，open-type 为 `share` 时，可在 onShareAppMessage 事件的 `event.target.dataset.detail` 中看到传入的值
    dataset: null,
    // 按钮颜色，支持传入 linear-gradient 渐变色
    color: {
      type: String,
      value: '',
      observer (color) {
        let style = '';
        if (color) {
          // 朴素按钮字体颜色是当前传入的颜色，否则就是白色
          style += `color: ${this.data.plain ? color : 'white'};`;
          if (!this.data.plain) {
            // 非朴素按钮
            style += `background: ${color};`;
          }
          if (color.indexOf('gradient') !== -1) {
            // 渐变色
            // 边框置为none
            style += 'border: none;';
          } else {
            style += `border-color:${color};`;
          }
        }
        if (style !== this.data.baseStyle) {
          this.setData({ baseStyle: style });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 按钮样式
    baseStyle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击按钮
    onClick () {
      const { disabled, loading } = this.properties;
      if (!disabled && !loading) {
        // 没有被禁用并且不是在加载中
        this.triggerEvent('click');
      }
    }
  }
});
