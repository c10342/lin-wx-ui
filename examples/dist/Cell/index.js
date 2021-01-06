import LinkBehavior from '../behaviors/link';

Component({
  relations: {
    '../CellGroup/index': {
      type: 'ancestor'
    }
  },
  behaviors: [LinkBehavior],
  externalClasses: [
    'custom-class',
    'title-class',
    'value-class',
    'label-class',
    'header-class',
    'right-icon-class'
  ],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    title: String,
    value: String,
    label: String,
    border: {
      type: Boolean,
      value: true
    },
    size: { type: String, options: ['large'] },
    icon: String,
    isLink: Boolean,
    required: Boolean,
    arrowDirection: {
      type: String,
      value: 'right'
    },
    url: String,
    titleWidth: {
      type: [String, Number]
    },
    customStyle: String
  },
  data: {
    borderBottom: true
  },
  methods: {
    onClick (event) {
      this.triggerEvent('click', event);
      this.jumpLink();
    },
    jumpLink () {
      const { url } = this.properties;
      this.jump(url);
    },
    setBorder (value) {
      this.setData({ borderBottom: value });
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
