const HeaderElement = require('../header-element');
const NavigationElement = require('../navigation-element');
const ContactElement = require('../contact-element');

module.exports = ({ header = {}, navigation = {}, contact = {} } = {}) => {
  const applicationElement = document.createElement('article');
  applicationElement.classList.add('application');

  applicationElement.appendChild(HeaderElement(header));
  applicationElement.appendChild(NavigationElement(navigation));
  applicationElement.appendChild(ContactElement(contact));

  return applicationElement;
};
