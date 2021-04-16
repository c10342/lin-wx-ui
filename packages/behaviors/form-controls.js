export default Behavior({
  methods: {
    // 调用FormItem组件的onChange事件
    triggerParentChange(data) {
      if (this.parent) {
        this.parent.onChange(data);
      }
    },
    // 调用FormItem组件的onBlur事件
    triggerParentBlur(data) {
      if (this.parent) {
        this.parent.onBlur(data);
      }
    }
  }
});
