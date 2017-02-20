const HeaderElement = require('../header-element');
const NavigationElement = require('../navigation-element');
const ContactElement = require('../contact-element');

module.exports = ({ headerElement = {}, navigationElement = {}, contactElement = {} } = {}) => {
  const applicationElement = document.createElement('article');
  applicationElement.classList.add('application');

  applicationElement.appendChild(HeaderElement(headerElement));
  applicationElement.appendChild(NavigationElement(navigationElement));
  applicationElement.appendChild(ContactElement(contactElement));

  return applicationElement;
};
