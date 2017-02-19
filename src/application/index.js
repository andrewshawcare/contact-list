const ContactList = require('../contact-list');

module.exports = ({
  title = '',
  header: { logo = '' } = {}
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

      const applicationElement = document.createElement('article');
      applicationElement.classList.add('application');
      document.body.appendChild(applicationElement);

      const headerElement = document.createElement('header');
      headerElement.classList.add('header');
      applicationElement.appendChild(headerElement);

      const logoElement = document.createElement('h1');
      logoElement.classList.add('logo');
      logoElement.textContent = logo;
      headerElement.appendChild(logoElement);
    }
  };
};
