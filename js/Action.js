import Memo, { MEMO_COLOR_BLACK } from "./State/Model/Memo.js";

export const ADD_MEMO = "add_memo";
export const SAVE_APP = "save_app";
export const SAVE_MEMO = "save_memo";
export const LOAD_APP = "load_app";
export const SELECT_MEMO = "select_memo";
export const SET_MEMO = "set_memo";
export const TOGGLE_DARKMODE = "toggle_darkmode";
export const TOGGLE_SIDEBAR = "toggle_sidebar";

const initialMemoState = {
  color: MEMO_COLOR_BLACK,
  title: "",
  content: "",
};

export default class Action {
  app = null;
  state = null;

  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  update(type, payload) {
    switch (type) {
      case LOAD_APP:
        this.state.load();
        break;
      case ADD_MEMO:
        {
          const memo = new Memo({
            ...initialMemoState,
            id: ++this.state.appState.memoCount,
          });
          this.state.memolist.unshift(memo);
          this.update(SELECT_MEMO, memo.id);
          this.update(SAVE_MEMO, memo.id);
        }
        break;
      case SAVE_MEMO:
        if (payload === -1) return;
        this.state.memolist.find((memo) => memo.id === payload).save();
        break;
      case SAVE_APP:
        this.state.appState.save();
        break;
      case SELECT_MEMO:
        this.update(SAVE_MEMO, this.state.appState.selectedMemo);
        this.state.appState.selectedMemo = payload;
        this.update(SAVE_APP);
        break;
      case SET_MEMO:
        {
          const memo = this.state.memolist.find(
            (memo) => memo.id === payload.id
          );
          memo.update(payload);
          this.update(SAVE_MEMO, memo.id);
        }
        break;
      case TOGGLE_DARKMODE:
        this.state.appState.darkmode = !this.state.appState.darkmode;
        this.update(SAVE_APP);
        break;
      case TOGGLE_SIDEBAR:
        this.state.appState.sidebar = !this.state.appState.sidebar;
        this.update(SAVE_APP);
        break;
    }
  }

  do(type, payload) {
    this.update(type, payload);
    this.app.render();
  }
}
