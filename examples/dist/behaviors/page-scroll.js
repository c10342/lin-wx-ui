import { isFunction } from '../common/is.js';

// 获取当前所在的页面实例
function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] || {};
}

// 页面滚动行为
function onPageScroll(event) {
  // 获取绑定在该页面上的滚动行为事件
  const { linPageScroll = [] } = getCurrentPage();

  linPageScroll.forEach((scroller) => {
    if (isFunction(scroller)) {
      scroller(event);
    }
  });
}

const pageScrollBehavior = (scroller) =>
  Behavior({
    // 组件插入到页面是触发
    attached() {
      const page = getCurrentPage();
      // 由于组件内部是不能监听到页面的滚动行为事件，所以需要将组件的滚动行为事件存储在页面实例当中，当页面滚动行为触发的时候，就调用每个组件的滚动行为事件
      if (Array.isArray(page.linPageScroll)) {
        page.linPageScroll.push(scroller.bind(this));
      } else {
        // 页面已经定义了onPageScroll方法，此时需要改写onPageScroll方法
        page.linPageScroll = isFunction(page.onPageScroll)
          ? [page.onPageScroll.bind(page), scroller.bind(this)]
          : [scroller.bind(this)];
      }

      page.onPageScroll = onPageScroll;
    },
    // 组件在页面中移除的时候触发
    detached() {
      const page = getCurrentPage();
      // 删除该组件绑定的滚动行为事件
      page.linPageScroll = (page.linPageScroll || []).filter(
        (item) => item !== scroller
      );
    }
  });

export default pageScrollBehavior;
