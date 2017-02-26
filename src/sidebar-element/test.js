/* global describe, it, expect */
const SidebarElement = require('./index.js');

describe('Sidebar element', () => {
  it('has the sidebar class', () => {
    expect(SidebarElement().classList.contains('sidebar')).toBe(true);
  });

  it('has a navigation element', () => {
    expect(SidebarElement().querySelector('.navigation')).not.toBeNull();
  });

  it('has an add action', () => {
    expect(SidebarElement().querySelector('.add.action')).not.toBeNull();
  });

  it('has a search element', () => {
    expect(SidebarElement().querySelector('.search')).not.toBeNull();
  });
});
