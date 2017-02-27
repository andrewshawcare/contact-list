/* global describe, it, expect */
const HistoryEventElement = require('./index');

describe('History event element', () => {
  it('has the event class', () => {
    expect(HistoryEventElement().classList.contains('event')).toBe(true);
  });

  it('has an id', () => {
    expect(HistoryEventElement({ event: { id: 'id' } }).querySelector('.id').textContent).toBe('id');
  });

  it('has a timestamp', () => {
    const timestamp = Date.now();
    expect(HistoryEventElement({ event: { timestamp } }).querySelector('.timestamp').textContent).not.toBe('');
  });

  it('has a delta', () => {
    expect(HistoryEventElement().querySelector('.delta')).not.toBeNull();
  });
});
