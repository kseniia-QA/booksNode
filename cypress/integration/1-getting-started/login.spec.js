/* eslint-disable no-undef */
describe('mainPage', () => {

    beforeEach(() => {
       
        cy.viewport(1280, 720)
        cy.viewport('iphone-5')

it('Checks the main page content', () => {
      cy.visit('/')
      cy.get('span.ml-2').contains('Books list')
})

it('logins with correct credentials', () => {
    cy.visit('/')
    cy.login('bropet@mail.ru', '123')
    cy.get('span.pt-2').contains('Добро пожаловать')
})

it('should not login with incorrect credentials', () => {
    cy.visit('/')
    cy.get('button.ml-2.btn.btn-warning').click()
    cy.get('input#mail.form-control').type('bret@mail.ru')
    cy.get('input#pass.form-control').type('123')
    cy.get('button.ml-2.btn.btn-success').click()
    cy.get('div.mb-3.pl-4.text-danger.font-weight-bold.collapse.show').contains('Неправильая почта или пароль')
})

it('adds new book and adds it to favourite', () => {
    cy.visit('/')
    cy.login('bropet@mail.ru', '123')
    cy.get('button.btn.btn-warning').click()
    cy.addTitle('input#title', 'Harry Potter')
    cy.addAuthor('input#authors.form-control', 'J.K.Rowling')
    cy.get('input#favorite.form-check-input').click()
    cy.get('button.ml-2.btn.btn-success').click()
    cy.addedBookInfo('div.card-title.h5', 'Harry Potter')
    cy.addedBookInfo('p.card-text', 'J.K.Rowling')
})

it('deletes from favorites', () => {
    cy.visit('/')
    cy.login('bropet@mail.ru', '123')
    cy.get('h4').click()
    cy.get('button.btn.btn-secondary').click()
    cy.get('a').contains('Please add some book to favorit on home page!')
})

it.only('adds to favoutrite', () => {
    cy.visit('/')
    cy.login('bropet@mail.ru', '123')
    cy.get('button.btn.btn-warning').click()
    cy.addTitle('input#title', 'Harry Potter')
    cy.addAuthor('input#authors.form-control', 'J.K.Rowling')
    cy.get('button.ml-2.btn.btn-success').click()
    cy.get('button.btn.btn-success').eq(0).click()
    cy.get('h4').click()
    cy.addedBookInfo('div.card-title.h5', 'Harry Potter')
    cy.addedBookInfo('p.card-text', 'J.K.Rowling')
})
})
