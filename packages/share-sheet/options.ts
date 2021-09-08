import { LinComponent } from "../common/component";

LinComponent({
  classes: [
    "options-class",
    "option-class",
    "button-class",
    "image-class",
    "icon-class",
    "name-class",
    "description-class"
  ],
  props: {
    // 分享选项
    options: {
      type: Array,
      value: []
    },
    // 是否显示边框
    showBorder: Boolean
  },
  methods: {
    // 点击选项
    onSelect(event) {
      const { index } = event.currentTarget.dataset;
      const option = this.data.options[index];
      this.triggerEvent("select", { ...option, index });
    }
  }
});
