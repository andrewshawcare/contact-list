const ListModel = require('../list-model');
const uuid = require('../uuid');
const defaultContacts = require('./default-contacts.json');

module.exports = class {
  constructor ({
    contacts = defaultContacts,
    searchQuery = '',
    activeContactId = defaultContacts[0].id
  } = {}) {
    this.contactList = new ListModel({items: [...contacts]});
    this.searchQuery = searchQuery;
    this.activeContactId = activeContactId;
  }
  get contacts () {
    return this.contactList.toArray();
  }
  get activeContact () {
    const activeContact = this.contactList.find(({id}) => id === this.activeContactId);
    return activeContact ? Object.assign({}, activeContact) : activeContact;
  }
  set activeContact ({ id }) { this.activeContactId = id; }
  get searchContactIds () {
    const queryRegExp = new RegExp(this.searchQuery, 'gi');
    const searchContacts = this.contactList.findAll(({ firstName, lastName, title }) => {
      return (
        `${firstName} ${lastName}`.match(queryRegExp) ||
        title.match(queryRegExp)
      );
    });
    return searchContacts.map(({ id }) => id);
  }
  get searchResults () {
    const contacts = this.contactList.toArray();
    return contacts.filter(({ id }) => this.searchContactIds.includes(id));
  }
  addContact () {
    const contact = this.contactList.add(Object.assign({}, defaultContacts[0], { id: uuid(), active: false }));
    this.activeContact = contact;
    return this.activeContact;
  }
  editContact (contact) {
    this.contactList.edit({
      filter: ({ id }) => id === contact.id,
      replacer: () => Object.assign({}, contact)
    });
    this.activeContact = contact;
    return contact;
  }
  removeContact (contact) {
    this.contactList.remove(({ id }) => id === contact.id);
    if (this.contactList.toArray().length === 0) {
      this.addContact();
    }
    if (!this.activeContact) {
      this.activeContact = this.contactList.find((contact) => true);
    }
    return contact;
  }
  toJson () {
    return {
      contacts: this.contacts,
      activeContactId: this.activeContactId,
      searchQuery: this.searchQuery,
      searchContactIds: this.searchContactIds
    };
  }
};
