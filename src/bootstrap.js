const ApplicationModel = require('./application-model');
const ApplicationElement = require('./application-element');

const sync = (applicationModel) => {
  window.localStorage.setItem(
    'applicationModel',
    JSON.stringify(applicationModel.toJson())
  );
  return applicationModel;
};

const load = () => {
  const applicationModel = window.localStorage.getItem('applicationModel');
  if (applicationModel) {
    return new ApplicationModel(JSON.parse(applicationModel));
  } else {
    return new ApplicationModel();
  }
};

const onNavigate = ({ id }) => {
  const applicationModel = load();
  applicationModel.activeContact = { id };
  present(sync(applicationModel));
};
const onAdd = () => {
  const applicationModel = load();
  applicationModel.addContact();
  present(sync(applicationModel));
};
const onSearch = (query) => {
  const applicationModel = load();
  applicationModel.searchQuery = query;
  const applicationElement = present(sync(applicationModel));
  applicationElement.querySelector('.search').focus();
};
const onEdit = (contact) => {
  const activeElementParentClassList = document.activeElement.parentElement.classList;
  const parentSelector = `.${Array.from(activeElementParentClassList).join('.')}`;

  const applicationModel = load();
  applicationModel.editContact(contact);
  const applicationElement = present(sync(applicationModel));

  applicationElement.querySelector(`${parentSelector} .value`).focus();
};
const onRemove = (contact) => {
  const applicationModel = load();
  applicationModel.removeContact(contact);
  present(sync(applicationModel));
};

const present = (applicationModel) => {
  const applicationElement = ApplicationElement({
    headerElement: {
      logo: 'Contact List'
    },
    navigationElement: {
      links: applicationModel.searchResults.map(({ id, firstName, lastName, title }) => {
        return { id, title: `${firstName} ${lastName}`, subtitle: title };
      }),
      activeLink: (contact) => applicationModel.activeContact.id === contact.id,
      search: {
        placeholder: 'Search',
        query: applicationModel.searchQuery
      },
      add: { title: 'Add contact' },
      onNavigate,
      onAdd,
      onSearch
    },
    contactElement: {
      contact: applicationModel.activeContact,
      label: {
        id: 'ID',
        firstName: 'First name',
        lastName: 'Last name',
        title: 'Title',
        address: 'Address',
        city: 'City',
        province: 'Province'
      },
      remove: { title: 'Remove contact' },
      onEdit,
      onRemove
    }
  });
  document.body.innerHTML = '';
  document.body.appendChild(applicationElement);
  return applicationElement;
};

present(load());
