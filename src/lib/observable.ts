export class Observable<T> {
  public value: T;
  private _listeners: Array<(value: T) => void> = [];

  get listener() {
    return this._listeners;
  }

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  subscribe(handler: (value: T) => void, emitImmediately = false) {
    this._listeners.push(handler);
    if (emitImmediately) {
      handler(this.value);
    }
    return () => {
      this._listeners = this._listeners.filter(
        (listener) => listener !== handler
      );
    };
  }

  next(value: T) {
    this.value = value;
    this._listeners.forEach((listener) => {
      listener(value);
    });
  }
}
