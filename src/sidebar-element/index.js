const SearchElement = require('../search-element');
const NavigationElement = require('../navigation-element');
const ActionElement = require('../action-element');

module.exports = ({
  searchElement = {},
  navigationElement = {},
  addActionElement = {}
} = {}) => {
  const sidebarElement = document.createElement('section');
  sidebarElement.classList.add('sidebar');

  sidebarElement.appendChild(SearchElement(searchElement));
  sidebarElement.appendChild(NavigationElement(navigationElement));
  sidebarElement.appendChild(ActionElement(Object.assign(addActionElement, { classList: ['add'] })));

  return sidebarElement;
};
