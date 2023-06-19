import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQA('username-link');
  }

  get homepageIntro() {
    return cy.getByDataQA('homepage-intro');
  }
}

export default HomePageObject;
