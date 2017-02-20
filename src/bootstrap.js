const ContactList = require('./contact-list');
const ApplicationElement = require('./application-element');

const contacts = window.localStorage.getItem('contacts') ? JSON.parse(window.localStorage.getItem('contacts')) : require('./contacts.json');
const contactList = ContactList({contacts});

document.body.appendChild(ApplicationElement({
  header: {
    logo: 'Contact List'
  },
  navigation: {
    links: contactList.list().map((contact) => {
      return {
        title: `${contact.firstName} ${contact.lastName}`,
        subtitle: contact.title,
        onNavigate: () => { console.log(contact); }
      };
    })
  }
}));
