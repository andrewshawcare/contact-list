const List = require('../list');
const defaultContacts = require('./default-contacts.json');

module.exports = ({ contacts = defaultContacts } = {}) => {
  const contactList = List({ items: contacts });
  return {
    contacts () {
      return contactList.toArray();
    }
  };
};
