/* global describe, it, expect */
const ContactElement = require('./index.js');

describe('Contact element', () => {
  it('has the contact class', () => {
    expect(ContactElement().classList.contains('contact')).toBe(true);
  });

  it('has an id', () => {
    const id = '1';
    expect(ContactElement({ id }).querySelector('.id').value).toBe(id);
  });
});
