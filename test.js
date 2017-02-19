const jsdom = require('jsdom');
global.window = jsdom.jsdom().defaultView;

const jasmine = new (require('jasmine'))();
Object.assign(window, jasmine.env);

const glob = require('glob');
glob(process.argv[2], (error, files) => {
  if (error) { throw error; }
  files.forEach(require);
  jasmine.execute();
});
