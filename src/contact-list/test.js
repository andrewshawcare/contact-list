/* global describe, it, expect */
const ContactList = require('./index.js');

describe('Contact list', function () {
  it('lists contacts', function () {
    const contacts = [
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
      }
    ];
    expect(ContactList({ contacts }).list()).toEqual(contacts);
  });

  it('adds a contact to the list', () => {
    const contact = {
      id: '1',
      firstName: 'Amy',
      lastName: 'Jones',
      title: 'Sales Representative',
      Address1: '90 Street',
      City: 'Toronto',
      State: 'Ontario'
    };
    expect(ContactList().add(contact).list()).toEqual([contact]);
  });

  it('finds a list of contacts from the list, given a filter', () => {
    const contacts = [
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
      }
    ];

    expect(
      ContactList({contacts})
        .find((contact) => (contact.id === '2'))
    ).toEqual([contacts[1]]);
  });
});
