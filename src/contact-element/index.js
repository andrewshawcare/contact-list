module.exports = ({
  id = '',
  firstName = '',
  lastName = '',
  title = '',
  address = ''
} = {}) => {
  const contactElement = document.createElement('section');
  contactElement.classList.add('contact');

  const idElement = document.createElement('input');
  idElement.classList.add('id');
  idElement.setAttribute('type', 'hidden');
  idElement.value = id;
  contactElement.appendChild(idElement);

  const firstNameElement = document.createElement('input');
  firstNameElement.classList.add('first', 'name');
  firstNameElement.setAttribute('type', 'text');
  firstNameElement.value = firstName;
  contactElement.appendChild(firstNameElement);

  const lastNameElement = document.createElement('input');
  lastNameElement.classList.add('last', 'name');
  lastNameElement.setAttribute('type', 'text');
  lastNameElement.value = lastName;
  contactElement.appendChild(lastNameElement);

  const titleElement = document.createElement('input');
  titleElement.classList.add('title');
  titleElement.setAttribute('type', 'text');
  titleElement.value = title;
  contactElement.appendChild(titleElement);

  const addressElement = document.createElement('input');
  addressElement.classList.add('address');
  addressElement.setAttribute('type', 'text');
  addressElement.value = address;
  contactElement.appendChild(addressElement);

  return contactElement;
};
