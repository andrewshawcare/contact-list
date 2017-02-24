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
    expect(ListModel({ items }).toArray()).toEqual(items);
  });

  it('adds an item to the list', () => {
    const item = items[0];
    expect(ListModel().add(item).toArray()).toEqual([item]);
  });

  it('finds an item from the list, given a filter', () => {
    expect(ListModel({items}).find((item) => item.id === '2')).toEqual(items[1]);
  });

  it('finds all items from the list, given a filter', () => {
    expect(ListModel({items}).findAll((item) => item.value > 1)).toEqual([items[1], items[2]]);
  });

  it('allows editing of an item from the list, given a filter', () => {
    const filter = (item) => (item.id === '2');
    const replacer = (item) => Object.assign(item, {value: 7});
    const list = ListModel({items});
    list.edit({filter, replacer});
    expect(list.find(filter)).toEqual(replacer(items[1]));
  });

  it('allows removal of items from the list, given a filter', () => {
    const list = ListModel({items});
    list.remove((item) => (item.id === '2'));
    expect(list.toArray()).toEqual([items[0], ...items.slice(2)]);
  });
});
