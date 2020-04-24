import State from "./State/index.js";
import EventRouter, { EVENT_ADD_MEMO } from "./EventRouter.js";

export default class App {
  state = new State();
  eventRouter = new EventRouter(this);

  constructor() {
    document
      .getElementById("addMemo")
      .addEventListener("click", () =>
        this.eventRouter.doEvent(EVENT_ADD_MEMO)
      );
  }

  onAddMemo() {
    alert("onMemo");
  }
}
