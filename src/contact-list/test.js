/* global define, describe, it, expect */
define(['./index', 'text!./contacts.json'], function (ContactList, contactsText) {
  const contacts = JSON.parse(contactsText);

  describe('Contact list', function () {
    it('lists contacts', function () {
      expect(ContactList({contacts}).list()).toEqual(contacts);
    });
  });
});
