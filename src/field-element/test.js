/* global describe, it, expect */
const FieldElement = require('./index.js');

describe('Contact element', () => {
  it('has the field class', () => {
    expect(FieldElement().classList.contains('field')).toBe(true);
  });

  describe('label', () => {
    it('exists', () => {
      expect(FieldElement().querySelector('.label')).not.toBeNull();
    });

    it('has the appropriate text', () => {
      expect(
        FieldElement({ label: 'Foo' })
          .querySelector('.label').textContent
      ).toBe('Foo');
    });
  });

  describe('value', () => {
    it('exists', () => {
      expect(FieldElement().querySelector('.value')).not.toBeNull();
    });

    it('has the appropriate value', () => {
      expect(FieldElement({ value: 'Foo' }).querySelector('.value').value).toBe('Foo');
    });

    it('has the appropriate type', () => {
      expect(
        FieldElement({ type: 'email' })
          .querySelector('.value').getAttribute('type')
      ).toBe('email');
    });

    it('can be disabled', () => {
      expect(
        FieldElement({ disabled: true })
          .querySelector('.value').getAttribute('disabled')
      ).toBe('disabled');
    });

    it('performs the appropriate behaviour on input', (done) => {
      const expectedValue = 'Foo';
      const fieldElement = FieldElement({
        onInput: (actualValue) => {
          expect(actualValue).toBe(expectedValue);
          done();
        }
      });
      const valueElement = fieldElement.querySelector('.value');
      valueElement.value = expectedValue;
      valueElement.dispatchEvent(new window.Event('input'));
    });
  });
});
