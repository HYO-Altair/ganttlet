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
        cy.get('[data-cy=firstName]').type(new Array(65 + 1).join('a'));
        cy.get('[data-cy=lastName]').type(new Array(65 + 1).join('a'));
        cy.get('[data-cy=email]').type(`a@${new Array(251 + 1).join('a')}.com`);
        cy.get('[data-cy=password]').type(new Array(11 + 1).join('a'));
        cy.get('[data-cy=submitButton]').click();
    });

    it('Should Not Accept First Name Longer Than 64 Characters ', () => {
        cy.get('[data-cy=firstNameContainer]').contains('Too Long');
    });
    it('Should Not Accept Last Name Longer Than 64 Characters ', () => {
        cy.get('[data-cy=lastNameContainer]').contains('Too Long');
    });
    it('Should Not Accept Email Longer Than 256 Characters ', () => {
        cy.get('[data-cy=emailContainer]').contains('Too Long');
    });
    it('Should Not Accept Password Shorter Than 12 Characters ', () => {
        cy.get('[data-cy=passwordContainer]').contains('Too Short');
    });
});

describe('Duplicate User Test', () => {
    it('Should Not Allow Used Email To Be Submitted', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('[data-cy=email]').type('a@b.com');
        cy.get('[data-cy=submitButton]').click();
        cy.get('[data-cy=emailContainer]').contains('Account Exists');
    });
});

// Cypress bot details
// Email: bot@cypress.com
// Password: 123456abcdef

// This is commented out currently because it doesn't look like the routing functionality is completely there yet.
//
// describe('Register Page User Creation and Redirect Test', () => {
//     before(() => {
//         cy.visit('http://localhost:3000/register');
//         cy.get('[data-cy=firstName]').type('雷門');
//         cy.get('[data-cy=lastName]').type('電気');
//         cy.get('[data-cy=email]').type('lightning@mha.com');
//         cy.get('[data-cy=password]').type('123456abcdef');
//         cy.get('[data-cy=submitButton]').click();
//     });

//     cy.url().should('contain', 'dashboard');
// });
