/* global define */
define([], function () {
  return function (options) {
    var contacts = (options.contacts instanceof Array) ? options.contacts : [];
    return {
      list: function () {
        return contacts;
      }
    };
  };
});
