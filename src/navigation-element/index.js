module.exports = ({
  links = [],
  isActiveLink = () => false,
  onNavigate = () => {},
  emphasisPattern = ''
} = {}) => {
  const navigationElement = document.createElement('nav');
  navigationElement.classList.add('navigation');

  const linkListElement = document.createElement('ul');
  linkListElement.classList.add('link', 'list');

  links.forEach((link = {}) => {
    const { title = '', subtitle = '' } = link;
    const linkElement = document.createElement('li');
    linkElement.classList.add('link');
    if (isActiveLink(link)) {
      linkElement.classList.add('active');
    }
    linkElement.addEventListener('click', () => { onNavigate(link); });

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.innerHTML = (emphasisPattern === '') ? title : title.replace(new RegExp(emphasisPattern, 'gi'), '<strong>$&</strong>');
    linkElement.appendChild(titleElement);

    const subtitleElement = document.createElement('div');
    subtitleElement.classList.add('subtitle');
    subtitleElement.innerHTML = (emphasisPattern === '') ? subtitle : subtitle.replace(new RegExp(emphasisPattern, 'gi'), '<strong>$&</strong>');
    linkElement.appendChild(subtitleElement);

    linkListElement.appendChild(linkElement);
  });

  navigationElement.appendChild(linkListElement);

  return navigationElement;
};
