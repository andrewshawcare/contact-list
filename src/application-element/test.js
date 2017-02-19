/* global describe, it, expect */
const ApplicationElement = require('./index.js');

describe('Application element', () => {
  it('has the application class', () => {
    expect(ApplicationElement().classList.contains('application')).toBe(true);
  });

  it('has a header', () => {
    expect(ApplicationElement().querySelector('.application > .header')).not.toBeNull();
  });
});
