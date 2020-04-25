import State from "./State/index.js";
import Action, { LOAD_APP, TOGGLE_DARKMODE, TOGGLE_SIDEBAR } from "./Action.js";
import { TextEditor, MemoList } from "./View/index.js";

export default class App {
  state = new State();
  action = new Action(this);

  constructor() {
    this.action.do(LOAD_APP);
  }

  update() {
    if (this.state.appState.sidebar) {
      document.getElementById("memoList").parentNode.style.display = "block";
    } else {
      document.getElementById("memoList").parentNode.style.display = "none";
    }

    if (this.state.appState.darkmode) {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#aaa";
    } else {
      document.body.style.backgroundColor = "transparent";
      document.body.style.color = "initial";
    }
  }

  render() {
    this.update();
    document.getElementById("darkmode").onclick = () =>
      this.action.do(TOGGLE_DARKMODE);
    document.getElementById("hamburger").onclick = () =>
      this.action.do(TOGGLE_SIDEBAR);
    const selectedMemo = this.state.memolist.find(
      (memo) => memo.id == this.state.appState.selectedMemo
    );
    const memoList = new MemoList(this, this.state.memolist);
    const targetMemoList = document.getElementById("memoList");
    targetMemoList.parentNode.replaceChild(memoList.render(), targetMemoList);

    if (selectedMemo) {
      const texteditor = new TextEditor(this, selectedMemo);
      const targetTextEditor = document.getElementById("texteditor");
      targetTextEditor.parentNode.replaceChild(
        texteditor.render(),
        targetTextEditor
      );
    }
  }
}
