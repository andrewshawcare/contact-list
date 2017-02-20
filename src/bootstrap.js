const contacts = window.localStorage.getItem('contacts') ? JSON.parse(window.localStorage.getItem('contacts')) : require('./contacts.json');
const ContactList = require('./contact-list');
const contactList = ContactList({contacts});
console.log(contactList.list());

const ApplicationElement = require('./application-element');
document.body.appendChild(ApplicationElement({
  header: {
    logo: 'Contact List'
  },
  navigation: {
    links: contactList.list().map((contact) => {
      return {
        title: `${contact.firstName} ${contact.lastName}`,
        subtitle: contact.title
      };
    })
  }
}));
