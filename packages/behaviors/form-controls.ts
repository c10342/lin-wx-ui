export default Behavior({
  methods: {
    // 调用FormItem组件的onChange事件
    triggerParentChange(data: any) {
      if (this.parent) {
        (this.parent as any).onChange(data);
      }
    },
    // 调用FormItem组件的onBlur事件
    triggerParentBlur(data: any) {
      if (this.parent) {
        (this.parent as any).onBlur(data);
      }
    }
  }
});
