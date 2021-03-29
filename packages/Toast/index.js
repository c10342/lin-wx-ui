Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    'custom-class',
    'icon-class',
    'loading-class',
    'message-class',
    'text-class',
  ],
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    zIndex: {
      type: Number,
      value: 100,
    },
    position: {
      type: String,
      value: 'middle',
      options: ['top', 'bottom', 'middle'],
    },
    type: {
      type: String,
      value: 'text',
      options: ['text', 'loading', 'success', 'fail'],
    },
  },
  data: {},
  methods: {},
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
