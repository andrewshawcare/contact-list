const HeaderElement = require('../header-element');
const NavigationElement = require('../navigation-element');

module.exports = ({ header = {}, navigation = {} } = {}) => {
  const applicationElement = document.createElement('article');
  applicationElement.classList.add('application');

  applicationElement.appendChild(HeaderElement(header));
  applicationElement.appendChild(NavigationElement(navigation));

  return applicationElement;
};
