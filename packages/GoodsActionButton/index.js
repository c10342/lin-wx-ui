import LinkBehavior from '../behaviors/link';
import OpenTypeBehavior from '../behaviors/open-type';
import ButtonBehavior from '../behaviors/button';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../GoodsAction/index': {
      type: 'ancestor',
      linked (parent) {
        this.parent = parent;
      },
      unlinked () {
        this.parent = null;
      }
    }
  },
  externalClasses: ['custom-class'],
  behaviors: [LinkBehavior, OpenTypeBehavior, ButtonBehavior],
  properties: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      value: 'danger'
    },
    url: String
  },
  data: {
    index: 0,
    totalLen: -1
  },
  methods: {
    update (index, len) {
      this.setData({
        index,
        totalLen: len
      });
    },
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
