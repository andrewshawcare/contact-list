/* global describe, it, expect, beforeEach */
const HistoryModel = require('./index');
const ajv = require('ajv')();
const eventSchema = require('../schemas/event.json');

describe('History model', () => {
  let startingState;
  beforeEach(() => {
    startingState = {foo: 'foo', bar: 'bar', baz: 'baz'};
  });

  it('returns the starting state', () => {
    expect(new HistoryModel({ startingState }).startingState).toEqual(startingState);
  });

  it('returns the current state', () => {
    expect(new HistoryModel({ startingState }).currentState).toEqual(startingState);
  });

  it('reflects changes to current state', () => {
    const expectedCurrentState = Object.assign({}, startingState, { foo: 'baz' });
    const historyModel = new HistoryModel({ startingState });
    expect(historyModel.events.length).toEqual(1);
    historyModel.state = expectedCurrentState;
    expect(historyModel.startingState).toEqual(startingState);
    expect(historyModel.currentState).toEqual(expectedCurrentState);
    expect(historyModel.events.length).toEqual(2);
  });

  it('does not record events when state does not change', () => {
    const historyModel = new HistoryModel({ startingState });
    historyModel.state = historyModel.currentState;
    expect(historyModel.startingState).toEqual(startingState);
    expect(historyModel.currentState).toEqual(startingState);
    expect(historyModel.events.length).toEqual(1);
  });

  it('records events on state change', () => {
    const historyModel = new HistoryModel({ startingState });
    const timeBeforeStateChange = Date.now();
    historyModel.state = Object.assign({}, startingState, { foo: 'baz' });
    const timeAfterStateChange = Date.now();
    const event = historyModel.events[0];

    ajv.validate(eventSchema, event);
    expect(ajv.errors).toBeNull();

    expect(timeBeforeStateChange <= event.timestamp).toBe(true);
    expect(timeAfterStateChange >= event.timestamp).toBe(true);
  });

  it('can recreate current state from starting state and events', () => {
    const expectedCurrentState = Object.assign({}, startingState, { foo: 'baz' });
    const historyModel = new HistoryModel({ startingState });
    historyModel.state = expectedCurrentState;
    expect(new HistoryModel({
      startingState,
      events: [...historyModel.events]
    }).currentState).toEqual(expectedCurrentState);
  });

  it('can undo events', () => {
    const state = Object.assign({}, startingState, { foo: 'baz' });
    const historyModel = new HistoryModel({ startingState });
    historyModel.state = state;
    historyModel.undo();
    expect(historyModel.currentState).toEqual(startingState);
  });

  it('does not undo past the first event', () => {
    const state = Object.assign({}, startingState, { foo: 'baz' });
    const historyModel = new HistoryModel({ startingState });
    historyModel.state = state;
    historyModel.undo();
    historyModel.undo();
    expect(historyModel.currentState).toEqual({});
    expect(historyModel.events.length).toEqual(2);
  });

  it('can redo events', () => {
    const state = Object.assign({}, startingState, { foo: 'baz' });
    const historyModel = new HistoryModel({ startingState });
    historyModel.state = state;
    historyModel.undo();
    historyModel.redo();
    expect(historyModel.currentState).toEqual(state);
  });

  it('does not redo past the current state', () => {
    const state = Object.assign({}, startingState, { foo: 'baz' });
    const historyModel = new HistoryModel({ startingState });
    historyModel.state = state;
    historyModel.undo();
    historyModel.redo();
    historyModel.redo();
    expect(historyModel.currentState).toEqual(state);
  });

  it('forgets the future on state change', () => {
    const firstState = Object.assign({}, startingState, { foo: 'bar' });
    const secondState = Object.assign({}, startingState, { foo: 'baz' });
    const expectedState = Object.assign({}, startingState, { foo: 'barbaz' });

    const historyModel = new HistoryModel({ startingState });

    historyModel.state = firstState;
    historyModel.state = secondState;
    historyModel.undo();
    historyModel.state = expectedState;

    expect(historyModel.currentState).toEqual(expectedState);
    expect(historyModel.events.length).toEqual(3);
  });

  it('can be serialized to JSON', () => {
    const historyModelJson = new HistoryModel({ startingState }).toJson();
    expect(historyModelJson.startingState).toEqual(startingState);
    expect(historyModelJson.events.length).toEqual(1);
    expect(historyModelJson.eventIndex).toEqual(0);
    expect(new HistoryModel(historyModelJson).toJson()).toEqual(historyModelJson);
  });

  it('only replays up to the provided event index', () => {
    const firstState = Object.assign({}, startingState, { foo: 'bar' });
    const secondState = Object.assign({}, startingState, { foo: 'baz' });
    const thirdState = Object.assign({}, startingState, { foo: 'barbaz' });

    const historyModel = new HistoryModel({ startingState });

    historyModel.state = firstState;
    historyModel.state = secondState;
    historyModel.state = thirdState;

    const historyModelJson = Object.assign(historyModel.toJson(), {eventIndex: 2});

    expect(new HistoryModel(historyModelJson).currentState).toEqual(secondState);
  });
});
