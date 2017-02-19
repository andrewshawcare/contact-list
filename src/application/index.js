const ContactList = require('../contact-list');
const ApplicationElement = require('../application-element');

module.exports = ({
  title = '',
  application = {}
} = {}) => {
  const contacts = window.localStorage.getItem('contacts') ? JSON.parse(window.localStorage.getItem('contacts')) : require('./contacts.json');
  const contactList = ContactList({contacts});
  return {
    contactList: {
      list: contactList.list
    },
    render: () => {
      document.title = title;
      document.body.innerHTML = '';
      document.body.appendChild(ApplicationElement(application));
    }
  };
};
