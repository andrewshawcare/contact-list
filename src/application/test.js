/* global describe, it, expect */
const Application = require('./index');

describe('Application', () => {
  it('should have a list of contacts', () => {
    expect(Application().contacts() instanceof Array).toBe(true);
  });
});
