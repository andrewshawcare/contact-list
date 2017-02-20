/* global describe, it, expect */
const ContactElement = require('./index.js');

describe('Contact element', () => {
  it('has the contact class', () => {
    expect(ContactElement().classList.contains('contact')).toBe(true);
  });

  it('has an id', () => {
    const id = '1';
    expect(ContactElement({ id }).querySelector('.id').value).toBe(id);
  });

  it('has a first name', () => {
    const firstName = 'John';
    expect(ContactElement({ firstName }).querySelector('.first.name').value).toBe(firstName);
  });

  it('has a last name', () => {
    const lastName = 'Smith';
    expect(ContactElement({ lastName }).querySelector('.last.name').value).toBe(lastName);
  });

  it('has a title', () => {
    const title = 'Developer';
    expect(ContactElement({ title }).querySelector('.title').value).toBe(title);
  });

  it('has an address', () => {
    const address = '123 Fake Street';
    expect(ContactElement({ address }).querySelector('.address').value).toBe(address);
  });

  it('has a city', () => {
    const city = 'Fakeville';
    expect(ContactElement({ city }).querySelector('.city').value).toBe(city);
  });
});
