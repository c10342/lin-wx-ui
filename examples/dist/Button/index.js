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
if (canIUseFormFieldButton()) {
  behaviors.push('wx://form-field-button');
}

Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: [
    'custom-class',
    'loading-class',
    'icon-class',
    'hover-class'
  ],
  behaviors,
  /**
   * 组件的属性列表
   */
  properties: {
    formType: String,
    disabled: {
      type: Boolean,
      value: false
    },
    block: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'default',
      options: ['primary', 'success', 'info', 'warning', 'danger', 'default']
    },
    plain: {
      type: Boolean,
      value: false
    },
    round: {
      type: Boolean,
      value: false
    },
    circle: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String,
      value: ''
    },
    iconSize: {
      type: String
    },
    size: {
      type: String,
      value: 'default',
      options: ['default', 'medium', 'small']
    },
    loading: {
      type: Boolean,
      value: false
    },
    loadingColor: String,
    loadingSize: String,
    dataset: null,
    color: {
      type: String,
      value: '',
      observer (color) {
        let style = '';
        if (color) {
          style += `color: ${this.data.plain ? color : 'white'};`;
          if (!this.data.plain) {
            style += `background: ${color};`;
          }
          if (color.indexOf('gradient') !== -1) {
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
    baseStyle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick () {
      const { disabled, loading } = this.properties;
      if (!disabled && !loading) {
        this.triggerEvent('click');
      }
    }
  }
});
