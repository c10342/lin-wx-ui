import { isObj } from "../common/utils";
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 1000 / 30));
const getClassName = (name) => {
  return {
    enter: `lin-${name}-enter lin-${name}-enter-active enter-class enter-active-class`,
    "enter-to": `lin-${name}-enter-to lin-${name}-enter-active enter-to-class enter-active-class`,
    leave: `lin-${name}-leave lin-${name}-leave-active leave-class leave-active-class`,
    "leave-to": `lin-${name}-leave-to lin-${name}-leave-active leave-to-class leave-active-class`,
  };
};
export const transition = (showDefaultValue) => {
  return Behavior({
    properties: {
      customStyle: String,
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: "observeShow",
      },
      duration: {
        type: null,
        value: 300,
        observer: "observeDuration",
      },
      name: {
        type: String,
        value: "fade",
      },
    },
    data: {
      type: "",
      inited: false,
      display: false,
    },
    attached() {
      if (this.properties.show) {
        this.enter();
      }
    },
    methods: {
      observeShow(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        newVal ? this.enter() : this.leave();
      },
      enter() {
        const { duration, name } = this.properties;
        const classNames = getClassName(name);
        const currentDuration = isObj(duration) ? duration.enter : duration;
        this.status = "enter";
        this.triggerEvent("before-enter");
        Promise.resolve()
          // .then(nextTick)
          .then(() => {
            this.checkStatus("enter");
            this.triggerEvent("enter");
            this.setData({
              inited: true,
              display: true,
              classes: classNames.enter,
              currentDuration,
            });
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus("enter");
            this.transitionEnded = false;
            this.setData({
              classes: classNames["enter-to"],
            });
          })
          .catch(() => {});
      },
      leave() {
        if (!this.data.display) {
          return;
        }
        const { duration, name } = this.data;
        const classNames = getClassName(name);
        const currentDuration = isObj(duration) ? duration.leave : duration;
        this.status = "leave";
        this.triggerEvent("before-leave");
        Promise.resolve()
          // .then(nextTick)
          .then(() => {
            this.checkStatus("leave");
            this.triggerEvent("leave");
            this.setData({
              classes: classNames.leave,
              currentDuration,
            });
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus("leave");
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), currentDuration);
            this.setData({
              classes: classNames["leave-to"],
            });
          })
          .catch(() => {});
      },
      checkStatus(status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },
      onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }
        this.transitionEnded = true;
        this.triggerEvent(`after-${this.status}`);
        const { show, display } = this.data;
        if (!show && display) {
          this.setData({ display: false });
        }
      },
    },
  });
};
