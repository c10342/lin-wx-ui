function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] || {};
}

function onPageScroll(event) {
  const { linPageScroll = [] } = getCurrentPage();

  linPageScroll.forEach((scroller) => {
    if (typeof scroller === 'function') {
      scroller(event);
    }
  });
}

const pageScrollBehavior = (scroller) => Behavior({
  attached() {
    const page = getCurrentPage();
    if (Array.isArray(page.linPageScroll)) {
      page.linPageScroll.push(scroller.bind(this));
    } else {
      page.linPageScroll = typeof page.onPageScroll === 'function'
        ? [page.onPageScroll.bind(page), scroller.bind(this)]
        : [scroller.bind(this)];
    }

    page.onPageScroll = onPageScroll;
  },
  detached() {
    const page = getCurrentPage();
    page.linPageScroll = (page.linPageScroll || []).filter((item) => item !== scroller);
  },
});

export default pageScrollBehavior;
