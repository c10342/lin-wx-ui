Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  properties: {
    dashed: {
      type: Boolean,
      value: false
    },
    hairline: {
      type: Boolean,
      value: false
    },
    contentPosition: {
      type: String,
      options: ['left', 'center', 'right']
    },
    fontSize: {
      type: [String, Number]
    },
    borderColor: {
      type: String
    },
    textColor: {
      type: String
    },
    customStyle: {
      type: String
    }
  },
  data: {},
  methods: {},
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
