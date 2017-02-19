const HeaderElement = require('../header-element');

module.exports = ({ header = {} } = {}) => {
  const applicationElement = document.createElement('article');
  applicationElement.classList.add('application');

  applicationElement.appendChild(HeaderElement(header));

  return applicationElement;
};
