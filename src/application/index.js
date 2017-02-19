const ContactList = require('../contact-list');

module.exports = () => {
  const contacts = JSON.parse(window.localStorage.getItem('contacts')) || require('./contacts.json');
  const contactList = ContactList({contacts});
  return {
    contactList: {
      list: contactList.list
    }
  };
};
