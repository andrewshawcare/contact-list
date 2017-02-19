module.exports = ({contacts = []}) => {
  return {
    list () { return contacts; }
  };
};
