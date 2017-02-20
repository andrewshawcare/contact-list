/* global describe, it, expect */
const NavigationElement = require('./index.js');

describe('Navigation element', () => {
  it('has the navigation class', () => {
    expect(NavigationElement().classList.contains('navigation')).toBe(true);
  });

  it('renders a list of links', () => {
    const links = [
      { title: 'First title', subtitle: 'First subtitle' },
      { title: 'Second title', subtitle: 'Second subtitle' },
      { title: 'Third title', subtitle: 'Third subtitle' }
    ];
    expect(NavigationElement({ links }).querySelectorAll('.link.list > .link').length).toBe(3);
  });
});
