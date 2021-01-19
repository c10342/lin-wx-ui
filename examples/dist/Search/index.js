
import FormControls from '../behaviors/form-controls';
Component({
  behaviors: ['wx://form-field', FormControls],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'input-class',
    'field-class',
    'cancel-class'
  ],
  properties: {
    label: String,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      value: 'search'
    },
    rightIcon: String,
    focus: Boolean,
    value: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    maxlength: {
      type: Number,
      value: -1
    },
    inputAlign: {
      type: String,
      options: ['left', 'center', 'right']
    },
    placeholder: String,
    placeholderStyle: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    actionText: {
      type: String,
      value: '取消'
    },
    background: String,
    shape: {
      type: String,
      value: 'square',
      options: ['square', 'round']
    },
    name: String
  },
  data: {},
  methods: {
    emitChange (data) {
      this.triggerEvent('change', data);
    },
    onChange (event) {
      // this.triggerEvent('change', event.detail);
      this.emitChange(event.detail);
    },

    onCancel () {
      this.triggerEvent('cancel');
      // this.triggerEvent('change', '');
      this.emitChange('');
    },

    onSearch (event) {
      this.triggerEvent('search', event.detail);
    },

    onFocus (event) {
      this.triggerEvent('focus', event.detail);
    },

    onBlur (event) {
      this.triggerEvent('blur', event.detail);

      this.triggerParentBlur(event.detail);
    },

    onClear (event) {
      this.triggerEvent('clear', event.detail);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
