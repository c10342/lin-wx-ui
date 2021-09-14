import { RequestConfig } from "../types";

type InterceptorFn = (config: RequestConfig) => Promise<RequestConfig>;
interface InterceptorItem {
  resolve: InterceptorFn;
  reject?: InterceptorFn;
}

export default class InterceptorManager {
  interceptor: Array<InterceptorItem | null>;
  constructor() {
    // 存储拦截器
    this.interceptor = [];
  }

  // 添加拦截器
  use(resolve: InterceptorFn, reject?: InterceptorFn) {
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
