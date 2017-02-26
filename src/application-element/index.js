const HeaderElement = require('../header-element');
const SidebarElement = require('../sidebar-element');
const ContactElement = require('../contact-element');

module.exports = ({ headerElement = {}, sidebarElement = {}, contactElement = {} } = {}) => {
  const applicationElement = document.createElement('article');
  applicationElement.classList.add('application');

  applicationElement.appendChild(HeaderElement(headerElement));
  applicationElement.appendChild(SidebarElement(sidebarElement));
  applicationElement.appendChild(ContactElement(contactElement));

  return applicationElement;
};
