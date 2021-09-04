const toString = Object.prototype.toString;

export function isFunction(data: any): data is Function {
  return toString.call(data) === "[object Function]";
}

export function isString(data: any): data is string {
  return toString.call(data) === "[object String]";
}

export function isNull(data: any): data is null {
  return toString.call(data) === "[object Null]";
}

export function isUndefined(data: any): data is undefined {
  return toString.call(data) === "[object Undefined]";
}

export function isUndef(data: any): data is null | undefined {
  return isUndefined(data) || isNull(data);
}

export function isObject(obj: any): obj is Object {
  const type = typeof obj;
  return obj !== null && (type === "object" || type === "function");
}
