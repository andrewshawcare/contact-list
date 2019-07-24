/* global beforeEach, describe, it, expect */
const ListModel = require('./index.js');

describe('List model', function () {
  let items;
  beforeEach(() => {
    items = [
      { id: '1', value: 1 },
      { id: '2', value: 3 },
      { id: '3', value: 5 }
    ];
  });
  it('can be converted into an array', function () {
    expect(new ListModel({ items }).toArray()).toEqual(items);
  });

  it('adds an item to the list', () => {
    const listModel = new ListModel();
    const expectedItem = items[0];
    const actualItem = listModel.add(expectedItem);
    expect(actualItem).toEqual(expectedItem);
    expect(listModel.toArray()).toEqual([expectedItem]);
  });

  it('finds an item from the list, given a filter', () => {
    expect(new ListModel({ items }).find((item) => item.id === '2')).toEqual(items[1]);
  });

  it('finds all items from the list, given a filter', () => {
    expect(new ListModel({ items }).findAll((item) => item.value > 1)).toEqual([items[1], items[2]]);
  });

  it('allows editing of an item from the list, given a filter', () => {
    const filter = (item) => (item.id === '2');
    const replacer = (item) => Object.assign({}, item, { value: 7 });
    const list = new ListModel({ items });
    const actualItem = list.edit({ filter, replacer });
    expect(actualItem).toEqual(replacer(items[1]));
  });

  it('does not change the list if no edits can be made', () => {
    const filter = (item) => false;
    const replacer = (item) => Object.assign({}, item, { value: 7 });
    const list = new ListModel({ items });
    const actualItem = list.edit({ filter, replacer });
    expect(actualItem).not.toBeDefined();
    expect(list.toArray()).toEqual(items);
  });

  it('allows removal of items from the list, given a filter', () => {
    const list = new ListModel({ items });
    const actualItem = list.remove((item) => (item.id === '2'));
    expect(actualItem).toEqual(items[1]);
  });
});
