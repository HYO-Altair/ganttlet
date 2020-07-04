describe('Register Page Tests', () => {
    it('Page Loads', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('#firstName').click().type('Hello');
    });
});
