import path from 'path';
import simulate from 'miniprogram-simulate';

export function getCompId(compName) {
  return simulate.load(
    path.resolve(__dirname, `./../packages/${compName}/index`)
  );
}

// 渲染组件
export function render(compId, props = {}) {
  const comp = simulate.render(compId, props);
  comp.attach(document.createElement('parent-wrapper'));
  return comp;
}

// 获取元素
export function getElement(context, element) {
  return new WXUtils(context, element);
}

class WXUtils {
  constructor(context, element) {
    this.context = context;
    this.element = element;
    this.initDom();
  }

  initDom() {
    this.dom = querySelector(this.context, this.element);
  }

  getClassNames() {
    this.initDom();
    return getAttribute(this.dom, 'class');
  }

  hasClassName(className) {
    this.initDom();
    return hasClassName(this.dom, className);
  }

  getAttribute(attr) {
    this.initDom();
    return getAttribute(this.dom, attr);
  }

  exists() {
    this.initDom();
    return !!this.dom;
  }
}

// 判断是否存在类名
function hasClassName(element, classname) {
  const classes = getAttribute(element, 'class');
  if (!classes) {
    return false;
  }
  const classArr = classes.split(/\s+/);
  return classArr.includes(classname);
}

//  获取元素上面的属性
function getAttribute(element, attr) {
  const attrsArr = element.dom.__wxElement._vt.attrs;
  const attrs = {};
  for (let i = 0; i < attrsArr.length; i++) {
    const attrItem = attrsArr[i];
    attrs[attrItem.name] = attrItem.value;
  }
  return attr ? attrs[attr] : attrs;
}

function querySelector(context, element) {
  return context.querySelector(element);
}
