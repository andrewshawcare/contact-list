const ApplicationModel = require('./application-model');
const ApplicationElement = require('./application-element');

const render = (applicationModel) => {
  document.body.innerHTML = '';
  document.body.appendChild(ApplicationElement());
};

const applicationModel = new ApplicationModel();
render(applicationModel);
