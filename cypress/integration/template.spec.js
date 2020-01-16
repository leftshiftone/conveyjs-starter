/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
    });

    it('site is reachable', () => {
        cy.visit('http://localhost:3000/');
    });
});
