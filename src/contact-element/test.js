/* global describe, it, expect */
const ContactElement = require('./index.js');

describe('Contact element', () => {
  it('has the contact class', () => {
    expect(ContactElement().classList.contains('contact')).toBe(true);
  });

  it('has an id', () => {
    const id = '1';
    expect(ContactElement({ contact: { id } }).querySelector('.id > .label').textContent).toBe('ID');
    expect(ContactElement({ contact: { id } }).querySelector('.id > .value').value).toBe(id);
  });

  it('has a first name', () => {
    const firstName = 'John';
    expect(ContactElement({ contact: { firstName } }).querySelector('.first.name > .label').textContent).toBe('First name');
    expect(ContactElement({ contact: { firstName } }).querySelector('.first.name > .value').value).toBe(firstName);
  });

  it('has a last name', () => {
    const lastName = 'Smith';
    expect(ContactElement({ contact: { lastName } }).querySelector('.last.name > .label').textContent).toBe('Last name');
    expect(ContactElement({ contact: { lastName } }).querySelector('.last.name > .value').value).toBe(lastName);
  });

  it('has a title', () => {
    const title = 'Developer';
    expect(ContactElement({ contact: { title } }).querySelector('.title > .label').textContent).toBe('Title');
    expect(ContactElement({ contact: { title } }).querySelector('.title > .value').value).toBe(title);
  });

  it('has an address', () => {
    const address = '123 Fake Street';
    expect(ContactElement({ contact: { address } }).querySelector('.address > .label').textContent).toBe('Address');
    expect(ContactElement({ contact: { address } }).querySelector('.address > .value').value).toBe(address);
  });

  it('has a city', () => {
    const city = 'Fakeville';
    expect(ContactElement({ contact: { city } }).querySelector('.city > .label').textContent).toBe('City');
    expect(ContactElement({ contact: { city } }).querySelector('.city > .value').value).toBe(city);
  });

  it('has a province', () => {
    const province = 'Fakereal';
    expect(ContactElement({ contact: { province } }).querySelector('.province > .label').textContent).toBe('Province');
    expect(ContactElement({ contact: { province } }).querySelector('.province > .value').value).toBe(province);
  });

  it('performs the expected behaviour on edit', (done) => {
    const originalContact = { city: 'Originalville' };
    const editedCity = 'Editedville';
    const onEdit = (editedContact) => {
      expect(editedContact).toEqual({ city: editedCity });
      done();
    };
    const cityValueElement = ContactElement({ contact: originalContact, onEdit }).querySelector('.city > .value');
    cityValueElement.value = editedCity;
    cityValueElement.dispatchEvent(new window.Event('input'));
  });

  it('has a remove action', () => {
    expect(ContactElement().querySelector('.remove')).not.toBeNull();
  });

  it('performs the expected behaviour on removal', (done) => {
    const originalContact = { city: 'Originalville' };
    ContactElement({
      contact: originalContact,
      onRemove: (removedContact) => {
        expect(removedContact).toEqual(originalContact);
        done();
      }
    }).querySelector('.remove').click();
  });
});
