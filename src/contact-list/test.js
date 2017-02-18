(({ define, describe, it, expect }) => {
  define(['./index.js'], (ContactList) => {
    describe('Contact List', () => {
      it('is defined', () => {
        expect(ContactList).toBeDefined();
      });
    });
  });
})(window);
