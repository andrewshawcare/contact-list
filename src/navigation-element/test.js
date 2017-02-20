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

  it('performs the expected behaviour on navigation', (done) => {
    const links = [
      { title: 'First title', subtitle: 'First subtitle' },
      { title: 'Second title', subtitle: 'Second subtitle', onNavigate: done },
      { title: 'Third title', subtitle: 'Third subtitle' }
    ];
    NavigationElement({ links }).querySelector('.link.list > .link:nth-of-type(0n + 2)').click();
  });

  it('has an add action', () => {
    expect(NavigationElement().querySelector('.add')).not.toBeNull();
  });

  it('performs the expected behaviour on add', (done) => {
    NavigationElement({ onAdd: done }).querySelector('.add').click();
  });
});
