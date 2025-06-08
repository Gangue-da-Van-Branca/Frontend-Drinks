/// <reference types="cypress" />

describe('Fluxo de Criação de Orçamento', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.get('.Login').click();
        cy.get('input[type="email"]').type('victor.boaventura@gec.inatel.br');
        cy.get('input[type="password"]').first().type('senha123');
        cy.get('form').find('button[type="submit"]').contains('Entrar').click();
        cy.contains('Victor').should('be.visible');
    });

    let price = 0;

  it('Deve acessar a página de criação de orçamento', () => {
        cy.visit('http://localhost:5173/');
        cy.get('ul > :nth-child(4) > a').click();
        cy.get('#personalizar-botao').click();
        cy.get(':nth-child(3) > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(1) > label > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(2) > label > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(3) > label > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(4) > label > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(5) > label > input').click();
        cy.get(':nth-child(1) > .lista-drinks > :nth-child(6) > label > input').click();
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

        cy.get('#preco-final')
        .invoke('text')
        .then(textoCompleto => {
        const valorDaMoeda = "R$ " + textoCompleto.split('R$ ')[1].trim(); // Resulta em "R$ 8000.00"
        cy.wrap(valorDaMoeda).as('precoSalvo');
        
  });

  });

  it.skip('Deve verificar se o orçamento foi criado corretamente', function() {
    const precoEsperado = this.precoSalvo;

    cy.log(`Verificando se o preço do último pedido é: ${precoEsperado}`);

    cy.get('.user-greeting').click();
    cy.get('.user-menu > :nth-child(1)').click();
    cy.url().should('include', '/meus-pedidos');

    cy.get(':nth-child(1) > #meus-pedidos-resumo > #meus-pedidos-total')
      .invoke('text')
      .then(textoDoPedido => {

        const valorDaMoedaDoPedido = "R$ " + textoDoPedido.split('R$ ')[1].trim();
        expect(valorDaMoedaDoPedido).to.equal(precoEsperado);
      });
});


});