export const EVENT_ADD_MEMO = "add_memo";

export default class EventRouter {
  app = null;

  constructor(app) {
    this.app = app;
  }

  doEvent(type, payload) {
    switch (type) {
      case EVENT_ADD_MEMO:
        this.app.onAddMemo();
        break;
    }
  }
}
