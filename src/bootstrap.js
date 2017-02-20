const ContactList = require('./contact-list');
const ApplicationElement = require('./application-element');
const uuid = require('./uuid');

const render = ({contact = {}, query = ''}) => {
  document.body.innerHTML = '';
  document.body.appendChild(ApplicationElement({
    headerElement: { logo: 'Contact List' },
    navigationElement: {
      query,
      links: contactList
        .find(({ firstName, lastName, title }) => (
          firstName.match(query) ||
          lastName.match(query) ||
          title.match(query)
        ))
        .map(({ id, firstName, lastName, title }) => {
          return {
            id,
            title: `${firstName} ${lastName}`,
            subtitle: title
          };
        }),
      activeLink: ({id}) => (contact.id === id),
      onNavigate,
      onAdd,
      onSearch
    },
    contactElement: { contact, onEdit, onRemove }
  }));
};

const onNavigate = (link) => {
  currentContact = contactList.find(({id}) => (link.id === id))[0];
  window.localStorage.setItem('currentContact', JSON.stringify(currentContact));

  render({ contact: currentContact, query: currentQuery });
};

const onSearch = (query) => {
  currentQuery = query;
  window.localStorage.setItem('currentQuery', currentQuery);

  render({contact: currentContact, query: currentQuery});

  document.body.querySelector('.application .navigation .search').focus();
};

const onAdd = () => {
  contactList.add({ id: uuid(), firstName: 'John', lastName: 'Smith', title: 'Employee' });

  const contacts = contactList.list();
  window.localStorage.setItem('contacts', JSON.stringify(contacts));

  currentContact = contacts[contacts.length - 1];
  window.localStorage.setItem('currentContact', JSON.stringify(currentContact));

  render({contact: currentContact, query: currentQuery});
};

const onEdit = (contact) => {
  const activeElementParentClassList = document.activeElement.parentElement.classList;
  const parentSelector = `.${Array.from(activeElementParentClassList).join('.')}`;

  contactList.edit({
    find: ({id}) => (contact.id === id),
    replace: () => contact
  });
  window.localStorage.setItem('contacts', JSON.stringify(contactList.list()));

  render({contact: currentContact, query: currentQuery});
  document.body.querySelector(`.application .contact ${parentSelector} .value`).focus();
};

const onRemove = (contact) => {
  contactList.remove(({id}) => (contact.id === id));

  window.localStorage.setItem('contacts', JSON.stringify(contactList.list()));

  if (contactList.list().length === 0) {
    onAdd();
  } else {
    currentContact = contactList.list()[0];
    window.localStorage.setItem('currentContact', JSON.stringify(currentContact));
    render({ contact: currentContact, query: currentQuery });
  }
};

const contactList = ContactList({
  contacts: window.localStorage.getItem('contacts')
    ? JSON.parse(window.localStorage.getItem('contacts'))
    : require('./contacts.json')
});

let currentQuery = window.localStorage.getItem('currentQuery')
  ? JSON.parse(window.localStorage.getItem('currentQuery'))
  : '';

let currentContact;
if (contactList.list().length === 0) {
  onAdd();
} else {
  currentContact = window.localStorage.getItem('currentContact')
    ? JSON.parse(window.localStorage.getItem('currentContact'))
    : contactList.list()[0];
}

render({ contact: currentContact, query: currentQuery });
