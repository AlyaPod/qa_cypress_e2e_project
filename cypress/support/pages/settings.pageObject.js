import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataQA('username-settings');
  }

  get bioField() {
    return cy.getByDataQA('bio-settings');
  }

  get emailField() {
    return cy.getByDataQA('email-settings');
  }

  get passwordField() {
    return cy.getByDataQA('password-settings');
  }

  get updateBtn() {
    return cy.getByDataQA('update-settings');
  }

  get logoutBtn() {
    return cy.getByDataQA('logout-btn');
  }

  get successfulUpdate() {
    return cy.get('.swal-modal');
  }

  assertSuccessfulUpdate (message) {
    this.successfulUpdate.should('contain', message);
  }

  }

  

export default settingsPageObject;