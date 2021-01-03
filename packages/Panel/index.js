Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class', 'header-class', 'content-class', 'footer-class'],
  properties: {
    title: String,
    desc: String,
    status: String,
    useFooterSlot: Boolean,
  },
  data: {},
  methods: {},
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
