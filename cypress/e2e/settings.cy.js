/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();

describe('Settings page', () => {
  let user;
  const randomNumber = Math.ceil(Math.random(1000) * 1000);

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  const newData = {
    username: faker.lorem.word(),
    bio: faker.lorem.words(),
    email: faker.internet.email().toLowerCase(),
    password: faker.name.firstName() + `${randomNumber}`,
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(100);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.type(`{selectAll}${newData.username}`);
    settingsPage.updateBtn.click();
    settingsPage.assertSuccessfulUpdate('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.type(`{selectAll}${newData.bio}`);
    settingsPage.updateBtn.click();
    settingsPage.assertSuccessfulUpdate('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.type(`{selectAll}${newData.email}`);
    settingsPage.updateBtn.click();
    settingsPage.assertSuccessfulUpdate('Update successful!');
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.type(`{selectAll}${newData.password}`);
    settingsPage.updateBtn.click();
    settingsPage.assertSuccessfulUpdate('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    homePage.homepageIntro.should('be.visible');
  });
});
