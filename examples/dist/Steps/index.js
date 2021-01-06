Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'step-class',
    'message-text',
    'circle-class',
    'line-class'
  ],
  properties: {
    steps: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0
    },
    direction: {
      type: String,
      value: 'horizontal',
      options: ['horizontal', 'vertical']
    },
    activeColor: String,
    inactiveColor: String,
    activeIcon: {
      type: String,
      value: 'round-active'
    },
    inactiveIcon: String
  },
  data: {},
  methods: {},
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
