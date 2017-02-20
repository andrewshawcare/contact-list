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

  it('has an add action', () => {
    expect(NavigationElement().querySelector('.add')).not.toBeNull();
  });

  it('performs the expected behaviour on add', (done) => {
    NavigationElement({ onAdd: done }).querySelector('.add').click();
  });

  it('has a search action', () => {
    expect(NavigationElement().querySelector('.search')).not.toBeNull();
  });

  it('performs the expected behaviour on search', (done) => {
    const expectedQuery = 'asdf';
    const onSearch = (actualQuery) => {
      expect(searchElement.value).toBe(actualQuery);
      expect(actualQuery).toBe(expectedQuery);
      done();
    };
    const navigationElement = NavigationElement({ onSearch });
    const searchElement = navigationElement.querySelector('.search');
    searchElement.value = expectedQuery;
    searchElement.dispatchEvent(new window.Event('input'));
  });

  it('has a search placeholder', () => {
    expect(NavigationElement().querySelector('.search').getAttribute('placeholder')).toBe('Search');
  });
});
