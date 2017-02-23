/* global describe, it, expect */
const Application = require('./index');
const defaultContacts = require('./default-contacts.json');

describe('Application', () => {
  describe('contacts', () => {
    it('should be an array', () => {
      expect(Application().contacts() instanceof Array).toBe(true);
    });

    it('should have a default list', () => {
      expect(Application().contacts()).toEqual(defaultContacts);
    });
  });

  describe('active contact', () => {
    it('should be the first contact by default', () => {
      const currentContact = Application().currentContact();
      expect(currentContact).toEqual(defaultContacts[0]);
    });
  });
});
