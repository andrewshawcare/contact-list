const createInputElement = ({classList = [], type = 'text', value = ''} = {}) => {
  const inputElement = document.createElement('input');
  inputElement.classList.add.apply(inputElement.classList, classList);
  inputElement.setAttribute('type', type);
  inputElement.value = value;
  return inputElement;
};

module.exports = ({
  id = '',
  firstName = '',
  lastName = '',
  title = '',
  address = '',
  city = ''
} = {}) => {
  const contactElement = document.createElement('section');
  contactElement.classList.add('contact');

  contactElement.appendChild(createInputElement({
    classList: ['id'],
    type: 'hidden',
    value: id
  }));

  contactElement.appendChild(createInputElement({
    classList: ['first', 'name'],
    type: 'text',
    value: firstName
  }));

  contactElement.appendChild(createInputElement({
    classList: ['last', 'name'],
    type: 'text',
    value: lastName
  }));

  contactElement.appendChild(createInputElement({
    classList: ['title'],
    type: 'text',
    value: title
  }));

  contactElement.appendChild(createInputElement({
    classList: ['address'],
    type: 'text',
    value: address
  }));

  contactElement.appendChild(createInputElement({
    classList: ['city'],
    type: 'text',
    value: city
  }));

  return contactElement;
};
