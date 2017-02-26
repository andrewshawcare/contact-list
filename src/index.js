const ApplicationModel = require('./application-model');
const ApplicationElement = require('./application-element');
const HistoryModel = require('./history-model');
const HistoryElement = require('./history-element');
const moment = require('moment');

let historyModelString = window.localStorage.getItem('historyModel');
let historyModel, applicationModel;
if (historyModelString) {
  historyModel = new HistoryModel(JSON.parse(historyModelString));
  applicationModel = new ApplicationModel(historyModel.currentState);
} else {
  applicationModel = new ApplicationModel();
  historyModel = new HistoryModel({ startingState: applicationModel.toJson() });
}
window.localStorage.setItem('historyModel', JSON.stringify(historyModel.toJson()));

const sync = (historyModel) => {
  window.localStorage.setItem('historyModel', JSON.stringify(historyModel.toJson()));
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
  applicationModel.searchQuery = query;
  const { applicationElement } = render(sync(update(historyModel, applicationModel)));
  applicationElement.querySelector('.search').focus();
};
const onEdit = (contact) => {
  const activeElementParentClassList = document.activeElement.parentElement.classList;
  const parentSelector = `.${Array.from(activeElementParentClassList).join('.')}`;

  applicationModel.editContact(contact);
  const { applicationElement } = render(sync(update(historyModel, applicationModel)));

  applicationElement.querySelector(`${parentSelector} .value`).focus();
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

  render(sync(historyModel));
};

const KEYCODE_Z = 90;
window.addEventListener('keydown', ({ keyCode, ctrlKey, metaKey, shiftKey }) => {
  if (keyCode === KEYCODE_Z && (ctrlKey || metaKey)) {
    shiftKey ? historyModel.redo() : historyModel.undo();

    applicationModel = new ApplicationModel(historyModel.currentState);

    render(sync(historyModel));
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
        onNavigate
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
      }),
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

render(historyModel);