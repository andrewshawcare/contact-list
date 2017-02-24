module.exports = ({items = []} = {}) => {
  return {
    toArray () {
      return [...items];
    },
    add (item) {
      items.push(item);
      return this;
    },
    find (filter) {
      return items.find(filter);
    },
    findAll (filter) {
      return items.filter(filter);
    },
    edit ({filter, replacer}) {
      items = items.map((item) => {
        return filter(item) ? replacer(item) : item;
      });
    },
    remove (filter) {
      items = items.filter((item) => !filter(item));
    }
  };
};
