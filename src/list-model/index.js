module.exports = class {
  constructor ({items = []} = {}) {
    this.items = [...items];
  }
  add (item) {
    this.items.push(item);
    return this.items[this.items.length - 1];
  }
  find (filter) {
    return this.items.find(filter);
  }
  findAll (filter) {
    return this.items.filter(filter);
  }
  edit ({filter, replacer}) {
    const index = this.items.findIndex(filter);
    if (index > -1) {
      this.items.splice(index, 1, replacer(Object.assign({}, this.items[index])));
      return this.items[index];
    } else {
      return undefined;
    }
  }
  remove (filter) {
    const index = this.items.findIndex(filter);
    return this.items.splice(index, 1)[0];
  }
  toArray () {
    return [...this.items];
  }
};
