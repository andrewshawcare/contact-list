/* global describe, it, expect */
const SearchElement = require('./index.js');

describe('Search element', () => {
  it('has the search class', () => {
    expect(SearchElement().classList.contains('search')).toBe(true);
  });

  it('is a search type', () => {
    expect(SearchElement().getAttribute('type')).toBe('search');
  });

  it('has a placeholder', () => {
    expect(SearchElement({ placeholder: 'Placeholder' }).getAttribute('placeholder')).toBe('Placeholder');
  });

  it('has a query', () => {
    expect(SearchElement({ query: 'Query' }).value).toBe('Query');
  });

  it('emits the search event', (done) => {
    const expectedQuery = 'expected query';
    const searchElement = SearchElement({
      onSearch: (query) => {
        expect(query).toBe(expectedQuery);
        done();
      }
    });
    searchElement.value = expectedQuery;
    searchElement.dispatchEvent(new window.Event('input'));
  });
});
