const HeaderElement = require('../header-element');
const NavigationElement = require('../navigation-element');
const HistoryEventElement = require('../history-event-element');

module.exports = ({ headerElement, navigationElement, historyEventElement } = {}) => {
  const historyElement = document.createElement('article');
  historyElement.classList.add('history');

  historyElement.appendChild(HeaderElement(headerElement));
  historyElement.appendChild(NavigationElement(navigationElement));
  historyElement.appendChild(HistoryEventElement(historyEventElement));

  return historyElement;
};
