/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.get('button.ml-2.btn.btn-warning').click()
    cy.get('input#mail.form-control').type(email)
    cy.get('input#pass.form-control').type(password)
    cy.get('button.ml-2.btn.btn-success').click()
})
//
//
// -- This is a child command --
Cypress.Commands.add('addedBookInfo', (selector, content) => {
    cy.get(selector).contains(content)
    cy.get(selector).contains(content)
})

Cypress.Commands.add('addTitle', (selector, content) => {
    cy.get(selector).type(content)
})
Cypress.Commands.add('addAuthor', (selector, content) => {
    cy.get(selector).type(content)
})
})
})
