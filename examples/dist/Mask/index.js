// Component Object
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    duration: {
      type: null,
      value: 200,
    },
    zIndex: {
      type: Number,
      value: 100,
    },
    customStyle: String,
    opacity: {
      type: Number,
      value: 0.5,
    },
  },
  data: {},
  methods: {
    onClick() {
      this.triggerEvent('click');
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
