/* global describe, it, expect */
const HistoryElement = require('./index');

describe('History element', () => {
  it('has the history class', () => {
    expect(HistoryElement().classList.contains('history')).toBe(true);
  });

  it('has a header element', () => {
    expect(HistoryElement().querySelector('.header')).not.toBeNull();
  });

  it('has a navigation element', () => {
    expect(HistoryElement().querySelector('.navigation')).not.toBeNull();
  });

  it('has an event element', () => {
    expect(HistoryElement().querySelector('.event')).not.toBeNull();
  });
});
