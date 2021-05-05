import Cancel from './Cancel';

export default class CancelToken {
  constructor(executor) {
    let resolvePromise;
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    executor((message) => {
      if (this.reason) {
        return;
      }
      this.reason = new Cancel(message);

      resolvePromise(this.reason);
    });
  }

  // 判断是否已经取消过请求，已经取消过在此发送请求时没有意义的
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  static source() {
    let cancel;
    const token = new CancelToken((c) => {
      cancel = c;
    });
    return {
      cancel,
      token
    };
  }
}
