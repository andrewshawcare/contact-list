module.exports = ({
  query = '',
  links = [],
  activeLink = () => {},
  onNavigate = () => {},
  onAdd = () => {},
  onSearch = () => {}
} = {}) => {
  const navigationElement = document.createElement('nav');
  navigationElement.classList.add('navigation');

  const searchElement = document.createElement('input');
  searchElement.classList.add('search');
  searchElement.setAttribute('type', 'search');
  searchElement.setAttribute('placeholder', 'Search');
  searchElement.value = query;
  searchElement.addEventListener('input', (event) => { onSearch(event.target.value); });
  navigationElement.appendChild(searchElement);

  const linkListElement = document.createElement('ul');
  linkListElement.classList.add('link', 'list');

  links.forEach((link = {}) => {
    const { title, subtitle } = link;
    const linkElement = document.createElement('li');
    linkElement.classList.add('link');
    if (activeLink(link)) {
      linkElement.classList.add('active');
    }
    linkElement.addEventListener('click', () => { onNavigate(link); });

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.innerHTML = (query === '') ? title : title.replace(new RegExp(query, 'gi'), '<strong>$&</strong>');
    linkElement.appendChild(titleElement);

    const subtitleElement = document.createElement('div');
    subtitleElement.classList.add('subtitle');
    subtitleElement.innerHTML = (query === '') ? subtitle : subtitle.replace(new RegExp(query, 'gi'), '<strong>$&</strong>');
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
