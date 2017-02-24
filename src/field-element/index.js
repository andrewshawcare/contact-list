module.exports = ({
  classList = [],
  type,
  label = '',
  value = '',
  disabled = false,
  onInput = () => {}
} = {}) => {
  const fieldElement = document.createElement('div');
  fieldElement.classList.add('field');
  fieldElement.classList.add.apply(fieldElement.classList, classList);

  const labelElement = document.createElement('label');
  labelElement.classList.add('label');
  labelElement.textContent = label;
  fieldElement.appendChild(labelElement);

  const valueElement = document.createElement('input');
  valueElement.classList.add('value');
  valueElement.setAttribute('type', type);
  if (disabled) { valueElement.setAttribute('disabled', 'disabled'); }
  valueElement.value = value;
  valueElement.addEventListener('input', ({ target: { value } }) => { onInput(value); });
  fieldElement.appendChild(valueElement);

  return fieldElement;
};
