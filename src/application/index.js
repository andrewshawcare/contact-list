const List = require('../list');

module.exports = () => {
  const contacts = List();
  return {
    contacts () {
      return contacts.list();
    }
  };
};
