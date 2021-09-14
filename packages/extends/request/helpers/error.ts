// 错误类
class RequestError extends Error {
  code: string | number;
  request: WechatMiniprogram.RequestTask;
  response: any;
  config: any;
  isRequestError: boolean;
  constructor(
    message: string,
    config: any,
    code: string | number,
    request: WechatMiniprogram.RequestTask,
    response?: any
  ) {
    super(message);

    this.code = code;
    this.request = request;
    this.response = response;
    this.config = config;
    this.isRequestError = true;
  }
}

export function createError(
  message: string,
  config: any,
  code: string | number,
  request: WechatMiniprogram.RequestTask,
  response?: any
) {
  const error = new RequestError(message, config, code, request, response);

  return error;
}
