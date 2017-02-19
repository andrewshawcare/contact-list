/* global describe, it, expect */
const Header = require('./index.js');

describe('Header', () => {
  it('renders a logo', () => {
    expect(Header({ logo: 'Contact List' }).querySelector('.logo').textContent).toBe('Contact List');
  });
});
