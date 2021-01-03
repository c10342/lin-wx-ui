Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: String,
      value: 'primary',
      options: ['primary', 'success', 'danger', 'warning', 'info'],
    },
    size: {
      type: String,
      options: ['large', 'medium'],
    },
    color: String,
    plain: Boolean,
    round: Boolean,
    mark: Boolean,
    textColor: String,
    closeable: Boolean,
  },
  data: {},
  methods: {
    onClick() {
      this.triggerEvent('close', false);
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
