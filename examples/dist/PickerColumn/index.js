Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    optionsList: {
      type: Array,
      value: [],
    },
  },
  data: {
    translateY: 88,
  },
  methods: {
    onTouchMove(event) {
      const { translateY } = this.data;
      const endY = event.touches[0].clientY;
      const offsetY = this.startY - endY;
      // const tranY = translateY - offsetY;
      console.log(event);
      // let y =
      this.setData({
        translateY: translateY - offsetY,
      });
      this.startY = endY;
    },
    onTouchStart(event) {
      // console.log();
      this.startY = event.touches[0].clientY;
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.startY = 0;
  },
  moved: function() {},
  detached: function() {},
});
