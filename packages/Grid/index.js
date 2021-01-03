Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../GridItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateChildren();
      },
    },
  },
  externalClasses: ['custom-class'],
  properties: {
    columnNum: {
      type: Number,
      value: 4,
      observer: 'updateChildren',
    },
    iconSize: {
      type: [String, Number],
      value: '56rpx',
      observer: 'updateChildren',
    },
    gutter: {
      type: [String, Number],
      value: 0,
      observer: 'updateChildren',
    },
    border: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    center: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    square: {
      type: Boolean,
      observer: 'updateChildren',
    },
    direction: {
      type: String,
      value: 'vertical',
      options: ['vertical', 'horizontal'],
      observer: 'updateChildren',
    },
  },
  data: {},
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateStyle();
      });
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
