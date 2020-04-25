import { SAVE_MEMO, SET_MEMO } from "../Action.js";

class ColorPicker {
  constructor(onClickEventListener) {
    this.onClickEventListener = onClickEventListener;
  }
  makeBtn(color) {
    const btn = document.createElement("button");
    btn.appendChild(document.createElement("div"));
    btn.className = `cbtn cbtn-${color}`;
    btn.onclick = () => this.onClickEventListener(color);
    return btn;
  }

  render() {
    const el = document.createElement("div");
    el.classList.add("colorpicker");
    el.appendChild(this.makeBtn("black"));
    el.appendChild(this.makeBtn("white"));
    el.appendChild(this.makeBtn("red"));
    el.appendChild(this.makeBtn("blue"));
    el.appendChild(this.makeBtn("yellow"));
    return el;
  }
}

export default class TextEditor {
  el = null;
  action = null;
  id = null;
  title = "";
  content = "";
  color = null;

  constructor({ action, state }, { id, title, content, color }) {
    this.action = action;
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
  }

  render() {
    const saveIcon = document.createElement("i");
    saveIcon.className = "fas fa-save fa-2x";

    const saveBtn = document.createElement("div");
    saveBtn.className = "savebtn";
    saveBtn.appendChild(saveIcon);
    saveBtn.onclick = () => {
      this.action.do(SAVE_MEMO, this.id);
      alert("로컬스토리지에 저장되었습니다!");
    };

    const changeColor = (color) => {
      this.action.do(SET_MEMO, { id: this.id, color: color });
    };
    const head = document.createElement("div");
    head.className = "texteditor";
    head.appendChild(new ColorPicker(changeColor).render());
    head.appendChild(saveBtn);

    const titleElem = document.createElement("input");
    titleElem.setAttribute("type", "text");
    titleElem.setAttribute("placeholder", "메모 제목을 입력하세요.");
    titleElem.value = this.title;
    titleElem.onchange = () => {
      this.action.do(SET_MEMO, { id: this.id, title: titleElem.value });
    };

    const contentElem = document.createElement("textarea");
    contentElem.setAttribute("placeholder", "메모를 입력하세요.");
    contentElem.appendChild(document.createTextNode(this.content));
    contentElem.onchange = () => {
      this.action.do(SET_MEMO, { id: this.id, content: contentElem.value });
    };

    this.el = document.createElement("article");
    this.el.id = "texteditor";
    this.el.classList.add(this.color);
    this.el.appendChild(head);
    this.el.appendChild(titleElem);
    this.el.appendChild(contentElem);
    return this.el;
  }
}
