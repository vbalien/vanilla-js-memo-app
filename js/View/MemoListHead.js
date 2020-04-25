import { ADD_MEMO } from "../Action.js";

export default class MemoListHead {
  el = null;
  action = null;

  constructor({ action }) {
    this.action = action;
  }

  render() {
    const icon = document.createElement("i");
    icon.className = "fas fa-plus";

    this.el = document.createElement("li");
    this.el.className = "memo add";
    this.el.appendChild(icon);
    this.el.appendChild(document.createTextNode("메모 추가"));
    this.el.addEventListener("click", () => this.action.do(ADD_MEMO));
    return this.el;
  }
}
