export default class Cancel {
  constructor(message) {
    this.message = message;
  }
}
export function isCancel(value) {
  return value instanceof Cancel;
}
