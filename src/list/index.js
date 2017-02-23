module.exports = ({items = []} = {}) => {
  return {
    list () { return items; },
    add (item) {
      items.push(item);
      return this;
    },
    find (filter) { return items.filter(filter); },
    edit ({find, replace}) {
      items.map((item) => {
        return find(item) ? replace(item) : item;
      });
      return this;
    },
    remove (filter) {
      items = items.filter((item) => !filter(item));
      return this;
    }
  };
};
