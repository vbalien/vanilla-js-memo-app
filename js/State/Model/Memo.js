import Entity from "../Entity.js";

export const MEMO_COLOR_WHITE = "white";
export const MEMO_COLOR_BLACK = "black";
export const MEMO_COLOR_RED = "red";
export const MEMO_COLOR_BLUE = "blue";
export const MEMO_COLOR_YELLOW = "yellow";

export default class Memo extends Entity {
  id = null;
  color = MEMO_COLOR_BLACK;
  title = "";
  content = "";

  constructor({ id, color, title, content }) {
    super();
    this.id = id;
    this.color = color || MEMO_COLOR_BLACK;
    this.title = title || "";
    this.content = content || "";
  }

  get storageKey() {
    return `Memo_${this.id}`;
  }

  get storageValue() {
    return JSON.stringify({ ...this, id: undefined });
  }

  update(data) {
    this.color = data.color || this.color;
    this.title = data.title || this.title;
    this.content = data.content || this.content;
  }

  restoreStorage(storageKey, storageValue) {
    const data = JSON.parse(storageValue);
    this.update(data);
  }

  load() {
    super.load(this.storageKey);
  }
}
