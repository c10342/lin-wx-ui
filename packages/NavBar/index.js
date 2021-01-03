Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class', 'left-class', 'right-class', 'title-class'],
  properties: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    customStyle: String,
  },
  data: {},
  methods: {
    onLeftClick() {
      this.triggerEvent('click-left');
    },
    onRightClick() {
      this.triggerEvent('click-right');
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
