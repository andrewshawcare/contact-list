module.exports = ({ links = [], onAdd = () => {}, onSearch = () => {} } = {}) => {
  const navigationElement = document.createElement('nav');
  navigationElement.classList.add('navigation');

  const searchElement = document.createElement('input');
  searchElement.classList.add('search');
  searchElement.addEventListener('input', (event) => { onSearch(event.target.value); });
  navigationElement.appendChild(searchElement);

  const linkListElement = document.createElement('ul');
  linkListElement.classList.add('link', 'list');

  links.forEach(({ title = '', subtitle = '', onNavigate } = {}) => {
    const linkElement = document.createElement('li');
    linkElement.classList.add('link');
    if (typeof onNavigate === 'function') {
      linkElement.addEventListener('click', onNavigate);
    }

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.textContent = title;
    linkElement.appendChild(titleElement);

    const subtitleElement = document.createElement('div');
    subtitleElement.classList.add('subtitle');
    subtitleElement.textContent = subtitle;
    linkElement.appendChild(subtitleElement);

    linkListElement.appendChild(linkElement);
  });

  navigationElement.appendChild(linkListElement);

  const addElement = document.createElement('button');
  addElement.classList.add('add');
  addElement.textContent = 'Add contact';
  addElement.addEventListener('click', () => { onAdd(); });
  navigationElement.appendChild(addElement);

  return navigationElement;
};
