const ContactList = require('./contact-list');
const ApplicationElement = require('./application-element');

const contacts = window.localStorage.getItem('contacts') ? JSON.parse(window.localStorage.getItem('contacts')) : require('./contacts.json');
const contactList = ContactList({contacts});

const render = (contact) => {
  document.body.innerHTML = '';
  document.body.appendChild(ApplicationElement({
    header: { logo: 'Contact List' },
    navigation: {
      links: contactList.list().map((contact) => {
        return {
          title: `${contact.firstName} ${contact.lastName}`,
          subtitle: contact.title,
          onNavigate: () => { render(contact); }
        };
      })
    },
    contact: { contact, onEdit: handleEdit }
  }));
};

const handleEdit = (contact) => {
  const activeElementParentClassList = document.activeElement.parentElement.classList;
  const parentSelector = `.${Array.from(activeElementParentClassList).join('.')}`;

  contactList.edit({
    find: ({id}) => (contact.id === id),
    replace: () => contact
  });
  window.localStorage.setItem('contacts', JSON.stringify(contactList.list()));

  render(contact);
  document.body.querySelector(`.application .contact ${parentSelector} .value`).focus();
};

render(contacts[0]);
