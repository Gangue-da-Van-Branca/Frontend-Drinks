/// <reference types="cypress" />

describe('Fluxo de Criação de Orçamento', () => {
    before(() => {
        cy.visit('http://localhost:5173/');
        cy.get('.Login').click();
        cy.get('input[type="email"]').type('victor.boaventura@gec.inatel.br');
        cy.get('input[type="password"]').first().type('senha123');
        cy.get('form').find('button[type="submit"]').contains('Entrar').click();
        cy.contains('Victor').should('be.visible');
    });

  it('Deve acessar a página de criação de orçamento', () => {
        cy.visit('http://localhost:5173/');
        cy.get('ul > :nth-child(4) > a').click();
        cy.get('#personalizar-botao').click();
        cy.get(':nth-child(3) > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(1) > label > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(2) > label > input').click();
        cy.get(':nth-child(2) > .lista-drinks > :nth-child(3) > label > input').click();
        cy.get(':nth-child(2) > .lista-drinks > :nth-child(4) > label > input').click();
        cy.get(':nth-child(2) > .lista-drinks > :nth-child(5) > label > input').click();
        cy.get(':nth-child(2) > .lista-drinks > :nth-child(6) > label > input').click();
        cy.get(':nth-child(2) > .lista-drinks > :nth-child(1) > label > input').click();
        cy.get(':nth-child(2) > .lista-drinks > :nth-child(2) > label > input').click();
        cy.get('#botao-avancar').click();

        cy.get(':nth-child(1) > .bar-header > .bar-checkbox > input').click();
        cy.get(':nth-child(4) > .bar-header > .bar-checkbox > input').click();
        cy.get(':nth-child(6) > .bar-header > .bar-checkbox > input').click();

        cy.get(':nth-child(2) > .shot-input').type('10');
        cy.get(':nth-child(4) > .shot-input').type('50');
        cy.get(':nth-child(5) > .shot-input').type('30');

        cy.get(':nth-child(1) > .outro-input').type('50');
        cy.get(':nth-child(3) > .outro-input').type('30');
        cy.get(':nth-child(5) > .outro-input').type('20');
        cy.get(':nth-child(7) > .outro-input').type('20');

        cy.get('#botao-avancar').click();

        cy.get('[placeholder="ENDEREÇO DO EVENTO"]').type('Rua Exemplo, 123');
        cy.get('[placeholder="CEP"]').type('12345678');
        cy.get('[placeholder="NÚMERO DE CONVIDADOS"]').type('100');
        cy.get('[placeholder="DATA"]').type('2023-12-31');
        cy.get('[placeholder="HORÁRIO DE INICIO"]').type('18:00');
        cy.get('[placeholder="HORÁRIO FINAL"]').type('23:59');

        cy.get('button').click();
        cy.get('button').click();

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Orçamento enviado com sucesso! ID Orçamento: ${responseData.idOrcamento}, ID Pedido: ${responseData.idPedido}');
        });

        cy.url().should('match', /^http:\/\/localhost:5173\/?$/);
        cy.contains('h1', 'O SEU DRINK').should('be.visible');
  });


});