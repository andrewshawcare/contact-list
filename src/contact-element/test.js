/* global describe, it, expect */
const ContactElement = require('./index.js');

describe('Contact element', () => {
  it('has the contact class', () => {
    expect(ContactElement().classList.contains('contact')).toBe(true);
  });

  it('has an id', () => {
    const idLabel = 'ID';
    const idValue = '1';
    const contactElement = ContactElement({ label: { id: idLabel }, contact: { id: idValue } });
    expect(contactElement.querySelector('.id > .label').textContent).toBe(idLabel);
    expect(contactElement.querySelector('.id > .value').value).toBe(idValue);
  });

  it('has a first name', () => {
    const firstNameLabel = 'First name';
    const firstNameValue = 'John';
    const contactElement = ContactElement({ label: { firstName: firstNameLabel }, contact: { firstName: firstNameValue } });
    expect(contactElement.querySelector('.first.name > .label').textContent).toBe(firstNameLabel);
    expect(contactElement.querySelector('.first.name > .value').value).toBe(firstNameValue);
  });

  it('has a last name', () => {
    const lastNameLabel = 'Last name';
    const lastNameValue = 'Smith';
    const contactElement = ContactElement({ label: { lastName: lastNameLabel }, contact: { lastName: lastNameValue } });
    expect(contactElement.querySelector('.last.name > .label').textContent).toBe(lastNameLabel);
    expect(contactElement.querySelector('.last.name > .value').value).toBe(lastNameValue);
  });

  it('has a title', () => {
    const titleLabel = 'Title';
    const titleValue = 'Developer';
    const contactElement = ContactElement({ label: { title: titleLabel }, contact: { title: titleValue } });
    expect(contactElement.querySelector('.title > .label').textContent).toBe(titleLabel);
    expect(contactElement.querySelector('.title > .value').value).toBe(titleValue);
  });

  it('has an address', () => {
    const addressLabel = 'Address';
    const addressValue = '123 Fake Street';
    const contactElement = ContactElement({ label: { address: addressLabel }, contact: { address: addressValue } });
    expect(contactElement.querySelector('.address > .label').textContent).toBe(addressLabel);
    expect(contactElement.querySelector('.address > .value').value).toBe(addressValue);
  });

  it('has a city', () => {
    const cityLabel = 'City';
    const cityValue = 'Fakeville';
    const contactElement = ContactElement({ label: { city: cityLabel }, contact: { city: cityValue } });
    expect(contactElement.querySelector('.city > .label').textContent).toBe(cityLabel);
    expect(contactElement.querySelector('.city > .value').value).toBe(cityValue);
  });

  it('has a province', () => {
    const provinceLabel = 'Province';
    const provinceValue = 'Fakereal';
    const contactElement = ContactElement({ label: { province: provinceLabel }, contact: { province: provinceValue } });
    expect(contactElement.querySelector('.province > .label').textContent).toBe(provinceLabel);
    expect(contactElement.querySelector('.province > .value').value).toBe(provinceValue);
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
    expect(ContactElement().querySelector('.remove.action')).not.toBeNull();
  });

  it('has a remove title', () => {
    expect(ContactElement({ remove: { title: 'Remove' } }).querySelector('.remove.action').textContent).toBe('Remove');
  });

  it('performs the expected behaviour on removal', (done) => {
    const originalContact = { city: 'Originalville' };
    ContactElement({
      contact: originalContact,
      onRemove: (removedContact) => {
        expect(removedContact).toEqual(originalContact);
        done();
      }
    }).querySelector('.remove.action').click();
  });
});
