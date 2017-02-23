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
    edit ({find, replace}) {
      items = items.map((item) => {
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
