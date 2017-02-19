/* global describe, it, expect */
const Application = require('./index.js');
const contacts = require('./contacts.json');

describe('Application', () => {
  it('loads a default list of contacts if no contacts are present in localStorage', () => {
    expect(Application().contactList.list()).toEqual(contacts);
  });
});
