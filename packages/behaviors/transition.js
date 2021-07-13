import { isObject } from '../common/is.js';

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 1000 / 30));

// 有点类似于vue的过渡动画，即在某一时间段插入类名，然后在移除，在插入下一个过渡类名
const getClassName = (name) => ({
  enter: `lin-${name}-enter lin-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `lin-${name}-enter-to lin-${name}-enter-active enter-to-class enter-active-class`,
  leave: `lin-${name}-leave lin-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `lin-${name}-leave-to lin-${name}-leave-active leave-to-class leave-active-class`
});
const TransitionBehavior = (showDefaultValue) =>
  Behavior({
    properties: {
      // 自定义样式
      customStyle: String,
      // 是否展示组件
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: 'observeShow'
      },
      // 动画时长，单位为毫秒
      duration: {
        type: null,
        value: 300,
        observer: 'observeDuration'
      },
      // 动画名称
      name: {
        type: String,
        value: 'fade'
      }
    },
    data: {
      type: '',
      // 是否已经插入，标志位，标识是否已经初始化完成，即第一次插入
      inited: false,
      // 控制是否显示，通过样式，display: none;
      display: false,
      // 类型，动画类名
      classes: '',
      // 动画时长
      currentDuration: 0
    },
    // 在组件实例进入页面节点树时执行
    attached() {
      if (this.properties.show) {
        // 如果默认需要显示，组件一进入页面节点树就开始动画
        this.enter();
      }
    },
    methods: {
      // 监听是否显示
      observeShow(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        if (newVal) {
          // 显示就开始显示的过度动画
          this.enter();
        } else {
          // 离开就开始离开的过渡动画
          this.leave();
        }
        // newVal ? this.enter() : this.leave();
      },
      // 进入的过渡动画
      enter() {
        const { duration, name } = this.properties;
        // 初始化过度类名
        const classNames = getClassName(name);
        // 判断是不是对象，是对象就获取enter字段
        const currentDuration = isObject(duration) ? duration.enter : duration;
        // 更新状态
        this.status = 'enter';
        // 发射before-enter事件
        this.triggerEvent('before-enter');
        // 利用Promise的异步特性
        Promise.resolve()
          .then(() => {
            // 检查状态
            this.checkStatus('enter');
            // 发射enter事件
            this.triggerEvent('enter');
            this.setData({
              // 初始化完成
              inited: true,
              // 显示元素
              display: true,
              // 插入进入的过度类名
              classes: classNames.enter,
              // 过渡时间
              currentDuration
            });
          })
          // 等在一段时间再开始下一帧的动画
          .then(nextTick)
          .then(() => {
            // 检查状态
            this.checkStatus('enter');
            // 标志位，标志过渡动画是否结束了
            this.transitionEnded = false;
            // 利用setTimeout模拟transitionEnd过渡动画结束事件
            setTimeout(() => this.onTransitionEnd(), currentDuration);
            // 此时开始下一个过渡动画
            this.setData({
              classes: classNames['enter-to']
            });
          })
          .catch(() => {});
      },
      leave() {
        if (!this.data.display) {
          // 已经是隐藏状态了
          return;
        }
        // 下面的跟enter差不多
        const { duration, name } = this.data;
        // 初始化过度类名
        const classNames = getClassName(name);
        // 过渡时间
        const currentDuration = isObject(duration) ? duration.leave : duration;
        // 更新状态
        this.status = 'leave';
        this.triggerEvent('before-leave');
        Promise.resolve()
          .then(() => {
            this.checkStatus('leave');
            this.triggerEvent('leave');
            // 与enter不同的是inited和display2个属性不需要处理，因为一旦置为false，就不能显示元素了，也就没过度效果了
            this.setData({
              classes: classNames.leave,
              currentDuration
            });
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus('leave');
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), currentDuration);
            this.setData({
              classes: classNames['leave-to']
            });
          })
          .catch(() => {});
      },
      // 检查状态，判断传入的状态是否是当前所在的状态
      checkStatus(status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },
      // 过渡动画结束
      onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }
        // 标记过渡动画结束
        this.transitionEnded = true;
        this.triggerEvent(`after-${this.status}`);
        const { show, display } = this.data;
        if (!show && display) {
          // 如果是离开动画，则需要隐藏元素
          this.setData({ display: false });
        }
      }
    }
  });

export default TransitionBehavior;
