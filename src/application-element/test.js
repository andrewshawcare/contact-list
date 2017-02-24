/* global describe, it, expect */
const ApplicationElement = require('./index.js');

describe('Application element', () => {
  it('has the application class', () => {
    expect(ApplicationElement().classList.contains('application')).toBe(true);
  });

  it('has a header element', () => {
    expect(ApplicationElement().querySelector('.header')).not.toBeNull();
  });

  it('has a navigation element', () => {
    expect(ApplicationElement().querySelector('.navigation')).not.toBeNull();
  });

  it('has a contact element', () => {
    expect(ApplicationElement().querySelector('.contact')).not.toBeNull();
  });
});
