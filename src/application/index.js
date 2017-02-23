const List = require('../list');
const defaultContacts = require('./default-contacts.json');

module.exports = ({ contacts = defaultContacts } = {}) => {
  const isActiveContact = (contact) => contact.active;
  const contactList = List({ items: contacts });
  let query = '';
  return {
    contacts () {
      return contactList.toArray();
    },
    currentContact () {
      return contactList.find(isActiveContact);
    },
    query () {
      return query;
    }
  };
};
