
import { getRect } from '../common/utils';
const TRANSITIONAll = 'transition: all 500ms';
const TRANSITIONNONE = 'transition: none';

Component({
  name: 'SwipeCell',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'left-class', 'right-class'],
  properties: {
    showLeft: {
      type: Boolean,
      value: false
    },
    showRight: {
      type: Boolean,
      value: false
    },
    leftWidth: {
      type: Number,
      observer: 'getLeftWidth'
    },
    rightWidth: {
      type: Number,
      observer: 'getRightWidth'
    },
    disabled: Boolean,
    disabledLeft: Boolean,
    disabledRight: Boolean,
    asyncClose: Boolean,
    name: {
      type: String,
      value: ''
    }
  },
  data: {
    transitionStyle: TRANSITIONAll,
    translateX: 0
  },
  methods: {
    onClick (event) {
      const { key: position = 'outside' } = event.currentTarget.dataset;
      this.triggerEvent('click', position);
      const { translateX, name } = this.data;
      if (translateX === 0) {
        return;
      }
      this.position = position;
      if (this.properties.asyncClose) {
        this.triggerEvent('before-close', {
          position,
          instance: this,
          name
        });
      } else {
        this.close();
      }
    },
    setTranslateX (translateX) {
      this.setData({
        transitionStyle: TRANSITIONAll,
        translateX
      });
    },
    close () {
      if (this.data.translateX === 0) {
        return;
      }
      this.setData({
        transitionStyle: TRANSITIONAll,
        translateX: 0
      });
      this.emitClose();
    },
    emitClose (position) {
      this.triggerEvent('close', {
        position: position || this.position,
        name: this.properties.name,
        instance: this
      });
    },
    open (position) {
      const { disabled, disabledLeft, disabledRight } = this.properties;
      if (!position || disabled) {
        return;
      }
      if (position === 'left' && !disabledLeft) {
        this.setTranslateX(this.leftWidth);
        this.emitOpen(position);
      } else if (position === 'right' && !disabledRight) {
        this.setTranslateX(-this.rightWidth);
        this.emitOpen(position);
      }
    },
    emitOpen (position) {
      const { name } = this.properties;
      this.triggerEvent('open', {
        position,
        name,
        instance: this
      });
      this.position = position;
    },
    onTouchmove (event) {
      const {
        showLeft,
        showRight,
        disabled,
        disabledLeft,
        disabledRight
      } = this.properties;
      if (disabled) {
        return;
      }
      let { translateX } = this.data;
      const clientX = event.touches[0].clientX;
      const offsetTranslateX = clientX - this.startX;
      translateX += offsetTranslateX;
      if (showLeft && translateX > 0 && !disabledLeft) {
        if (translateX >= this.leftWidth) {
          translateX = this.leftWidth;
        }
        this.setData({ translateX });
      } else if (showRight && translateX < 0 && !disabledRight) {
        if (-translateX >= this.rightWidth) {
          translateX = -this.rightWidth;
        }
        this.setData({ translateX });
      }
      this.startX = clientX;
    },
    onTouchend () {
      const {
        showLeft,
        showRight,
        disabled,
        disabledLeft,
        disabledRight
      } = this.properties;
      if (disabled) {
        return;
      }
      let { translateX } = this.data;
      if (translateX > 0 && showLeft && !disabledLeft) {
        if (translateX > this.leftWidth / 2) {
          translateX = this.leftWidth;
          this.emitOpen('left');
        } else {
          translateX = 0;
          this.emitClose('left');
        }
        this.setTranslateX(translateX);
      } else if (translateX < 0 && showRight && !disabledRight) {
        if (-translateX > this.rightWidth / 2) {
          translateX = -this.rightWidth;
          this.emitOpen('right');
        } else {
          translateX = 0;
          this.emitClose('right');
        }
        this.setTranslateX(translateX);
      }
    },
    onTouchstart (event) {
      const { disabled } = this.properties;
      if (disabled) {
        return;
      }
      const clientX = event.touches[0].clientX;
      this.startX = clientX;
      this.setData({
        transitionStyle: TRANSITIONNONE
      });
    },
    getLeftAndRightWidth () {
      this.getLeftWidth();
      this.getRightWidth();
    },
    getLeftWidth () {
      const { showLeft, leftWidth } = this.properties;
      if (showLeft) {
        if (leftWidth) {
          this.leftWidth = leftWidth;
        } else {
          getRect(this, '#left')
            .then(rect => {
              this.leftWidth = rect.width;
            });
        }
      } else {
        this.leftWidth = 0;
      }
    },
    getRightWidth () {
      const { showRight, rightWidth } = this.properties;
      if (showRight) {
        if (rightWidth) {
          this.rightWidth = rightWidth;
        } else {
          getRect(this, '#right')
            .then(rect => {
              this.rightWidth = rect.width;
            });
        }
      } else {
        this.rightWidth = 0;
      }
    }
  },
  created () {
    this.startX = 0;
    this.leftWidth = 0;
    this.rightWidth = 0;
    this.position = 'cell';
  },
  attached () {},
  ready () {
    this.getLeftAndRightWidth();
  },
  moved () {},
  detached () {}
});
