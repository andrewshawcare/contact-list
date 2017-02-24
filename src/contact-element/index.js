const FieldElement = require('../field-element');

module.exports = ({
  contact = {},
  label = {},
  remove = { title: '' },
  onEdit = () => {},
  onRemove = () => {}
} = {}) => {
  const contactElement = document.createElement('section');
  contactElement.classList.add('contact');

  contactElement.appendChild(FieldElement({
    classList: ['id'],
    type: 'text',
    label: label.id,
    value: contact.id,
    disabled: true,
    onInput: (id) => {
      onEdit(Object.assign(contact, { id }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['first', 'name'],
    type: 'text',
    label: label.firstName,
    value: contact.firstName,
    onInput: (firstName) => {
      onEdit(Object.assign(contact, { firstName }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['last', 'name'],
    type: 'text',
    label: label.lastName,
    value: contact.lastName,
    onInput: (lastName) => {
      onEdit(Object.assign(contact, { lastName }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['title'],
    type: 'text',
    label: label.title,
    value: contact.title,
    onInput: (title) => {
      onEdit(Object.assign(contact, { title }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['address'],
    type: 'text',
    label: label.address,
    value: contact.address,
    onInput: (address) => {
      onEdit(Object.assign(contact, { address }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['city'],
    type: 'text',
    label: label.city,
    value: contact.city,
    onInput: (city) => {
      onEdit(Object.assign(contact, { city }));
    }
  }));

  contactElement.appendChild(FieldElement({
    classList: ['province'],
    type: 'text',
    label: label.province,
    value: contact.province,
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
