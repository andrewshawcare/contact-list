module.exports = ({ title = '', onClick = () => {}, classList = [] } = {}) => {
  const actionElement = document.createElement('a');
  actionElement.classList.add('action', ...classList);
  actionElement.setAttribute('href', 'javascript:void(0);');
  actionElement.addEventListener('click', () => { onClick(); });

  const titleElement = document.createElement('span');
  titleElement.classList.add('title');
  titleElement.textContent = title;
  actionElement.appendChild(titleElement);

  return actionElement;
};
