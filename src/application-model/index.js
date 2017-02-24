const ListModel = require('../list-model');
const uuid = require('./uuid');
const defaultContacts = require('./default-contacts.json');

module.exports = class {
  constructor ({ contacts = defaultContacts, searchQuery = '' } = {}) {
    this.isActiveContact = (contact) => contact.active;
    this.contactList = new ListModel({items: [...contacts]});
    this.searchQuery = searchQuery;
  }
  get contacts () {
    return this.contactList.toArray();
  }
  get activeContact () {
    return Object.assign({}, this.contactList.find(this.isActiveContact));
  }
  set activeContact ({ id }) {
    this.contactList.edit({
      filter: this.isActiveContact,
      replacer: (contact) => Object.assign({}, contact, {active: false})
    });
    this.contactList.edit({
      filter: (contact) => contact.id === id,
      replacer: (contact) => Object.assign({}, contact, {active: true})
    });
  }
  get searchResults () {
    const queryRegExp = new RegExp(this.searchQuery, 'gi');
    return this.contactList.findAll(({ firstName, lastName, title }) => {
      return (
        `${firstName} ${lastName}`.match(queryRegExp) ||
        title.match(queryRegExp)
      );
    });
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
    if (!this.contactList.find(this.isActiveContact)) {
      const activeContact = this.contactList.find((contact) => true);
      this.activeContact = activeContact;
    }
    return contact;
  }
  toJson () {
    return {
      contacts: this.contacts,
      activeContact: this.activeContact,
      searchQuery: this.searchQuery,
      searchResults: this.searchResults
    };
  }
};
