const jsondiffpatch = require('jsondiffpatch/public/build/jsondiffpatch');
const uuid = require('../uuid');

module.exports = class {
  constructor ({ startingState, events = [], eventIndex } = {}) {
    this.diffpatcher = jsondiffpatch.create({ objectHash: ({ id }) => id });
    this.startingState = JSON.parse(JSON.stringify(startingState));
    this.currentState = {};
    this.events = JSON.parse(JSON.stringify(events));
    this.eventIndex = eventIndex || this.events.length - 1;

    if (this.events.length < 1) {
      this.state = this.startingState;
    } else {
      this.events.slice(0, this.eventIndex + 1).forEach((event) => {
        this.diffpatcher.patch(this.currentState, JSON.parse(JSON.stringify(event.delta)));
      });
    }
  }
  set state (state) {
    const stateString = JSON.stringify(state);
    const currentStateString = JSON.stringify(this.currentState);

    if (stateString === currentStateString) { return; }

    const delta = this.diffpatcher.diff(this.currentState, state);
    const event = { id: uuid(), timestamp: Date.now(), delta };
    this.events.splice(this.eventIndex + 1, this.events.length, event);
    this.diffpatcher.patch(this.currentState, JSON.parse(JSON.stringify(delta)));

    this.eventIndex = this.events.length - 1;
  }
  undo () {
    if (this.eventIndex < 1) { return; }

    const event = this.events[this.eventIndex];
    this.diffpatcher.unpatch(this.currentState, event.delta);
    this.eventIndex--;
  }
  redo () {
    if (this.eventIndex >= this.events.length - 1) { return; }

    const event = this.events[this.eventIndex + 1];
    this.diffpatcher.patch(this.currentState, event.delta);
    this.eventIndex++;
  }
  toJson () {
    return JSON.parse(JSON.stringify({
      startingState: this.startingState,
      events: this.events,
      eventIndex: this.eventIndex
    }));
  }
};
