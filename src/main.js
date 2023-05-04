const ApplicationModel = require('./application-model');
const ApplicationElement = require('./application-element');
const HistoryModel = require('./history-model');
const HistoryElement = require('./history-element');
const moment = require('moment');

let historyModel, applicationModel;

const init = () => {
  const historyModelString = window.location.hash
    ? window.location.hash.substring(1)
    : window.localStorage.getItem('historyModel');

  if (historyModelString) {
    historyModel = new HistoryModel(JSON.parse(window.atob(historyModelString)));
    applicationModel = new ApplicationModel(historyModel.currentState);
  } else {
    applicationModel = new ApplicationModel();
    historyModel = new HistoryModel({ startingState: applicationModel.toJson() });
  }

  return historyModel;
};

const sync = (historyModel) => {
  const historyModelString = window.btoa(JSON.stringify(historyModel.toJson()));
  window.localStorage.setItem('historyModel', historyModelString);
  window.location.hash = historyModelString;
  return historyModel;
};

const update = (historyModel, state) => {
  historyModel.state = state.toJson();
  return historyModel;
};

const onNavigate = ({ id }) => {
  applicationModel.activeContact = { id };
  render(sync(update(historyModel, applicationModel)));
};
const onAdd = () => {
  applicationModel.addContact();
  render(sync(update(historyModel, applicationModel)));
};
const onSearch = (query) => {
  const { selectionStart, selectionEnd } = document.body.querySelector('.application .search');

  applicationModel.searchQuery = query;
  const { applicationElement } = render(sync(update(historyModel, applicationModel)));
  const searchElement = applicationElement.querySelector('.search');

  searchElement.focus();
  searchElement.setSelectionRange(selectionStart, selectionEnd);
};
const onEdit = (contact) => {
  let activeElement = document.activeElement;
  const { selectionStart, selectionEnd } = activeElement;
  const activeElementSelector = `.${[...activeElement.classList].join('.')}`;
  const activeElementParentElementSelector = `.${[...activeElement.parentElement.classList].join('.')}`;

  applicationModel.editContact(contact);
  const { applicationElement } = render(sync(update(historyModel, applicationModel)));

  activeElement = applicationElement.querySelector(`${activeElementParentElementSelector} ${activeElementSelector}`);
  activeElement.focus();
  activeElement.setSelectionRange(selectionStart, selectionEnd);
};
const onRemove = (contact) => {
  applicationModel.removeContact(contact);
  render(sync(update(historyModel, applicationModel)));
};

const onHistoryNavigate = ({ id }) => {
  const events = historyModel.events;
  const targetEvent = events.find((event) => event.id === id);
  let currentEvent = events[historyModel.eventIndex];

  if (currentEvent.id === targetEvent.id) { return; }

  const navigateTowardsTargetEvent = (targetEvent.timestamp < currentEvent.timestamp)
    ? historyModel.undo
    : historyModel.redo;

  while (currentEvent.id !== targetEvent.id) {
    navigateTowardsTargetEvent.call(historyModel);
    currentEvent = events[historyModel.eventIndex];
  }

  applicationModel = new ApplicationModel(historyModel.currentState);

  render(sync(update(historyModel, applicationModel)));
};

window.addEventListener('keydown', (event) => {
  if (event.shiftKey && event.code === 'ArrowDown') {
    historyModel.undo();
    applicationModel = new ApplicationModel(historyModel.currentState);
    render(sync(update(historyModel, applicationModel)));
  }

  if (event.shiftKey && event.code === 'ArrowUp') {
    historyModel.redo();
    applicationModel = new ApplicationModel(historyModel.currentState);
    render(sync(update(historyModel, applicationModel)));
  }
});

const render = (historyModel) => {
  const applicationElement = ApplicationElement({
    headerElement: {
      logo: 'Contact List'
    },
    sidebarElement: {
      searchElement: {
        placeholder: 'Search',
        query: applicationModel.searchQuery,
        onSearch
      },
      navigationElement: {
        links: applicationModel.searchResults.map(({ id, firstName, lastName, title }) => {
          return { id, title: `${firstName} ${lastName}`, subtitle: title };
        }),
        isActiveLink: ({ id }) => applicationModel.activeContact.id === id,
        onNavigate,
        emphasisPattern: applicationModel.searchQuery
      },
      addActionElement: {
        title: 'Add contact',
        onClick: onAdd
      }
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
  const historyElement = HistoryElement({
    headerElement: {
      logo: 'History'
    },
    navigationElement: {
      links: historyModel.events.map(({ id, timestamp }) => {
        return { id, title: id, subtitle: moment(timestamp).fromNow() };
      }).reverse(),
      isActiveLink: ({ id }) => historyModel.events[historyModel.eventIndex].id === id,
      onNavigate: onHistoryNavigate
    },
    historyEventElement: {
      event: historyModel.events[historyModel.eventIndex],
      state: historyModel.currentState
    }
  });

  document.body.innerHTML = '';
  document.body.appendChild(applicationElement);
  document.body.appendChild(historyElement);

  return { applicationElement, historyElement };
};

render(sync(init()));
