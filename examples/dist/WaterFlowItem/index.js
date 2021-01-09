Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../WaterFlow/index': {
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
  properties: {},
  data: {
    positionStyle: '',
    width: '50%'
  },
  methods: {
    getRect () {
      return new Promise(resolve => {
        const query = this.createSelectorQuery();
        query
          .select('.lin-water-flow-item')
          .boundingClientRect(resolve)
          .exec();
      });
    },
    setPosition (positionStyle) {
      this.setData({
        positionStyle
      });
    },
    setWidth (width) {
      this.setData({
        width: parseInt(width)
      });
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
