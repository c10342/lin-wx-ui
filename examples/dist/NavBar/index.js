import {getSystemInfoSync} from '../common/utils'

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'left-class', 'right-class', 'title-class'],
  properties: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    customStyle: String,
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight:'0px'
  },
  methods: {
    onLeftClick () {
      this.triggerEvent('click-left');
    },
    onRightClick () {
      this.triggerEvent('click-right');
    }
  },
  created () {},
  attached () {},
  ready () {
    const {statusBarHeight} = getSystemInfoSync()
    this.setData({
      statusBarHeight:`${statusBarHeight}px`
    })
  },
  moved () {},
  detached () {}
});
