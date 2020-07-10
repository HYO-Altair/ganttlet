describe('Login Page Log in and Log Out Test', () => {
    it('Should Log In, Redirect To Dashboard, Log Out, and Redirect Back To Login', () => {
        cy.visit('http://localhost:3000/login');
        cy.wait(100);

        cy.get('[data-cy=email]').type('bot@cypress.com');
        cy.get('[data-cy=password]').type('123456abcdef');
        cy.get('[data-cy=submitButton]').click();

        cy.url().should('include', 'dashboard');

        cy.get('[data-cy=logoutButton]').click();

        cy.url().should('include', 'login');
    });
});

describe('Invalid Login Attempt Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.wait(100);

        cy.get('[data-cy=email]').type('bot@cypress.com');
        cy.get('[data-cy=password]').type('Capitalism Is The Root Of All Evil!');
        cy.get('[data-cy=submitButton]').click();
    });

    it('Should Not Accept Invalid Details', () => {
        cy.get('[data-cy=passwordContainer]').contains('Invalid Email or Password');
    });
});

describe('Login Page Required Field Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.wait(100);

        cy.get('[data-cy=submitButton]').click();
    });

    it('Should Not Accept Empty Email', () => {
        cy.get('[data-cy=emailContainer]').contains('Required');
    });
    it('Should Not Accept Empty Password', () => {
        cy.get('[data-cy=passwordContainer]').contains('Required');
    });
});

describe('Login Page Max/Min Length Tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.wait(100);

        cy.get('[data-cy=email]').type(`a@${new Array(251 + 1).join('a')}.com`);
        cy.get('[data-cy=password]').type(new Array(11 + 1).join('a'));
        cy.get('[data-cy=submitButton]').click();
    });

    it('Should Not Accept Email Longer Than 256 Characters ', () => {
        cy.get('[data-cy=emailContainer]').contains('Too Long');
    });
    it('Should Not Accept Password Shorter Than 12 Characters ', () => {
        cy.get('[data-cy=passwordContainer]').contains('Too Short');
    });
});
