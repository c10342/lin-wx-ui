export default Behavior({
  methods: {
    triggerParentChange (data) {
      if (this.parent) {
        this.parent.onChange(data);
      }
    },
    triggerParentBlur (data) {
      if (this.parent) {
        this.parent.onBlur(data);
      }
    }
  }
});
