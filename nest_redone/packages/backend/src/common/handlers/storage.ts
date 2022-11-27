export class Storage {
  // object created and lives in memory even between requests

  private static localStorage = new WeakMap();

  static getTitle(value: any) {
    return this.localStorage.get(value);
  }

  static setTitle(value: any, data: any) {
    this.localStorage.set(value, data);
  }

  static getAll() {
    return this.localStorage;
  }
}
