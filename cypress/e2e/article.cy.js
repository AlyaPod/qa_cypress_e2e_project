/// <reference types="cypress" />
/// <reference types="../support" />

import articlePageObject from '../support/pages/article.pageObject';
import faker from 'faker';

const articlePage = new articlePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  const editArticle = {
    title: faker.lorem.word(),
    description: faker.lorem.words(),
    body: faker.lorem.words(),
    tag: faker.lorem.word()
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(100);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.articleTitle.type(article.title);
    articlePage.articleDescription.type(article.description);
    articlePage.articleBody.type(article.body);
    articlePage.articleTags.type(article.tag);
    articlePage.publishBtn.click();
    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.getUser().then((user) => {
      cy.createArticle(user.id, article.title, article.description, article.body, article.tags);
    })
    articlePage.assertArticlePage(article.title);
    articlePage.editBtn.click();
    articlePage.articleTitle.type(`{selectAll}${editArticle.title}`);
    articlePage.articleBody.type(`{selectAll}${editArticle.body}`);
    articlePage.publishBtn.click();
    articlePage.assertArticleTitle(editArticle.title);
    articlePage.assertArticleText(editArticle.body);
    });

  it('should be deleted using Delete button', () => {
    cy.getUser().then((user) => {
      cy.createArticle(user.id, article.title, article.description, article.body, article.tags);
    })
    articlePage.assertArticlePage(article.title);
    articlePage.deleteBtn.click();
    articlePage.assertSuccessfulUpdate('Deleted the article. Going home...');
    articlePage.assertNoArticles('No articles are here... yet.');
    });
});
