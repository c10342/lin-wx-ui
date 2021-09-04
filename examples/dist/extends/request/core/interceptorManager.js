export default class InterceptorManager {
  constructor() {
    // 存储拦截器
    this.interceptor = [];
  }

  // 添加拦截器
  use(resolve, reject) {
    this.interceptor.push({
      resolve,
      reject
    });
    // id值，用来删除拦截器的
    return this.interceptor.length - 1;
  }

  // 遍历拦截器
  forEach(callback) {
    this.interceptor.forEach((i) => {
      if (i !== null) {
        callback(i);
      }
    });
  }

  // 删除拦截器
  eject(id) {
    if (this.interceptor[id]) {
      this.interceptor[id] = null;
    }
  }
}
