import { ADD_MEMO, SELECT_MEMO } from "../Action.js";

export default class MemoListItem {
  el = null;
  state = null;
  action = null;
  id = null;
  title = "";
  description = "";
  color = null;

  constructor({ action, state }, { id, title, content, color }) {
    this.action = action;
    this.state = state.appState;
    this.id = id;
    this.title = title;
    this.description = content;
    this.color = color;
  }

  render() {
    const titleElement = document.createElement("strong");
    titleElement.innerText = this.title;
    const descriptionElement = document.createElement("div");
    descriptionElement.innerText = this.description;

    this.el = document.createElement("li");
    this.el.className = "memo";
    this.el.classList.add(this.color);
    if (this.id === this.state.selectedMemo) this.el.classList.add("selected");
    this.el.onclick = () => this.action.do(SELECT_MEMO, this.id);
    this.el.appendChild(titleElement);
    this.el.appendChild(descriptionElement);
    return this.el;
  }
}
