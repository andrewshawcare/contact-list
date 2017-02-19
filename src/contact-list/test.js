/* global describe, it, expect */
const ContactList = require('./index.js');
const contacts = require('./contacts.json');

describe('Contact list', function () {
  it('lists contacts', function () {
    expect(ContactList({contacts}).list()).toEqual(contacts);
  });
});
