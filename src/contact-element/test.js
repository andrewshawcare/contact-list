/* global describe, it, expect */
const ContactElement = require('./index.js');

describe('Contact element', () => {
  it('has the contact class', () => {
    expect(ContactElement().classList.contains('contact')).toBe(true);
  });

  it('has an id', () => {
    const id = { label: 'ID', value: '1' };
    expect(ContactElement({ contact: { id } }).querySelector('.id > .label').textContent).toBe(id.label);
    expect(ContactElement({ contact: { id } }).querySelector('.id > .value').value).toBe(id.value);
  });

  it('has a first name', () => {
    const firstName = { label: 'First name', value: 'John' };
    expect(ContactElement({ contact: { firstName } }).querySelector('.first.name > .label').textContent).toBe(firstName.label);
    expect(ContactElement({ contact: { firstName } }).querySelector('.first.name > .value').value).toBe(firstName.value);
  });

  it('has a last name', () => {
    const lastName = { label: 'Last name', value: 'Smith' };
    expect(ContactElement({ contact: { lastName } }).querySelector('.last.name > .label').textContent).toBe(lastName.label);
    expect(ContactElement({ contact: { lastName } }).querySelector('.last.name > .value').value).toBe(lastName.value);
  });

  it('has a title', () => {
    const title = { label: 'Title', value: 'Developer' };
    expect(ContactElement({ contact: { title } }).querySelector('.title > .label').textContent).toBe(title.label);
    expect(ContactElement({ contact: { title } }).querySelector('.title > .value').value).toBe(title.value);
  });

  it('has an address', () => {
    const address = { label: 'Address', value: '123 Fake Street' };
    expect(ContactElement({ contact: { address } }).querySelector('.address > .label').textContent).toBe(address.label);
    expect(ContactElement({ contact: { address } }).querySelector('.address > .value').value).toBe(address.value);
  });

  it('has a city', () => {
    const city = { label: 'City', value: 'Fakeville' };
    expect(ContactElement({ contact: { city } }).querySelector('.city > .label').textContent).toBe(city.label);
    expect(ContactElement({ contact: { city } }).querySelector('.city > .value').value).toBe(city.value);
  });

  it('has a province', () => {
    const province = { label: 'Province', value: 'Fakereal' };
    expect(ContactElement({ contact: { province } }).querySelector('.province > .label').textContent).toBe(province.label);
    expect(ContactElement({ contact: { province } }).querySelector('.province > .value').value).toBe(province.value);
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

  it('has a remove title', () => {
    expect(ContactElement({ remove: { title: 'Remove' } }).querySelector('.remove').textContent).toBe('Remove');
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
