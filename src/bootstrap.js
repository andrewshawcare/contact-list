const ContactList = require('./contact-list');
const ApplicationElement = require('./application-element');

// http://stackoverflow.com/a/28921801/492575
const uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (match) => {
      const randomNibble = Math.random() * 16 | 0;
      const nibble = (match === 'y') ? (randomNibble & 0x3 | 0x8) : randomNibble;
      return nibble.toString(16);
    }
  );
};

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
      }),
      onAdd
    },
    contact: { contact, onEdit, onRemove }
  }));
};

const onAdd = () => {
  contactList.add({ id: uuid(), firstName: 'John', lastName: 'Smith', title: 'Employee' });
  const contacts = contactList.list();

  window.localStorage.setItem('contacts', JSON.stringify(contacts));

  render(contacts[contacts.length - 1]);
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
