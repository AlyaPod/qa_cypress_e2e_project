import PageObject from '../PageObject';

class articlePageObject extends PageObject {
  url = '#/editor';

  get articleTitle() {
    return cy.getByDataQA('article-title');
  }

  get articleDescription() {
    return cy.getByDataQA('article-description');
  }

  get articleBody() {
    return cy.getByDataQA('article-body');
  }

  get articleTags() {
    return cy.getByDataQA('article-tags').eq(0);
  }

  get publishBtn() {
    return cy.getByDataQA('article-publish-btn');
  }

  assertArticleTitle (articleName) {
    cy.getByDataQA('article-name').should('contain', articleName);
  }

  assertArticleText (articleText) {
    cy.getByDataQA('article-text').should('contain', articleText);
  }

  assertArticlePage (title) {
    cy.visit(`/#/articles/${title}`);
  }

  get deleteBtn() {
    return cy.getByDataQA('article-delete').eq(0);
  }

  get successfulUpdate() {
    return cy.get('.swal-modal');
  }

  assertSuccessfulUpdate (message) {
    this.successfulUpdate.should('contain', message);
  }

  assertNoArticles (message) {
    cy.getByDataQA('no-article-assert').should('contain', message);
  }

  get editBtn() {
    return cy.getByDataQA('article-edit').eq(0);
  }
}

  

export default articlePageObject;