Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    row: {
      type: String,
      value: 0,
      observer(newVal) {
        this.setData({
          rowArray: Array.from({ length: newVal }),
        });
      },
    },
    rowWidth: {
      type: [String, Array],
      observer(newVal) {
        this.setData({
          isArray: newVal instanceof Array,
        });
      },
    },
    title: {
      type: Boolean,
      value: false,
    },
    titleWidth: {
      type: [String, Number],
    },
    avatar: {
      type: Boolean,
      value: false,
    },
    avatarSize: {
      type: [String, Number],
    },
    avatarShape: {
      type: String,
      value: "round",
      options: ["round", "square"],
    },
    loading: {
      type: Boolean,
      value: true,
    },
    animate: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    rowArray: [],
    isArray: false,
  },
  methods: {},
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
