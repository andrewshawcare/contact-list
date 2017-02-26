const jsondiffpatchFormatters = require('jsondiffpatch/public/build/jsondiffpatch-formatters');
const moment = require('moment');

module.exports = ({ event: { id = '', timestamp = '', patch } = {}, state } = {}) => {
  const historyEventElement = document.createElement('div');
  historyEventElement.classList.add('event');

  const idElement = document.createElement('div');
  idElement.classList.add('id');
  idElement.textContent = id;
  historyEventElement.appendChild(idElement);

  const timestampElement = document.createElement('div');
  timestampElement.classList.add('timestamp');
  timestampElement.textContent = timestamp ? moment(timestamp) : '';
  historyEventElement.appendChild(timestampElement);

  const patchElement = document.createElement('div');
  patchElement.classList.add('patch');
  patchElement.innerHTML = jsondiffpatchFormatters.html.format(patch, state);
  historyEventElement.appendChild(patchElement);

  return historyEventElement;
};
