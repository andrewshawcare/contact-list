module.exports = ({contacts = []} = {}) => {
  return {
    list () { return contacts; },
    add (contact) {
      contacts.push(contact);
      return this;
    },
    find (filter) { return contacts.filter(filter); },
    edit ({find, replace}) {
      contacts.map((contact) => {
        return find(contact) ? replace(contact) : contact;
      });
      return this;
    },
    remove (filter) {
      contacts = contacts.filter((contact) => !filter(contact));
      return this;
    }
  };
};
