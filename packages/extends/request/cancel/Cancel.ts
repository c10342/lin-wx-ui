export default class Cancel {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export function isCancel(value: any): value is Cancel {
  return value instanceof Cancel;
}
