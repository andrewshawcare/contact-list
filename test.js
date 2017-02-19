const jsdom = require('jsdom');
global.window = jsdom.jsdom().defaultView;

const requirejs = require('requirejs');
window.define = requirejs.define;

const jasmine = new (require('jasmine'))();
Object.assign(window, jasmine.env);

requirejs.config({
  paths: {
    'node_modules': './node_modules',
    'text': 'node_modules/text/text'
  },
  nodeRequire: require
});

const glob = require('glob');
glob(process.argv[2], (error, files) => {
  if (error) { throw error; }
  requirejs(files, () => { jasmine.execute(); });
});
