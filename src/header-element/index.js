module.exports = ({ logo = '' }) => {
  const headerElement = document.createElement('header');
  headerElement.classList.add('header');

  const logoElement = document.createElement('h1');
  logoElement.classList.add('logo');
  logoElement.textContent = logo;
  headerElement.appendChild(logoElement);

  return headerElement;
};
