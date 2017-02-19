/* global describe, it, expect */
const HeaderElement = require('./index.js');

describe('Header element', () => {
  it('has the header class', () => {
    expect(HeaderElement().classList.contains('header')).toBe(true);
  });

  it('renders a logo', () => {
    expect(HeaderElement({ logo: 'Contact List' }).querySelector('.logo').textContent).toBe('Contact List');
  });
});
