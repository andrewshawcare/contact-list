const ContactList = require('./contact-list');
const ApplicationElement = require('./application-element');

const contactList = ContactList({
  contacts: window.localStorage.getItem('contacts') ? JSON.parse(window.localStorage.getItem('contacts')) : require('./contacts.json')
});

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
    contact: { contact, onEdit, onRemove }
  }));
};

const onEdit = (contact) => {
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

const onRemove = (contact) => {
  contactList.remove(({id}) => (contact.id === id));
  console.log(contactList.list());
  window.localStorage.setItem('contacts', JSON.stringify(contactList.list()));

  render(contactList.list()[0]);
};

render(contactList.list()[0]);
