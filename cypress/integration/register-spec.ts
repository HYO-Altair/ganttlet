describe('Register Page User Creation, Redirect and Deletion Test', () => {
    it('Should Create New Account, Redirects to Dashboard, Go To Profile, Delete User and Redirect to Login', () => {
        cy.visit('http://localhost:3000/register');
        cy.wait(10);

        cy.get('[data-cy=firstName]').type('Karl');
        cy.get('[data-cy=lastName]').type('Marx');
        cy.get('[data-cy=email]').type('marx@communism.com');
        cy.get('[data-cy=password]').type('123456abcdef');
        cy.get('[data-cy=submitButton]').click();
        cy.url().should('include', 'dashboard');

        cy.get('[data-cy=profileButton]').click();
        cy.get('[data-cy=deleteButton]').click();
        cy.url().should('include', 'login');
    });
});

describe('Register Page Required Field Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/register');

        // This is an issue that popped up after upgrading to Cypress 4.10.0. For some reson,
        // unless I wait after loading the page, it says that the element got detached from the DOM.
        //https://github.com/cypress-io/cypress/issues/7306
        // Somehow, just a 1ms wait is sufficient here but this varies. My guess is it's a problem with the new version of
        //Cypress since no real changes have been made to the Register page or the test spec.
        cy.wait(1);
        cy.get('[data-cy=submitButton]').click();
    });

    it('Should Not Accept Empty First Name', () => {
        cy.get('[data-cy=firstNameContainer]').contains('Required');
    });
    it('Should Not Accept Empty Last Name', () => {
        cy.get('[data-cy=lastNameContainer]').contains('Required');
    });
    it('Should Not Accept Empty Email', () => {
        cy.get('[data-cy=emailContainer]').contains('Required');
    });
    it('Should Not Accept Empty Password', () => {
        cy.get('[data-cy=passwordContainer]').contains('Required');
    });
});

describe('Register Page Max/Min Length Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/register');
        cy.wait(10);

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
        cy.wait(10);

        cy.get('[data-cy=email]').type('bot@cypress.com');
        cy.get('[data-cy=submitButton]').click().click();
        cy.get('[data-cy=emailContainer]').contains('Account Exists');
    });
});

// Cypress bot details
// Email: bot@cypress.com
// Password: 123456abcdef
