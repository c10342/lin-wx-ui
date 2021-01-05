import LinkBehavior from '../behaviors/link';
import OpenTypeBehavior from '../behaviors/open-type';
import ButtonBehavior from '../behaviors/button';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'icon-class', 'text-class'],
  behaviors: [LinkBehavior, OpenTypeBehavior, ButtonBehavior],
  properties: {
    text: String,
    icon: String,
    info: {
      type: [String, Number]
    },
    dot: Boolean,
    url: String,
    loading: Boolean,
    disabled: Boolean
  },
  data: {},
  methods: {
    onClick () {
      this.triggerEvent('click');
      const { url } = this.properties;
      this.jump(url);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
