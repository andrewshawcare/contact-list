/* global describe, it, expect */
const NavigationElement = require('./index');

describe('Navigation element', () => {
  it('has the navigation class', () => {
    expect(NavigationElement().classList.contains('navigation')).toBe(true);
  });
  it('has a list of links', () => {
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
      { title: 'Second title', subtitle: 'Second subtitle' },
      { title: 'Third title', subtitle: 'Third subtitle' }
    ];
    NavigationElement({
      links,
      onNavigate: (link) => {
        expect(link).toEqual(links[1]);
        done();
      }
    }).querySelector('.link.list > .link:nth-of-type(0n + 2)').click();
  });

  it('has an active link', () => {
    const links = [
      { title: 'First title', subtitle: 'First subtitle' },
      { title: 'Second title', subtitle: 'Second subtitle' },
      { title: 'Third title', subtitle: 'Third subtitle' }
    ];
    expect(NavigationElement({
      links,
      isActiveLink: (link) => (link.title === 'Second title')
    }).querySelector('.active.link .title').textContent).toBe('Second title');
  });

  it('emboldens sections of links matching the query', () => {
    const links = [
      { title: 'First title', subtitle: 'First subtitle' },
      { title: 'Second title', subtitle: 'Second subtitle' },
      { title: 'Third title', subtitle: 'Third subtitle' }
    ];
    const navigationElement = NavigationElement({ links, emphasisPattern: 'third t' });
    const thirdLinkElement = navigationElement.querySelector('.link:nth-of-type(0n + 3)');
    expect(thirdLinkElement.querySelector('.title').innerHTML).toBe('<strong>Third t</strong>itle');
    expect(thirdLinkElement.querySelector('.subtitle').innerHTML).toBe('Third subtitle');
  });
});
