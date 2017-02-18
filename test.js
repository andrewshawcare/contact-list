const jsdom = require('jsdom');
global.window = jsdom.jsdom().defaultView;
global.document = window.document;

const requirejs = require('requirejs');
global.define = requirejs.define;

requirejs.config({
  paths: {'node_modules': './node_modules'},
  nodeRequire: require
});

const jasmine = new (require('jasmine'));
requirejs(['./src/contact-list/test.js'], function () {
  jasmine.execute();
});
