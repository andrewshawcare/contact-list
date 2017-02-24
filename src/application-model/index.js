const ListModel = require('../list-model');
const uuid = require('./uuid');
const defaultContacts = require('./default-contacts.json');

module.exports = class {
  constructor ({ contacts = defaultContacts, searchQuery = '' } = {}) {
    this.isActiveContact = (contact) => contact.active;
    this.contactList = ListModel({items: [...contacts]});
    this.searchQuery = searchQuery;
  }
  get contacts () {
    return this.contactList.toArray();
  }
  get activeContact () {
    let activeContact = this.contactList.find(this.isActiveContact);
    if (!activeContact) {
      activeContact = this.contactList.find(() => true);
      activeContact.active = true;
      this.contactList.edit({
        filter: (contact) => contact.id === activeContact.id,
        replacer: (contact) => Object.assign(contact, activeContact)
      });
    }
    return activeContact;
  }
  set activeContact (contact) {
    this.contactList.edit({
      filter: (contact) => contact.active,
      replacer: (contact) => Object.assign(contact, {active: false})
    });
    this.contact.active = true;
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
  addContact (contact) {
    this.contactList.add(Object.assign(contact, { id: uuid() }));
  }
  removeContact (filter) {
    this.contactList.remove(filter);
    if (this.contactList.toArray().length === 0) {
      this.addContact(defaultContacts[0]);
    }
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
