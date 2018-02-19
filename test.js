const jsdom = require('jsdom');
global.window = (new jsdom.JSDOM()).window;
global.document = window.document;

const jasmine = new (require('jasmine'))();
Object.assign(window, jasmine.env);

const { LocalStorage } = require('node-localstorage');
window.localStorage = new LocalStorage('./localStorage');

const glob = require('glob');
glob(process.argv[2], (error, files) => {
  if (error) { throw error; }
  files.forEach(require);
  jasmine.execute();
});
