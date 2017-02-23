/* global beforeEach, describe, it, expect */
const List = require('./index.js');

describe('List', function () {
  let items;
  beforeEach(() => {
    items = [
      { id: '1', value: 1 },
      { id: '2', value: 3 },
      { id: '3', value: 5 }
    ];
  });
  it('lists items', function () {
    expect(List({ items }).list()).toEqual(items);
  });

  it('adds an item to the list', () => {
    const item = items[0];
    expect(List().add(item).list()).toEqual([item]);
  });

  it('finds a list of items from the list, given a filter', () => {
    expect(
      List({items}).find((item) => (item.id === '2'))
      ).toEqual([items[1]]);
  });

  it('allows editing of items from the list, given a filter', () => {
    const find = (item) => (item.id === '2');
    const replace = (item) => Object.assign(item, {value: 7});
    expect(
      List({items}).edit({find, replace}).find(find)
    ).toEqual([replace(items[1])]);
  });

  it('allows removal of items from the list, given a filter', () => {
    const itemList = List({items})
      .remove((item) => (item.id === '2'))
      .list();
    expect(itemList).toEqual([items[0], ...items.slice(2)]);
  });
});
