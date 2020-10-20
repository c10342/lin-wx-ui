import { transition } from "../behaviors/transition";
Component({
  options: {
    addGlobalClass: true,
  },
  behaviors: [transition(true)],
  externalClasses: [
    "custom-class",
    "enter-class",
    "enter-active-class",
    "enter-to-class",
    "leave-class",
    "leave-active-class",
    "leave-to-class",
  ],
  methods: {
    onClick() {
      this.triggerEvent("click");
    },
  },
});
