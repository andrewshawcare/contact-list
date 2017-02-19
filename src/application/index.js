const ContactList = require('../contact-list');

module.exports = ({title = ''} = {}) => {
  const contacts = window.localStorage.getItem('contacts') ? JSON.parse(window.localStorage.getItem('contacts')) : require('./contacts.json');
  const contactList = ContactList({contacts});
  return {
    contactList: {
      list: contactList.list
    },
    render: () => {
      document.title = title;

      const applicationElement = document.createElement('article');
      applicationElement.classList.add('application');
      document.body.appendChild(applicationElement);
    }
  };
};
