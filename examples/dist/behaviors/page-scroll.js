function getCurrentPage(){const e=getCurrentPages();return e[e.length-1]||{}}function onPageScroll(e){const{linPageScroll:n=[]}=getCurrentPage();n.forEach(n=>{"function"==typeof n&&n(e)})}export const pageScrollBehaviors=e=>Behavior({attached(){const n=getCurrentPage();Array.isArray(n.linPageScroll)?n.linPageScroll.push(e.bind(this)):n.linPageScroll="function"==typeof n.onPageScroll?[n.onPageScroll.bind(n),e.bind(this)]:[e.bind(this)],n.onPageScroll=onPageScroll},detached(){const n=getCurrentPage();n.linPageScroll=(n.linPageScroll||[]).filter(n=>n!==e)}});