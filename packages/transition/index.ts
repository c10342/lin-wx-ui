import { LinComponent } from "../common/component";

import TransitionBehavior from "../behaviors/transition";

LinComponent({
  mixins: [TransitionBehavior(true)],
  classes: [
    "enter-class",
    "enter-active-class",
    "enter-to-class",
    "leave-class",
    "leave-active-class",
    "leave-to-class"
  ],
  methods: {
    onClick() {
      this.triggerEvent("click");
    }
  }
});
