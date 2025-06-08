/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';

describe('Cadastro, Login e Logout de Usuário', () => {
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

    cy.get(':nth-child(1) > input').type(nomeAleatorio);
    cy.get(':nth-child(2) > input').type(sobrenomeAleatorio);
    cy.get(':nth-child(3) > input').type(emailAleatorio);
    cy.get(':nth-child(4) > input').type(telefoneAleatorio);
    cy.get(':nth-child(5) > input').type(senhaAleatoria);
    cy.get(':nth-child(6) > input').type(senhaAleatoria);

    cy.get('form').find('button[type="submit"]').contains(/cadastrar/i).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuário cadastrado com sucesso!');
    });

    cy.url().should('match', /^http:\/\/localhost:5173\/?$/);
    cy.contains('h1', 'O SEU DRINK').should('be.visible');
  });

  it('Deve realizar login e depois logout do usuário', () => {

    cy.session([emailAleatorio, senhaAleatoria], () => {
      cy.visit('http://localhost:5173/');
      cy.get('.Login').click();

      cy.get('input[type="email"]').first().type(emailAleatorio);
      cy.get('input[type="password"]').first().type(senhaAleatoria);
      cy.get('form').find('button[type="submit"]').contains('Entrar').click();

      cy.contains(nomeAleatorio).should('be.visible');
      cy.get('.user-greeting').should('be.visible');
    }),

    cy.visit('http://localhost:5173/');

    cy.get('.user-greeting').should('be.visible').click();
    cy.get('.user-menu > :nth-child(2)').contains('Logout').click();

    cy.get('.Login').should('be.visible');
    cy.contains(nomeAleatorio).should('not.exist'); 
    
  });

  it('Deve tentar realizar o login com dados inválidos e exibir alerta de erro', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.Login').click();
    cy.get('input[type="email"]').first().type(emailAleatorio);
    cy.get('input[type="password"]').first().type(senhaAleatoria + 'invalida');
    cy.get('form').find('button[type="submit"]').contains('Entrar').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuário ou senha inválidos.');
    });
  });

  it('Deve tentar cadastrar um usuário com email já existente e exibir alerta de erro', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.Login').click();
    cy.get('#cadastro').click();
    cy.url().should('include', '/cadastro');

    cy.get(':nth-child(1) > input').type(nomeAleatorio);
    cy.get(':nth-child(2) > input').type(sobrenomeAleatorio);
    cy.get(':nth-child(3) > input').type(emailAleatorio); // Email já existente
    cy.get(':nth-child(4) > input').type(telefoneAleatorio);
    cy.get(':nth-child(5) > input').type(senhaAleatoria);
    cy.get(':nth-child(6) > input').type(senhaAleatoria);

    cy.get('form').find('button[type="submit"]').contains(/cadastrar/i).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Erro ao conectar com o servidor.');
    });

  })
});