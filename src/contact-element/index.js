module.exports = ({ id = '' } = {}) => {
  const contactElement = document.createElement('section');
  contactElement.classList.add('contact');

  const idElement = document.createElement('input');
  idElement.classList.add('id');
  idElement.setAttribute('type', 'hidden');
  idElement.value = id;
  contactElement.appendChild(idElement);

  return contactElement;
};
