const toString = Object.prototype.toString;
export function isFunction(data) {
  return toString.call(data) === "[object Function]";
}
export function isString(data) {
  return toString.call(data) === "[object String]";
}
export function isNull(data) {
  return toString.call(data) === "[object Null]";
}
export function isUndefined(data) {
  return toString.call(data) === "[object Undefined]";
}
export function isUndef(data) {
  return isUndefined(data) || isNull(data);
}
export function isObject(obj) {
  const type = typeof obj;
  return obj !== null && (type === "object" || type === "function");
}
