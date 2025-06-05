/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';

describe('Fluxo de Cadastro, Login e Logout de Usuário', () => {
  let nomeAleatorio;
  let sobrenomeAleatorio;
  let emailAleatorio;
  let telefoneAleatorio;
  let senhaAleatoria;

  before(() => {
    nomeAleatorio = faker.person.firstName();
    sobrenomeAleatorio = faker.person.lastName();
    emailAleatorio = faker.internet.email({ firstName: nomeAleatorio, lastName: sobrenomeAleatorio });
    telefoneAleatorio = faker.phone.number('###########');
    senhaAleatoria = faker.internet.password({ length: 10, memorable: false, prefix: '!Aa1' });
  });

  it('deve cadastrar um novo usuário com dados aleatórios e exibir alerta de sucesso', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.Login').click();
    cy.get('#cadastro').click();
    cy.url().should('include', '/cadastro');

    // Preenche o formulário de cadastro com dados aleatórios
    cy.get(':nth-child(1) > input').type(nomeAleatorio);
    cy.get(':nth-child(2) > input').type(sobrenomeAleatorio);
    cy.get(':nth-child(3) > input').type(emailAleatorio);
    cy.get(':nth-child(4) > input').type(telefoneAleatorio);
    cy.get(':nth-child(5) > input').type(senhaAleatoria);
    cy.get(':nth-child(6) > input').type(senhaAleatoria);

    // Clica no botão de cadastro
    cy.get('form').find('button[type="submit"]').contains(/cadastrar/i).click();

    // Verifica se o alerta de sucesso é exibido após o cadastro
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuário cadastrado com sucesso!');
    });

    // Verifica se foi redirecionado para a página inicial após o cadastro
    cy.url().should('match', /^http:\/\/localhost:5173\/?$/);
    cy.contains('h1', 'O SEU DRINK').should('be.visible');
  });

  // Teste de Login e Logout usando cy.session
  it('Deve realizar login e depois logout do usuário', () => {

    cy.session([emailAleatorio, senhaAleatoria], () => {
      cy.visit('http://localhost:5173/');
      cy.get('.Login').click();

      // Preenche o formulário de login
      cy.get('input[type="email"]').first().type(emailAleatorio);
      cy.get('input[type="password"]').first().type(senhaAleatoria);
      cy.get('form').find('button[type="submit"]').contains('Entrar').click();

      // Validações dentro do setup do cy.session para garantir que o login foi bem-sucedido
      cy.contains(nomeAleatorio).should('be.visible');
      cy.get('.user-greeting').should('be.visible');
    }, {
    });

    cy.visit('http://localhost:5173/');

    cy.get('.user-greeting').should('be.visible').click();
    cy.get('.user-menu > :nth-child(2)').contains('Logout').click();

    cy.get('.Login').should('be.visible');
    cy.contains(nomeAleatorio).should('not.exist'); 
    
  });
});