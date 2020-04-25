import MemoListItem from "./MemoListItem.js";
import MemoListHead from "./MemoListHead.js";

export default class MemoList {
  el = null;
  app = null;
  memolist = [];

  constructor(app, memolist) {
    this.app = app;
    this.memolist = memolist;
  }

  render() {
    this.el = document.createElement("div");
    this.el.id = "memoList";
    this.el.appendChild(new MemoListHead(this.app).render());
    for (const item of this.memolist) {
      this.el.appendChild(new MemoListItem(this.app, item).render());
    }
    return this.el;
  }
}
