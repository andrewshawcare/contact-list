const createFieldElement = ({
  classList = [],
  type,
  label = '',
  value = '',
  disabled = false,
  onInput
} = {}) => {
  const fieldElement = document.createElement('div');
  fieldElement.classList.add('field');
  fieldElement.classList.add.apply(fieldElement.classList, classList);

  const labelElement = document.createElement('label');
  labelElement.classList.add('label');
  labelElement.textContent = label;
  fieldElement.appendChild(labelElement);

  const valueElement = document.createElement('input');
  valueElement.classList.add('value');
  valueElement.setAttribute('type', type);
  if (disabled) {
    valueElement.setAttribute('disabled', 'disabled');
  }
  valueElement.value = value;
  if (typeof onInput === 'function') {
    valueElement.addEventListener('input', onInput);
  }
  fieldElement.appendChild(valueElement);

  return fieldElement;
};

module.exports = ({contact = {}, onEdit = () => {}, onRemove = () => {}} = {}) => {
  const {
    id = '',
    firstName = '',
    lastName = '',
    title = '',
    address = '',
    city = '',
    province = ''
  } = contact;

  const contactElement = document.createElement('section');
  contactElement.classList.add('contact');

  contactElement.appendChild(createFieldElement({
    classList: ['id'],
    type: 'text',
    label: 'ID',
    value: id,
    disabled: true,
    onInput: (event) => {
      onEdit(Object.assign(contact, { id: event.target.value }));
    }
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['first', 'name'],
    type: 'text',
    label: 'First name',
    value: firstName,
    onInput: (event) => {
      onEdit(Object.assign(contact, { firstName: event.target.value }));
    }
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['last', 'name'],
    type: 'text',
    label: 'Last name',
    value: lastName,
    onInput: (event) => {
      onEdit(Object.assign(contact, { lastName: event.target.value }));
    }
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['title'],
    type: 'text',
    label: 'Title',
    value: title,
    onInput: (event) => {
      onEdit(Object.assign(contact, { title: event.target.value }));
    }
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['address'],
    type: 'text',
    label: 'Address',
    value: address,
    onInput: (event) => {
      onEdit(Object.assign(contact, { address: event.target.value }));
    }
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['city'],
    type: 'text',
    label: 'City',
    value: city,
    onInput: (event) => {
      onEdit(Object.assign(contact, { city: event.target.value }));
    }
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['province'],
    type: 'text',
    label: 'Province',
    value: province,
    onInput: (event) => {
      onEdit(Object.assign(contact, { province: event.target.value }));
    }
  }));

  const deleteElement = document.createElement('button');
  deleteElement.classList.add('remove');
  deleteElement.textContent = 'Remove contact';
  deleteElement.addEventListener('click', () => { onRemove(contact); });
  contactElement.appendChild(deleteElement);

  return contactElement;
};
