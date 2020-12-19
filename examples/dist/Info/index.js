Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    dot: Boolean,
    info: {
      type: [String, Number],
    },
    customStyle: String,
  },
  data: {},
  methods: {},
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
