const jsdom = require('jsdom');
global.window = jsdom.jsdom().defaultView;

const requirejs = require('requirejs');
window.define = requirejs.define;

const jasmine = new (require('jasmine'))();
Object.assign(window, jasmine.env);

requirejs.config({
  paths: {'node_modules': './node_modules'},
  nodeRequire: require
});

requirejs(['./src/contact-list/test.js'], function () {
  jasmine.execute();
});
