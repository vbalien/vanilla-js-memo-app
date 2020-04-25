import Entity from "../Entity.js";

export default class App extends Entity {
  memoCount = 0;
  selectedMemo = -1;
  darkmode = false;
  sidebar = true;

  get storageKey() {
    return "App";
  }

  get storageValue() {
    return JSON.stringify(this);
  }

  restoreStorage(storageKey, storageValue) {
    if (!storageValue) return;
    const data = JSON.parse(storageValue);
    this.memoCount = data.memoCount || this.memoCount;
    this.selectedMemo = data.selectedMemo || this.selectedMemo;
    this.darkmode = data.darkmode || this.darkmode;
    this.sidebar = data.sidebar || this.sidebar;
  }

  load() {
    super.load(this.storageKey);
  }
}
