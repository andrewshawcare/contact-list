const createFieldElement = ({
  classList = [],
  type,
  label = '',
  value = '',
  disabled = false
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
  valueElement.setAttribute('disabled', disabled);
  valueElement.value = value;
  fieldElement.appendChild(valueElement);

  return fieldElement;
};

module.exports = ({contact = {}} = {}) => {
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
    disabled: true
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['first', 'name'],
    type: 'text',
    label: 'First name',
    value: firstName
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['last', 'name'],
    type: 'text',
    label: 'Last name',
    value: lastName
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['title'],
    type: 'text',
    label: 'Title',
    value: title
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['address'],
    type: 'text',
    label: 'Address',
    value: address
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['city'],
    type: 'text',
    label: 'City',
    value: city
  }));

  contactElement.appendChild(createFieldElement({
    classList: ['province'],
    type: 'text',
    label: 'Province',
    value: province
  }));

  return contactElement;
};
