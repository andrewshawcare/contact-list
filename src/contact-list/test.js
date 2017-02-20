/* global beforeEach, describe, it, expect */
const ContactList = require('./index.js');

describe('Contact list', function () {
  let contacts;
  beforeEach(() => {
    contacts = [
      {
        id: '1',
        firstName: 'Amy',
        lastName: 'Jones',
        title: 'Sales Representative',
        Address1: '90 Street',
        City: 'Toronto',
        State: 'Ontario'
      },
      {
        id: '2',
        firstName: 'James',
        lastName: 'King',
        title: 'President and CEO',
        Address1: '90 Street',
        City: 'Toronto',
        State: 'Ontario'
      },
      {
        id: '3',
        firstName: 'James',
        lastName: 'King',
        title: 'President and CEO',
        Address1: '90 Street',
        City: 'Toronto',
        State: 'Ontario'
      }
    ];
  });
  it('lists contacts', function () {
    expect(ContactList({ contacts }).list()).toEqual(contacts);
  });

  it('adds a contact to the list', () => {
    const contact = contacts[0];
    expect(ContactList().add(contact).list()).toEqual([contact]);
  });

  it('finds a list of contacts from the list, given a filter', () => {
    expect(
      ContactList({contacts})
        .find((contact) => (contact.id === '2'))
    ).toEqual([contacts[1]]);
  });

  it('allows editing of contacts from the list, given a filter', () => {
    const find = (contact) => (contact.id === '2');
    const replace = (contact) => Object.assign(contact, {firstName: 'Jimmy'});
    expect(
      ContactList({contacts}).edit({find, replace}).find(find)
    ).toEqual([replace(contacts[1])]);
  });

  it('allows removal of contacts from the list, given a filter', () => {
    const contactList = ContactList({contacts})
      .remove((contact) => (contact.id === '2'))
      .list();
    expect(contactList).toEqual([contacts[0], ...contacts.slice(2)]);
  });
});
