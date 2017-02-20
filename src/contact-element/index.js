module.exports = ({ id = '', firstName = '' } = {}) => {
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

  return contactElement;
};
