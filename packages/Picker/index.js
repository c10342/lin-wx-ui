Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    columns: {
      type: Array,
      value: [],
    },
    itemHeight: {
      type: Number,
      value: 44,
    },
    valueKey: {
      type: String,
      value: "text",
    },
    showToolbar: Boolean,
    title: String,
    confirmButtonText: {
      type: String,
      value: "确认",
    },
    cancelButtonText: {
      type: String,
      value: "取消",
    },
    toolbarPosition: {
      type: String,
      value: "top",
      options: ["top", "bottom"],
    },
    visibleItemCount: {
      type: Number,
      value: 6,
      observer: "updateTopVisible",
    },
  },
  data: {
    topVisible: 2,
  },
  methods: {
    updateTopVisible() {
      const { visibleItemCount } = this.properties;
      const topVisible = parseInt(visibleItemCount / 2) - 1;
      this.setData({
        topVisible,
      });
    },
    onChange(data) {
      this.triggerEvent("change", data.detail);
    },
    onCancel() {},
    onConfirm() {},
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.updateTopVisible();
  },
  moved: function() {},
  detached: function() {},
});
