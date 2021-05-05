class RequestError extends Error {
  constructor(message, config, code, request, response) {
    super(message);

    this.code = code;
    this.request = request;
    this.response = response;
    this.config = config;
    // this.isAxiosError = true
  }
}

export function createError(message, config, code, request, response) {
  const error = new RequestError(message, config, code, request, response);

  return error;
}
