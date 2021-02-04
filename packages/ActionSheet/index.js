import OpenTypeBehavior from '../behaviors/open-type';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [OpenTypeBehavior],
  externalClasses: ['custom-class', 'title-class', 'description-class', 'actions-wrapper-class', 'button-class', 'cancelText-class'],
  properties: {
    show: Boolean,
    actions: {
      type: Array,
      value: []
    },
    round: {
      type: Boolean,
      value: true
    },
    closeOnClickAction: {
      type: Boolean,
      value: true
    },
    closeOnClickMask: {
      type: Boolean,
      value: true
    },
    cancelText: String,
    description: String,
    title: String,
    showCloseIcon: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 100
    },
    mask: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    onSelect (event) {
      const { actions, closeOnClickAction } = this.properties;
      const { index } = event.currentTarget.dataset;
      const item = actions[index];
      if (item && !item.disabled && !item.loading) {
        this.triggerEvent('select', item);
        if (closeOnClickAction) {
          this.onClose();
        }
      }
    },
    onCancel () {
      this.triggerEvent('cancel');
    },
    onClose () {
      this.triggerEvent('close');
    },
    onClickMask () {
      this.triggerEvent('mask-click');
      this.onClose();
    }
  },
  created () { },
  attached () { },
  ready () { },
  moved () { },
  detached () { }
});
