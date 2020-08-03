/* global describe, it, expect */
const ajv = new (require('ajv'))();
const Application = require('./index');
const defaultContacts = require('./default-contacts.json');
const contactSchema = require('../schemas/contact.json');

describe('Application', () => {
  describe('contacts', () => {
    it('should be an array', () => {
      expect(new Application().contacts instanceof Array).toBe(true);
    });

    it('should have a default list', () => {
      expect(new Application().contacts).toEqual(defaultContacts);
    });

    it('should be a list of contacts', () => {
      new Application().contacts.forEach((contact) => {
        expect(ajv.validate(contactSchema, contact)).toBe(true);
      });
    });

    it('should always have at least one contact', () => {
      const application = new Application();
      while (application.contacts.length > 1) {
        application.removeContact(application.contacts.find(() => true));
      }
      application.removeContact(application.contacts.find(() => true));
      expect(application.contacts.length).toBe(1);
    });

    it('should add a default contact', () => {
      const application = new Application();
      const expectedContact = Object.assign({}, defaultContacts[0], { id: undefined, active: undefined });
      const actualContact = Object.assign({}, application.addContact(), { id: undefined, active: undefined });
      expect(actualContact).toEqual(expectedContact);
    });

    it('should have unique ids', () => {
      const application = new Application();
      while (application.contacts.length < 50) {
        application.addContact();
      }
      const idFrequencies = application.contacts.reduce((idFrequencies, { id }) => {
        if (Object.prototype.hasOwnProperty.call(idFrequencies, 'id')) {
          idFrequencies[id]++;
        } else {
          idFrequencies[id] = 1;
        }
        return idFrequencies;
      }, {});
      expect(Object.keys(idFrequencies).every((id) => idFrequencies[id] === 1)).toBe(true);
    });
  });

  describe('active contact', () => {
    it('should be a contact', () => {
      const activeContact = new Application().activeContact;
      expect(ajv.validate(contactSchema, activeContact)).toBe(true);
    });

    it('should be the first contact by default', () => {
      const activeContact = new Application().activeContact;
      expect(activeContact).toEqual(defaultContacts[0]);
    });

    it('should change to a new contact if the active contact is deleted', () => {
      const application = new Application();
      while (application.contacts.length > 1) {
        const activeContact = application.activeContact;
        application.removeContact(application.contacts.find((contact) => contact.id === activeContact.id));
        expect(application.activeContact).toBeDefined();
      }
      const activeContact = application.activeContact;
      application.removeContact(application.contacts.find((contact) => contact.id === activeContact.id));
      expect(application.activeContact).toBeDefined();
    });

    it('should change to the new contact if a new contact is added', () => {
      const application = new Application();
      const expectedContact = application.addContact();
      expect(application.activeContact).toEqual(expectedContact);
    });

    it('should change to the edited contact if a contact is edited', () => {
      const application = new Application();
      const expectedContact = Object.assign({}, defaultContacts[0], { firstName: 'Foo' });
      application.editContact(expectedContact);
      expect(application.activeContact).toEqual(expectedContact);
    });

    it('returns a copy of the current contact', () => {
      const application = new Application();
      const activeContact = application.activeContact;
      const unlikelyFirstName = 'Unlikelyfirstname123';
      activeContact.firstName = unlikelyFirstName;
      expect(application.activeContact.firstName).not.toBe(unlikelyFirstName);
    });
  });

  describe('search', () => {
    it('should have an empty query by default', () => {
      expect(new Application().searchQuery).toEqual('');
    });
    it('should return all contacts by default', () => {
      const application = new Application();
      expect(application.searchResults).toEqual(defaultContacts);
      expect(application.toJson().searchContactIds).toEqual(defaultContacts.map(({ id }) => id));
    });
    it('should filter contacts that have a name matching the query', () => {
      const application = new Application();
      application.searchQuery = 'amy';
      const expectedContact = defaultContacts[0];
      expect(application.searchResults).toEqual([expectedContact]);
      expect(application.toJson().searchContactIds).toEqual([expectedContact.id]);
    });
    it('should filter contacts that have a title matching the query', () => {
      const application = new Application();
      application.searchQuery = 'ceo';
      const expectedContact = defaultContacts[1];
      expect(application.searchResults).toEqual([expectedContact]);
      expect(application.toJson().searchContactIds).toEqual([expectedContact.id]);
    });
  });

  it('should be serializable', () => {
    expect(new Application().toJson()).toEqual({
      contacts: defaultContacts,
      activeContactId: defaultContacts[0].id,
      searchQuery: '',
      searchContactIds: defaultContacts.map(({ id }) => id)
    });
  });
});
