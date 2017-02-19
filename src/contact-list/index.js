module.exports = ({contacts = []} = {}) => {
  return {
    list () { return contacts; },
    add (contact) {
      contacts.push(contact);
      return this;
    },
    find (filter) { return contacts.filter(filter); }
  };
};
