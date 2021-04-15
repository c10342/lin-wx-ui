import path from 'path';
import simulate from 'miniprogram-simulate';

export function loadTemplate(obj = {}) {
  return render(simulate.load(obj));
}

export function mounted(compName, props = {}) {
  // 重置，不然每次生成的时候会报错
  jest.resetModules();
  const id = getCompId(compName);
  return render(id, props);
}

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
export function getElement(context, selector) {
  return new CompUtils(context, selector);
}

class CompUtils {
  constructor(context, selector) {
    this.context = context;
    this.selector = selector;
    this.initDom();
  }

  initDom() {
    this.component = querySelector(this.context, this.selector);
  }

  getClassNames() {
    this.initDom();
    return getAttribute(this.component, 'class');
  }

  hasClassName(className) {
    this.initDom();
    return hasClassName(this.component, className);
  }

  getAttribute(attr) {
    this.initDom();
    return getAttribute(this.component, attr);
  }

  exists() {
    this.initDom();
    return !!this.component;
  }

  async dispatchEvent(evnetName) {
    this.initDom();
    const fn = jest.fn();
    this.context.instance.triggerEvent = fn;
    await this.component.dispatchEvent(evnetName);
    return fn;
  }

  getExternalClasses(externalClass) {
    this.initDom();
    return getExternalClasses(this.component, externalClass);
  }

  hasExternalClass(externalClass, className) {
    this.initDom();
    const classList = getExternalClasses(this.component, externalClass);
    if (Array.isArray(classList)) {
      return classList.includes(className);
    }
    return false;
  }
}

// 判断是否存在类名
function hasClassName(component, classname) {
  const classes = getAttribute(component, 'class');
  if (!classes) {
    return false;
  }
  const classArr = classes.split(/\s+/);
  return classArr.includes(classname);
}

//  获取元素上面的属性
function getAttribute(component, attr) {
  const attrsArr = component.dom.__wxElement._vt.attrs;
  const attrs = {};
  for (let i = 0; i < attrsArr.length; i++) {
    const attrItem = attrsArr[i];
    attrs[attrItem.name] = attrItem.value;
  }
  return attr ? attrs[attr] : attrs;
}

// 获取外部样式类
function getExternalClasses(component, externalClass) {
  const classesObj = component._exparserNode.__externalClassAlias;
  return externalClass ? classesObj[externalClass] : classesObj;
}

export function querySelector(context, selector) {
  return context.querySelector(selector);
}
