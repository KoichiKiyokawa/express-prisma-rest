export class DummySession<T> {
  constructor(private data: T) {}

  get(key: keyof T) {
    return this.data[key];
  }

  set(key: keyof T, value: T[keyof T]) {
    this.data[key] = value;
  }

  async save() {
    return;
  }
}
