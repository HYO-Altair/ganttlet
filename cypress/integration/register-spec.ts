describe('Register Page Required Field Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/register');
        cy.get('[data-cy=submitButton]').click();
    });

    it('Should Not Accept Empty First Name', () => {
        cy.get('[data-cy=firstNameContainer]').find('p').contains('Required');
    });
    it('Should Not Accept Empty Last Name', () => {
        cy.get('[data-cy=lastNameContainer]').find('p').contains('Required');
    });
    it('Should Not Accept Empty Email', () => {
        cy.get('[data-cy=emailContainer]').find('p').contains('Required');
    });
    it('Should Not Accept Empty Password', () => {
        cy.get('[data-cy=passwordContainer]').find('p').contains('Required');
    });
});

describe('Register Page Max/Min Length Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('Should Not Accept First Name Longer Than 64 Characters ', () => {
        cy.get('[data-cy=firstName]').type(new Array(65 + 1).join('$'));
        cy.get('[data-cy=submitButton]').click();
        cy.get('[data-cy=firstNameContainer]').contains('Too Long');
    });
    it('Should Not Accept Last Name Longer Than 64 Characters ', () => {
        cy.get('[data-cy=lastName]').type(new Array(65 + 1).join('$'));
        cy.get('[data-cy=submitButton]').click();
        cy.get('[data-cy=lastNameContainer]').contains('Too Long');
    });
    it('Should Not Accept Email Longer Than 256 Characters ', () => {
        cy.get('[data-cy=email]').type(new Array(257 + 1).join('$'));

        // For some reason this only works after two clicks. Luckily, it looks like it's a problem with Cypress (works correctly when manually tested) based on:
        // https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
        cy.get('[data-cy=submitButton]').click().click();

        cy.get('[data-cy=emailContainer]').contains('Too Long');
    });
    it('Should Not Accept Password Shorter Than 12 Characters ', () => {
        cy.get('[data-cy=password]').type(new Array(11 + 1).join('$'));
        cy.get('[data-cy=submitButton]').click();
        cy.get('[data-cy=passwordContainer]').contains('Too Short');
    });
});
