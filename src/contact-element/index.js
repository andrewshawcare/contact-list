const FieldElement = require('../field-element');

module.exports = ({contact = {}, remove = { title: '' }, onEdit = () => {}, onRemove = () => {}} = {}) => {
  const {
    id = { label: '', value: '' },
    firstName = { label: '', value: '' },
    lastName = { label: '', value: '' },
    title = { label: '', value: '' },
    address = { label: '', value: '' },
    city = { label: '', value: '' },
    province = { label: '', value: '' }
  } = contact;

  const contactElement = document.createElement('section');
  contactElement.classList.add('contact');

  contactElement.appendChild(FieldElement({
    classList: ['id'],
    type: 'text',
    label: id.label,
    value: id.value,
    disabled: true,
    onInput: (id) => {
      onEdit(Object.assign(contact, { id }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['first', 'name'],
    type: 'text',
    label: firstName.label,
    value: firstName.value,
    onInput: (firstName) => {
      onEdit(Object.assign(contact, { firstName }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['last', 'name'],
    type: 'text',
    label: lastName.label,
    value: lastName.value,
    onInput: (lastName) => {
      onEdit(Object.assign(contact, { lastName }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['title'],
    type: 'text',
    label: title.label,
    value: title.value,
    onInput: (title) => {
      onEdit(Object.assign(contact, { title }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['address'],
    type: 'text',
    label: address.label,
    value: address.value,
    onInput: (address) => {
      onEdit(Object.assign(contact, { address }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['city'],
    type: 'text',
    label: city.label,
    value: city.value,
    onInput: (city) => {
      onEdit(Object.assign(contact, { city }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['province'],
    type: 'text',
    label: province.label,
    value: province.value,
    onInput: (province) => {
      onEdit(Object.assign(contact, { province }));
    }
  }));

  const deleteElement = document.createElement('button');
  deleteElement.classList.add('remove');
  deleteElement.textContent = remove.title;
  deleteElement.addEventListener('click', () => { onRemove(contact); });
  contactElement.appendChild(deleteElement);

  return contactElement;
};
