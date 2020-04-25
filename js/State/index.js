import { App, Memo } from "./Model/index.js";

export default class State {
  memolist = [];
  appState = new App();

  save() {
    this.appState.save();
    for (const memo of this.memolist) {
      memo.save();
    }
  }

  load() {
    this.appState.load();
    for (let id = 1; id <= this.appState.memoCount; ++id) {
      const memo = new Memo({ id });
      memo.load();
      this.memolist.unshift(memo);
    }
  }
}
