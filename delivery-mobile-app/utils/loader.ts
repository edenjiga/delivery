class LoaderService {
  queue: number;
  listeners: Array<any>;

  constructor() {
    this.queue = 0;
    this.listeners = [];
  }

  onChange(cb: any) {
    this.listeners.push(cb);
  }

  show() {
    this.queue += 1;
    this.notifyListeners(true);
  }

  notifyListeners(value: any) {
    this.listeners.forEach((listener) => listener(value));
  }

  hide() {
    this.queue -= 1;
    if (this.queue < 0) {
      this.queue = 0;
    }
    if (this.queue === 0) {
      this.notifyListeners(false);
    }
  }
}

const loaderService = new LoaderService();
export { loaderService };
