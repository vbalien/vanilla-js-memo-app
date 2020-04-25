export default class Entity {
  get storageKey() {
    return null;
  }

  get storageValue() {
    return null;
  }

  restoreStorage(storageKey, storageValue) {}

  save() {
    window.localStorage.setItem(this.storageKey, this.storageValue);
  }

  load(storageKey) {
    const storageValue = window.localStorage.getItem(storageKey);
    this.restoreStorage(storageKey, storageValue);
  }
}
