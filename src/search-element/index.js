module.exports = ({ placeholder = '', query = '', onSearch = () => {} } = {}) => {
  const searchElement = document.createElement('input');
  searchElement.classList.add('search');
  searchElement.setAttribute('type', 'search');
  searchElement.setAttribute('placeholder', placeholder);
  searchElement.value = query;
  searchElement.addEventListener('input', ({ target: { value } }) => { onSearch(value); });
  return searchElement;
};
