const jsondiffpatch = require('jsondiffpatch/dist/jsondiffpatch.umd');
const moment = require('moment');

module.exports = ({ event: { id = '', timestamp = '', delta } = {}, state } = {}) => {
  const historyEventElement = document.createElement('div');
  historyEventElement.classList.add('event');

  const idElement = document.createElement('div');
  idElement.classList.add('id');
  idElement.textContent = id;
  historyEventElement.appendChild(idElement);

  const timestampElement = document.createElement('div');
  timestampElement.classList.add('timestamp');
  timestampElement.textContent = timestamp ? moment(timestamp).calendar() : '';
  historyEventElement.appendChild(timestampElement);

  const deltaElement = document.createElement('div');
  deltaElement.classList.add('delta');
  deltaElement.innerHTML = jsondiffpatch.formatters.html.format(delta, state);
  historyEventElement.appendChild(deltaElement);

  return historyEventElement;
};
