const jsondiffpatch = require('jsondiffpatch/public/build/jsondiffpatch');
const uuid = require('../uuid');

module.exports = class {
  constructor ({ startingState, events = [], eventIndex } = {}) {
    this.diffpatcher = jsondiffpatch.create({ objectHash: ({ id }) => id });
    this.startingState = JSON.parse(JSON.stringify(startingState));
    this.currentState = {};
    this.events = [...events];
    this.eventIndex = eventIndex || this.events.length - 1;

    if (this.events.length === 0) {
      this.state = this.startingState;
    } else {
      this.events.slice(0, this.eventIndex + 1).forEach((event) => {
        this.diffpatcher.patch(this.currentState, event.patch);
      });
    }
  }
  set state (state) {
    const stateString = JSON.stringify(state);
    const currentStateString = JSON.stringify(this.currentState);

    if (stateString === currentStateString) { return; }

    this.events.splice(this.eventIndex + 1);
    this.events.push({
      id: uuid(),
      timestamp: Date.now(),
      patch: this.diffpatcher.diff(this.currentState, state)
    });
    this.eventIndex = this.events.length - 1;
    this.currentState = JSON.parse(stateString);
  }
  undo () {
    if (this.eventIndex < 0) {
      return;
    }

    const event = this.events[this.eventIndex];
    this.diffpatcher.unpatch(this.currentState, event.patch);
    this.eventIndex--;
  }
  redo () {
    if (this.eventIndex >= this.events.length - 1) {
      return;
    }

    const event = this.events[this.eventIndex + 1];
    this.diffpatcher.patch(this.currentState, event.patch);
    this.eventIndex++;
  }
  toJson () {
    return {
      startingState: JSON.parse(JSON.stringify(this.startingState)),
      events: [...this.events],
      eventIndex: this.eventIndex
    };
  }
};
