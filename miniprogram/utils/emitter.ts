export default class Emitter {
  listeners: Record<string, Function[]> = {};

  constructor() {}

  on(events: Record<string, Function>) {
    for (const [eventName, func] of Object.entries(events)) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(func);
    }
  }

  emit(eventName: string, data: any) {
    const funcs = this.listeners[eventName];
    if (funcs) {
      for (const func of funcs) {
        func.call(this, data);
      }
    }
  }
}
