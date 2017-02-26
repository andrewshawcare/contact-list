/* global describe, it, expect */
const ActionElement = require('./index');

describe('Action element', () => {
  it('has the action class', () => {
    expect(ActionElement().classList.contains('action')).toBe(true);
  });

  it('has a title', () => {
    expect(ActionElement({ title: 'Title' }).querySelector('.title').textContent).toBe('Title');
  });

  it('responds to the click event', (done) => {
    ActionElement({ onClick: done }).click();
  });

  it('has a void href', () => {
    expect(ActionElement().getAttribute('href')).toBe('javascript:void(0);');
  });
});
