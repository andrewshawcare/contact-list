/* global describe, it, expect, beforeEach */
const Application = require('./index.js');
const contacts = require('./contacts.json');

describe('Application', () => {
  beforeEach(() => {
    window.localStorage.removeItem('contacts');
    document.title = '';
  });

  it('loads a default list of contacts if no contacts are present in localStorage', () => {
    expect(Application().contactList.list()).toEqual(contacts);
  });

  it('loads a list of contacts from localStorage if they exist', () => {
    const expectedContacts = contacts.slice(1);
    window.localStorage.setItem('contacts', JSON.stringify(expectedContacts));
    expect(Application().contactList.list()).toEqual(expectedContacts);
  });

  it('renders the correct title', () => {
    const title = 'Contact List';
    Application({title}).render();
    expect(document.title).toBe(title);
  });

  it('renders an application', () => {
    Application().render();
    expect(document.body.querySelector('.application')).not.toBeNull();
  });

  it('renders a header', () => {
    Application().render();
    expect(document.body.querySelector('.application > .header')).not.toBeNull();
  });
});
